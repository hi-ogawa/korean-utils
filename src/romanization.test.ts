import { describe, expect, it } from "vitest";
import {
  CONSONANT_RULE,
  SPECIAL_RULE,
  VOWEL_RULE,
  romanize,
} from "./romanization";

describe("romanization", () => {
  it("VOWEL_RULE", () => {
    expect(VOWEL_RULE).toMatchInlineSnapshot(`
      Map {
        "ㅏ" => "a",
        "ㅐ" => "ae",
        "ㅑ" => "ya",
        "ㅒ" => "yae",
        "ㅓ" => "eo",
        "ㅔ" => "e",
        "ㅕ" => "yeo",
        "ㅖ" => "ye",
        "ㅗ" => "o",
        "ㅘ" => "wa",
        "ㅙ" => "wae",
        "ㅚ" => "oe",
        "ㅛ" => "yo",
        "ㅜ" => "u",
        "ㅝ" => "wo",
        "ㅞ" => "we",
        "ㅟ" => "wi",
        "ㅠ" => "yu",
        "ㅡ" => "eu",
        "ㅢ" => "ui",
        "ㅣ" => "i",
      }
    `);
  });

  it("CONSONANT_RULE", () => {
    const pretty = new Map(
      [...CONSONANT_RULE].map(([k, [u, v]]) => [
        k,
        ["", u.padEnd(2, " "), "|", v.padEnd(2, " "), ""].join(" "),
      ])
    );
    expect(pretty).toMatchInlineSnapshot(`
      Map {
        "ㄱ" => " g  | k  ",
        "ㄲ" => " kk | k  ",
        "ㄴ" => " n  | n  ",
        "ㄷ" => " d  | t  ",
        "ㄸ" => " tt |    ",
        "ㄹ" => " r  | l  ",
        "ㅁ" => " m  | m  ",
        "ㅂ" => " b  | p  ",
        "ㅃ" => " pp |    ",
        "ㅅ" => " s  | t  ",
        "ㅆ" => " ss | t  ",
        "ㅇ" => "    | ng ",
        "ㅈ" => " j  | t  ",
        "ㅉ" => " jj |    ",
        "ㅊ" => " ch | t  ",
        "ㅋ" => " k  | k  ",
        "ㅌ" => " t  | t  ",
        "ㅍ" => " p  | p  ",
        "ㅎ" => " h  | t  ",
      }
    `);
  });

  it("SPECIAL_RULE", () => {
    const prevFinals = [...SPECIAL_RULE.keys()];
    const nextInitials = [...SPECIAL_RULE.get("ㄱ")!.keys()];
    expect(prevFinals.join("")).toMatchInlineSnapshot(
      '"ㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅌㅎ"'
    );
    expect(nextInitials.join("")).toMatchInlineSnapshot(
      '"ㅇㄱㄴㄷㄹㅁㅂㅅㅈㅊㅋㅌㅍㅎ"'
    );

    const grid: string[][] = [];
    grid.push(["", ...nextInitials]);
    for (const final of prevFinals) {
      grid.push([
        final,
        ...nextInitials
          .map((initial) => SPECIAL_RULE.get(final)!.get(initial))
          .map((v) => v!.join(", ")),
      ]);
    }
    const pretty = grid
      .map((row) => row.map((cell) => cell.padEnd(8, " ")).join(""))
      .join("\n");
    expect("\n" + pretty).toMatchInlineSnapshot(`
      "
              ㅇ       ㄱ       ㄴ       ㄷ       ㄹ       ㅁ       ㅂ       ㅅ       ㅈ       ㅊ       ㅋ       ㅌ       ㅍ       ㅎ       
      ㄱ       g       kg      ngn     kd      ngn     ngm     kb      ks      kj      kch     k-k     kt      kp      kh, k   
      ㄴ       n       n-g     nn      nd      ll      nm      nb      ns      nj      nch     nk      nt      np      nh      
      ㄷ       d, j    tg      nn      td      nn      nm      tb      ts      tj      tch     tk      t-t     tp      th, t, ch
      ㄹ       r       lg      ln      ld      ll      lm      lb      ls      lj      lch     lk      lt      lp      lh      
      ㅁ       m       mg      mn      md      mn      mm      mb      ms      mj      mch     mk      mt      mp      mh      
      ㅂ       b       pg      mn      pd      mn      mm      pb      ps      pj      pch     pk      pt      p-p     ph, p   
      ㅅ       s       tg      nn      td      nn      nm      tb      ts      tj      tch     tk      t-t     tp      th, t, ch
      ㅇ       ng-     ngg     ngn     ngd     ngn     ngm     ngb     ngs     ngj     ngch    ngk     ngt     ngp     ngh     
      ㅈ       j       tg      nn      td      nn      nm      tb      ts      tj      tch     tk      t-t     tp      th, t, ch
      ㅊ       ch      tg      nn      td      nn      nm      tb      ts      tj      tch     tk      t-t     tp      th, t, ch
      ㅌ       t, ch   tg      nn      td      nn      nm      tb      ts      tj      tch     tk      t-t     tp      th, t, ch
      ㅎ       h       k       nn      t       nn      nm      p       hs      ch      tch     tk      t       tp      t       "
    `);
  });

  describe("romanize", () => {
    it("example", () => {
      const input = "케플러";
      expect(romanize(input).join("")).toMatchInlineSnapshot('"kepeulleo"');
    });
  });
});
