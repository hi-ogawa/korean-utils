import { range } from "@hiogawa/utils";
import { difference, inRange, mapKeys } from "./misc";

const CONSONANT_OFFSET = 0x3131;
const VOWEL_OFFSET = 0x314f;
export const SYLLABLE_OFFSET = 0xac00;

export const CONSONANTS = range(CONSONANT_OFFSET, CONSONANT_OFFSET + 30).map(
  (i) => String.fromCodePoint(i)
);
export const VOWELS = range(VOWEL_OFFSET, VOWEL_OFFSET + 21).map((i) =>
  String.fromCodePoint(i)
);

export const INITIAL_CONSONANTS = difference(CONSONANTS, [
  "ㄳ",
  "ㄵ",
  "ㄶ",
  "ㄺ",
  "ㄻ",
  "ㄼ",
  "ㄽ",
  "ㄾ",
  "ㄿ",
  "ㅀ",
  "ㅄ",
]);

export const FINAL_CONSONANTS = difference(CONSONANTS, ["ㄸ", "ㅃ", "ㅉ"]);

export const SYLLABLE_MAP: Map<string, [string, string, string | undefined]> =
  (() => {
    const acc: [string, [string, string, string | undefined]][] = [];
    let offset = SYLLABLE_OFFSET;
    for (const i of INITIAL_CONSONANTS) {
      for (const m of VOWELS) {
        for (const f of [undefined, ...FINAL_CONSONANTS]) {
          acc.push([String.fromCodePoint(offset++), [i, m, f]]);
        }
      }
    }
    return new Map(acc);
  })();

export const SYLLABLE_CODE_MAP = mapKeys(
  SYLLABLE_MAP,
  (_v, k) => k.codePointAt(0)!
);

export const SYLLABLES = [...SYLLABLE_MAP.keys()];

export const SYLLABLE_OFFSET_END = SYLLABLE_OFFSET + SYLLABLES.length;

export function isSyllable(s: string): boolean {
  return s.length === 1 && isSyllableCodepoint(s.codePointAt(0)!);
}

export function isSyllableCodepoint(code: number): boolean {
  return inRange(code, SYLLABLE_OFFSET, SYLLABLE_OFFSET_END);
}
