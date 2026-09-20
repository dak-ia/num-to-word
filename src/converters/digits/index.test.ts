// このファイルはnpm run generateからの自動生成のため手動編集禁止
import * as digits from "./index";

describe("digits", () => {
  test("re-exports every generated converter", () => {
    expect(Object.keys(digits).sort()).toEqual([
      "numToArabicDigits",
      "numToBengaliDigits",
      "numToBrazilianPortugueseDigits",
      "numToChineseDigits",
      "numToDaijiDigits",
      "numToDutchDigits",
      "numToEnglishDigits",
      "numToFrenchDigits",
      "numToGermanDigits",
      "numToGreekDigits",
      "numToHindiDigits",
      "numToIndonesianDigits",
      "numToItalianDigits",
      "numToJapaneseDigits",
      "numToKoreanDigits",
      "numToMexicanSpanishDigits",
      "numToPolishDigits",
      "numToPortugueseDigits",
      "numToRomanDigits",
      "numToRussianDigits",
      "numToSpanishDigits",
      "numToThaiDigits",
      "numToTurkishDigits",
      "numToVietnameseDigits",
    ]);
  });
});
