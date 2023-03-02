import { range, tinyassert } from "@hiogawa/utils";
import { SYLLABLE_CODE_MAP, SYLLABLE_MAP, isSyllable } from "./characters";
import { mapValues, zip } from "./misc";

//
// based on https://en.wikipedia.org/wiki/Revised_Romanization_of_Korean
//

export function romanize(input: string): string[] {
  const chars = [...input];
  tinyassert(chars.every((c) => isSyllable(c)));

  const mapped: [string | undefined, string, string | undefined][] = chars.map(
    (c) => SYLLABLE_MAP.get(c)!
  );

  const result: string[] = range(chars.length).map(() => "");
  for (const i of range(chars.length)) {
    const prev = mapped[i];
    const next = mapped.at(i + 1);

    // initial
    if (prev[0]) {
      result[i] += CONSONANT_RULE.get(prev[0])?.[0];
    }

    // madial
    result[i] += VOWEL_RULE.get(prev[1]);

    if (prev[2]) {
      // handle special rule
      const special = SPECIAL_RULE.get(prev[2])?.get(next?.[0]!);
      if (special) {
        // TODO: how to choose? (pick first for now)
        const [final, initial = ""] = special[0].split("-"); // TODO: what's this "-"?
        result[i] += final;
        result[i + 1] += initial;
        next![0] = undefined;
      } else {
        result[i] += CONSONANT_RULE.get(prev[2])?.[1];
      }
    }
  }
  return result;
}

export function romanizeSyllableCodepoint(code: number): string {
  const jamo = SYLLABLE_CODE_MAP.get(code);
  tinyassert(jamo, String.fromCharCode(code));
  const [i, m, f] = jamo;
  return [
    CONSONANT_RULE.get(i)?.[0],
    VOWEL_RULE.get(m),
    f && CONSONANT_RULE.get(f)?.[1],
  ].join("");
}

const EMPTY_PLACEHOLDER = "–";

export const VOWEL_RULE: Map<string, string> = (() => {
  const data = `
Hangul	ㅏ	ㅐ	ㅑ	ㅒ	ㅓ	ㅔ	ㅕ	ㅖ	ㅗ	ㅘ	ㅙ	ㅚ	ㅛ	ㅜ	ㅝ	ㅞ	ㅟ	ㅠ	ㅡ	ㅢ	ㅣ
Romanization	a	ae	ya	yae	eo	e	yeo	ye	o	wa	wae	oe	yo	u	wo	we	wi	yu	eu	ui	i
`;
  const [from, to] = data
    .trim()
    .split("\n")
    .map((line) => line.trim().split("\t").slice(1));
  tinyassert(from.length === to.length);
  return new Map(zip(from, to));
})();

export const CONSONANT_RULE: Map<string, [string, string]> = (() => {
  const data = `
Hangul	ㄱ	ㄲ	ㄴ	ㄷ	ㄸ	ㄹ	ㅁ	ㅂ	ㅃ	ㅅ	ㅆ	ㅇ	ㅈ	ㅉ	ㅊ	ㅋ	ㅌ	ㅍ	ㅎ
Romanization	Initial	g	kk	n	d	tt	r	m	b	pp	s	ss	–	j	jj	ch	k	t	p	h
Final	k	k	n	t	–	l	m	p	–	t	t	ng	t	–	t	k	t	p	t
`;
  const [from, to1, to2] = data
    .replaceAll(EMPTY_PLACEHOLDER, "")
    .trim()
    .split("\n")
    .map((line) => line.trim().split("\t").slice(1));
  to1.shift();
  tinyassert(from.length === to1.length);
  tinyassert(from.length === to2.length);
  return new Map(zip(from, zip(to1, to2)));
})();

export const SPECIAL_RULE: Map<string, Map<string, string[]>> = (() => {
  const data = `
ㅇ	ㄱ	ㄴ	ㄷ	ㄹ	ㅁ	ㅂ	ㅅ	ㅈ	ㅊ	ㅋ	ㅌ	ㅍ	ㅎ
–	g	n	d	r	m	b	s	j	ch	k	t	p	h
ㄱ	k	g	kg	ngn	kd	ngn	ngm	kb	ks	kj	kch	k-k	kt	kp	kh, k
ㄴ	n	n	n-g	nn	nd	ll	nm	nb	ns	nj	nch	nk	nt	np	nh
ㄷ	t	d, j	tg	nn	td	nn	nm	tb	ts	tj	tch	tk	t-t	tp	th, t, ch
ㄹ	l	r	lg	ln	ld	ll	lm	lb	ls	lj	lch	lk	lt	lp	lh
ㅁ	m	m	mg	mn	md	mn	mm	mb	ms	mj	mch	mk	mt	mp	mh
ㅂ	p	b	pg	mn	pd	mn	mm	pb	ps	pj	pch	pk	pt	p-p	ph, p
ㅅ	t	s	tg	nn	td	nn	nm	tb	ts	tj	tch	tk	t-t	tp	th, t, ch
ㅇ	ng	ng-	ngg	ngn	ngd	ngn	ngm	ngb	ngs	ngj	ngch	ngk	ngt	ngp	ngh
ㅈ	t	j	tg	nn	td	nn	nm	tb	ts	tj	tch	tk	t-t	tp	th, t, ch
ㅊ	t	ch	tg	nn	td	nn	nm	tb	ts	tj	tch	tk	t-t	tp	th, t, ch
ㅌ	t	t, ch	tg	nn	td	nn	nm	tb	ts	tj	tch	tk	t-t	tp	th, t, ch
ㅎ	t	h	k	nn	t	nn	nm	p	hs	ch	tch	tk	t	tp	t
`;
  let [nextInitials, ...rows] = data
    .trim()
    .replaceAll(EMPTY_PLACEHOLDER, "")
    .split("\n")
    .map((line) => line.split("\t"));
  rows.shift();
  const prevFinals = rows.map((row) => row[0]);
  const rows2 = rows.map((row) => row.slice(2).map((cell) => cell.split(", ")));
  tinyassert(rows2.every((row) => row.length === nextInitials.length));
  return mapValues(
    new Map(zip(prevFinals, rows2)),
    (row) => new Map(zip(nextInitials, row))
  );
})();
