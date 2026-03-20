import {
  InvalidArgumentError,
  InvalidInputError,
  InvalidLocaleError,
  NumToWordError,
  NumToWordErrorBase,
  OverflowError,
  numToDaiji,
  numToEnglish,
  numToJapanese,
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

  test("exports numToSi function", () => {
    expect(typeof numToSi).toBe("function");
    expect(numToSi("1000")).toBe("1K");
  });

  test("exports numToWord function", () => {
    expect(typeof numToWord).toBe("function");
    expect(numToWord("en", "123")).toBe("One hundred twenty-three");
  });

  test("exports error classes", () => {
    expect(NumToWordErrorBase).toBeDefined();
    expect(InvalidArgumentError).toBeDefined();
    expect(InvalidInputError).toBeDefined();
    expect(InvalidLocaleError).toBeDefined();
    expect(OverflowError).toBeDefined();
    expect(new InvalidArgumentError()).toBeInstanceOf(NumToWordErrorBase);
    expect(new InvalidInputError()).toBeInstanceOf(NumToWordErrorBase);
    expect(new InvalidLocaleError()).toBeInstanceOf(NumToWordErrorBase);
    expect(new OverflowError()).toBeInstanceOf(NumToWordErrorBase);
  });

  test("exports NumToWordError constants", () => {
    expect(NumToWordError).toBeDefined();
    expect(NumToWordError.NumToWordError).toBe("NumToWordError");
    expect(NumToWordError.InvalidArgumentError).toBe("InvalidArgumentError");
    expect(NumToWordError.InvalidInputError).toBe("InvalidInputError");
    expect(NumToWordError.InvalidLocaleError).toBe("InvalidLocaleError");
    expect(NumToWordError.OverflowError).toBe("OverflowError");
  });
});
