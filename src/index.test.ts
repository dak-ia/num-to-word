import {
  InvalidArgumentError,
  InvalidInputError,
  InvalidLocaleError,
  NumToWordError,
  OverflowError,
  numToDaiji,
  numToDaijiDigits,
  numToEnglish,
  numToEnglishDigits,
  numToJapanese,
  numToJapaneseDigits,
  numToSi,
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

  test("exports numToSi function", () => {
    expect(typeof numToSi).toBe("function");
    expect(numToSi("1000")).toBe("1K");
  });

  test("exports numToWord function", () => {
    expect(typeof numToWord).toBe("function");
    expect(numToWord("en", "123")).toBe("One hundred twenty-three");
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
