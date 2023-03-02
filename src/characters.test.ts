import { describe, expect, it } from "vitest";
import {
  CONSONANTS,
  FINAL_CONSONANTS,
  INITIAL_CONSONANTS,
  SYLLABLES,
  SYLLABLE_MAP,
  VOWELS,
} from "./characters";
import { mapValues } from "./misc";

describe("characters", () => {
  it("CONSONANTS", () => {
    expect(CONSONANTS.length).toMatchInlineSnapshot("30");
    expect(CONSONANTS).toMatchInlineSnapshot(`
      [
        "ㄱ",
        "ㄲ",
        "ㄳ",
        "ㄴ",
        "ㄵ",
        "ㄶ",
        "ㄷ",
        "ㄸ",
        "ㄹ",
        "ㄺ",
        "ㄻ",
        "ㄼ",
        "ㄽ",
        "ㄾ",
        "ㄿ",
        "ㅀ",
        "ㅁ",
        "ㅂ",
        "ㅃ",
        "ㅄ",
        "ㅅ",
        "ㅆ",
        "ㅇ",
        "ㅈ",
        "ㅉ",
        "ㅊ",
        "ㅋ",
        "ㅌ",
        "ㅍ",
        "ㅎ",
      ]
    `);
  });

  it("INITIAL_CONSONANTS", () => {
    expect(INITIAL_CONSONANTS.length).toMatchInlineSnapshot("19");
    expect(INITIAL_CONSONANTS).toMatchInlineSnapshot(`
      [
        "ㄱ",
        "ㄲ",
        "ㄴ",
        "ㄷ",
        "ㄸ",
        "ㄹ",
        "ㅁ",
        "ㅂ",
        "ㅃ",
        "ㅅ",
        "ㅆ",
        "ㅇ",
        "ㅈ",
        "ㅉ",
        "ㅊ",
        "ㅋ",
        "ㅌ",
        "ㅍ",
        "ㅎ",
      ]
    `);
  });

  it("FINAL_CONSONANTS", () => {
    expect(FINAL_CONSONANTS.length).toMatchInlineSnapshot("27");
    expect(FINAL_CONSONANTS).toMatchInlineSnapshot(`
      [
        "ㄱ",
        "ㄲ",
        "ㄳ",
        "ㄴ",
        "ㄵ",
        "ㄶ",
        "ㄷ",
        "ㄹ",
        "ㄺ",
        "ㄻ",
        "ㄼ",
        "ㄽ",
        "ㄾ",
        "ㄿ",
        "ㅀ",
        "ㅁ",
        "ㅂ",
        "ㅄ",
        "ㅅ",
        "ㅆ",
        "ㅇ",
        "ㅈ",
        "ㅊ",
        "ㅋ",
        "ㅌ",
        "ㅍ",
        "ㅎ",
      ]
    `);
  });

  it("VOWELS", () => {
    expect(VOWELS.length).toMatchInlineSnapshot("21");
    expect(VOWELS).toMatchInlineSnapshot(`
      [
        "ㅏ",
        "ㅐ",
        "ㅑ",
        "ㅒ",
        "ㅓ",
        "ㅔ",
        "ㅕ",
        "ㅖ",
        "ㅗ",
        "ㅘ",
        "ㅙ",
        "ㅚ",
        "ㅛ",
        "ㅜ",
        "ㅝ",
        "ㅞ",
        "ㅟ",
        "ㅠ",
        "ㅡ",
        "ㅢ",
        "ㅣ",
      ]
    `);
  });

  it("SYLLABLES", () => {
    expect(SYLLABLES.length).toMatchInlineSnapshot("11172");
    expect(SYLLABLES.slice(0, 10)).toMatchInlineSnapshot(`
      [
        "가",
        "각",
        "갂",
        "갃",
        "간",
        "갅",
        "갆",
        "갇",
        "갈",
        "갉",
      ]
    `);
  });

  describe("SYLLABLE_MAPS", () => {
    it("basic", () => {
      expect(SYLLABLE_MAP.size).toMatchInlineSnapshot("11172");
      const prettier = new Map(
        [...SYLLABLE_MAP].slice(0, 40).map(([k, v]) => [k, v.join(" ")])
      );
      expect(prettier).toMatchInlineSnapshot(`
        Map {
          "가" => "ㄱ ㅏ ",
          "각" => "ㄱ ㅏ ㄱ",
          "갂" => "ㄱ ㅏ ㄲ",
          "갃" => "ㄱ ㅏ ㄳ",
          "간" => "ㄱ ㅏ ㄴ",
          "갅" => "ㄱ ㅏ ㄵ",
          "갆" => "ㄱ ㅏ ㄶ",
          "갇" => "ㄱ ㅏ ㄷ",
          "갈" => "ㄱ ㅏ ㄹ",
          "갉" => "ㄱ ㅏ ㄺ",
          "갊" => "ㄱ ㅏ ㄻ",
          "갋" => "ㄱ ㅏ ㄼ",
          "갌" => "ㄱ ㅏ ㄽ",
          "갍" => "ㄱ ㅏ ㄾ",
          "갎" => "ㄱ ㅏ ㄿ",
          "갏" => "ㄱ ㅏ ㅀ",
          "감" => "ㄱ ㅏ ㅁ",
          "갑" => "ㄱ ㅏ ㅂ",
          "값" => "ㄱ ㅏ ㅄ",
          "갓" => "ㄱ ㅏ ㅅ",
          "갔" => "ㄱ ㅏ ㅆ",
          "강" => "ㄱ ㅏ ㅇ",
          "갖" => "ㄱ ㅏ ㅈ",
          "갗" => "ㄱ ㅏ ㅊ",
          "갘" => "ㄱ ㅏ ㅋ",
          "같" => "ㄱ ㅏ ㅌ",
          "갚" => "ㄱ ㅏ ㅍ",
          "갛" => "ㄱ ㅏ ㅎ",
          "개" => "ㄱ ㅐ ",
          "객" => "ㄱ ㅐ ㄱ",
          "갞" => "ㄱ ㅐ ㄲ",
          "갟" => "ㄱ ㅐ ㄳ",
          "갠" => "ㄱ ㅐ ㄴ",
          "갡" => "ㄱ ㅐ ㄵ",
          "갢" => "ㄱ ㅐ ㄶ",
          "갣" => "ㄱ ㅐ ㄷ",
          "갤" => "ㄱ ㅐ ㄹ",
          "갥" => "ㄱ ㅐ ㄺ",
          "갦" => "ㄱ ㅐ ㄻ",
          "갧" => "ㄱ ㅐ ㄼ",
        }
      `);
    });

    it("example", () => {
      expect([..."케플러"].map((c) => SYLLABLE_MAP.get(c)))
        .toMatchInlineSnapshot(`
        [
          [
            "ㅋ",
            "ㅔ",
            undefined,
          ],
          [
            "ㅍ",
            "ㅡ",
            "ㄹ",
          ],
          [
            "ㄹ",
            "ㅓ",
            undefined,
          ],
        ]
      `);
    });
  });
});
