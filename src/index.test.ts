import {
  InvalidArgumentError,
  InvalidInputError,
  InvalidLocaleError,
  LetterCase,
  NumToWordError,
  OverflowError,
  numToArabicDigits,
  numToBengaliDigits,
  numToChineseDigits,
  numToDaiji,
  numToDaijiDigits,
  numToDutchDigits,
  numToEnglish,
  numToEnglishDigits,
  numToFrenchDigits,
  numToGermanDigits,
  numToGreekDigits,
  numToHindiDigits,
  numToIndonesianDigits,
  numToItalianDigits,
  numToJapanese,
  numToJapaneseDigits,
  numToKoreanDigits,
  numToPolishDigits,
  numToPortugueseDigits,
  numToRomanDigits,
  numToRussianDigits,
  numToSi,
  numToSpanishDigits,
  numToThaiDigits,
  numToTurkishDigits,
  numToVietnameseDigits,
  numToWord,
  version,
} from "./index";

describe("index", () => {
  test("exports version", () => {
    expect(version).toBe("0.1.0-test");
  });

  test("exports numToEnglish function", () => {
    expect(typeof numToEnglish).toBe("function");
    expect(numToEnglish("123")).toBe("One hundred twenty-three");
  });

  test("exports numToJapanese function", () => {
    expect(typeof numToJapanese).toBe("function");
    expect(numToJapanese("123")).toBe("百二十三");
  });

  test("exports numToDaiji function", () => {
    expect(typeof numToDaiji).toBe("function");
    expect(numToDaiji("123")).toBe("壱陌弐拾参");
  });

  test("exports numToEnglishDigits function", () => {
    expect(typeof numToEnglishDigits).toBe("function");
    expect(numToEnglishDigits("0123")).toBe("Zero one two three");
  });

  test("exports numToJapaneseDigits function", () => {
    expect(typeof numToJapaneseDigits).toBe("function");
    expect(numToJapaneseDigits("0123")).toBe("〇一二三");
  });

  test("exports numToDaijiDigits function", () => {
    expect(typeof numToDaijiDigits).toBe("function");
    expect(numToDaijiDigits("0123")).toBe("零壱弐参");
  });

  test("exports numToArabicDigits function", () => {
    expect(typeof numToArabicDigits).toBe("function");
    expect(numToArabicDigits("0123")).toBe("صفر واحد اثنان ثلاثة");
  });

  test("exports numToBengaliDigits function", () => {
    expect(typeof numToBengaliDigits).toBe("function");
    expect(numToBengaliDigits("0123")).toBe("শূন্য এক দুই তিন");
  });

  test("exports numToChineseDigits function", () => {
    expect(typeof numToChineseDigits).toBe("function");
    expect(numToChineseDigits("0123")).toBe("零一二三");
  });

  test("exports numToDutchDigits function", () => {
    expect(typeof numToDutchDigits).toBe("function");
    expect(numToDutchDigits("0123")).toBe("Nul een twee drie");
  });

  test("exports numToFrenchDigits function", () => {
    expect(typeof numToFrenchDigits).toBe("function");
    expect(numToFrenchDigits("0123")).toBe("Zéro un deux trois");
  });

  test("exports numToGermanDigits function", () => {
    expect(typeof numToGermanDigits).toBe("function");
    expect(numToGermanDigits("0123")).toBe("Null eins zwei drei");
  });

  test("exports numToGreekDigits function", () => {
    expect(typeof numToGreekDigits).toBe("function");
    expect(numToGreekDigits("0123")).toBe("Μηδέν ένα δύο τρία");
  });

  test("exports numToHindiDigits function", () => {
    expect(typeof numToHindiDigits).toBe("function");
    expect(numToHindiDigits("0123")).toBe("शून्य एक दो तीन");
  });

  test("exports numToIndonesianDigits function", () => {
    expect(typeof numToIndonesianDigits).toBe("function");
    expect(numToIndonesianDigits("0123")).toBe("Nol satu dua tiga");
  });

  test("exports numToItalianDigits function", () => {
    expect(typeof numToItalianDigits).toBe("function");
    expect(numToItalianDigits("0123")).toBe("Zero uno due tre");
  });

  test("exports numToKoreanDigits function", () => {
    expect(typeof numToKoreanDigits).toBe("function");
    expect(numToKoreanDigits("0123")).toBe("영일이삼");
  });

  test("exports numToPolishDigits function", () => {
    expect(typeof numToPolishDigits).toBe("function");
    expect(numToPolishDigits("0123")).toBe("Zero jeden dwa trzy");
  });

  test("exports numToPortugueseDigits function", () => {
    expect(typeof numToPortugueseDigits).toBe("function");
    expect(numToPortugueseDigits("0123")).toBe("Zero um dois três");
  });

  test("exports numToRomanDigits function", () => {
    expect(typeof numToRomanDigits).toBe("function");
    expect(numToRomanDigits("0123")).toBe("N I II III");
  });

  test("exports numToRussianDigits function", () => {
    expect(typeof numToRussianDigits).toBe("function");
    expect(numToRussianDigits("0123")).toBe("Ноль один два три");
  });

  test("exports numToSpanishDigits function", () => {
    expect(typeof numToSpanishDigits).toBe("function");
    expect(numToSpanishDigits("0123")).toBe("Cero uno dos tres");
  });

  test("exports numToThaiDigits function", () => {
    expect(typeof numToThaiDigits).toBe("function");
    expect(numToThaiDigits("0123")).toBe("ศูนย์หนึ่งสองสาม");
  });

  test("exports numToTurkishDigits function", () => {
    expect(typeof numToTurkishDigits).toBe("function");
    expect(numToTurkishDigits("0123")).toBe("Sıfır bir iki üç");
  });

  test("exports numToVietnameseDigits function", () => {
    expect(typeof numToVietnameseDigits).toBe("function");
    expect(numToVietnameseDigits("0123")).toBe("Không một hai ba");
  });

  test("exports numToSi function", () => {
    expect(typeof numToSi).toBe("function");
    expect(numToSi("1000")).toBe("1K");
  });

  test("exports numToWord function", () => {
    expect(typeof numToWord).toBe("function");
    expect(numToWord("en", "123")).toBe("One hundred twenty-three");
  });

  test("exports LetterCase", () => {
    expect(LetterCase).toEqual({ capitalize: "capitalize", lower: "lower", upper: "upper" });
  });

  test("exports error classes", () => {
    expect(NumToWordError).toBeDefined();
    expect(InvalidArgumentError).toBeDefined();
    expect(InvalidInputError).toBeDefined();
    expect(InvalidLocaleError).toBeDefined();
    expect(OverflowError).toBeDefined();
    expect(new InvalidArgumentError()).toBeInstanceOf(NumToWordError);
    expect(new InvalidInputError()).toBeInstanceOf(NumToWordError);
    expect(new InvalidLocaleError()).toBeInstanceOf(NumToWordError);
    expect(new OverflowError()).toBeInstanceOf(NumToWordError);
  });
});
