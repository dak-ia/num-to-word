import { InvalidArgumentError, InvalidInputError, InvalidLocaleError } from "../errors";
import { localeMap, numToWord } from "./numToWord";

describe("numToWord", () => {
  test("routes to Si converter", () => {
    expect(numToWord("si", "1000")).toBe("1K");
    expect(numToWord("SI", "1000")).toBe("1K");
  });

  test("routes to En converter", () => {
    expect(numToWord("en", "123")).toBe("One hundred twenty-three");
    expect(numToWord("EN", "123")).toBe("One hundred twenty-three");
    expect(numToWord("english", "123")).toBe("One hundred twenty-three");
    expect(numToWord("ENGLISH", "123")).toBe("One hundred twenty-three");
  });

  test("routes to Jp converter", () => {
    expect(numToWord("jp", "123")).toBe("百二十三");
    expect(numToWord("JP", "123")).toBe("百二十三");
    expect(numToWord("japanese", "123")).toBe("百二十三");
    expect(numToWord("JAPANESE", "123")).toBe("百二十三");
  });

  test("routes to JpDaiji converter", () => {
    expect(numToWord("jpdaiji", "123")).toBe("壱陌弐拾参");
    expect(numToWord("JPDAIJI", "123")).toBe("壱陌弐拾参");
    expect(numToWord("daiji", "123")).toBe("壱陌弐拾参");
    expect(numToWord("DAIJI", "123")).toBe("壱陌弐拾参");
  });

  test("routes to En digit converter", () => {
    expect(numToWord("en-digits", "0123")).toBe("Zero one two three");
    expect(numToWord("EN-DIGITS", "0123")).toBe("Zero one two three");
    expect(numToWord("english-digits", "0123")).toBe("Zero one two three");
  });

  test("routes to Jp digit converter", () => {
    expect(numToWord("jp-digits", "0123")).toBe("〇一二三");
    expect(numToWord("japanese-digits", "0123")).toBe("〇一二三");
    expect(numToWord("kanji-digits", "0123")).toBe("〇一二三");
  });

  test("routes to JpDaiji digit converter", () => {
    expect(numToWord("jpdaiji-digits", "0123")).toBe("零壱弐参");
    expect(numToWord("daiji-digits", "0123")).toBe("零壱弐参");
  });

  test("throws error for unsupported locale", () => {
    expect(() => numToWord("invalid", "123")).toThrow(InvalidLocaleError);
    expect(() => numToWord("fr", "123")).toThrow(InvalidLocaleError);
    expect(() => numToWord("", "123")).toThrow(InvalidLocaleError);
    expect(() => numToWord("si-digits", "123")).toThrow(InvalidLocaleError);
  });

  test("throws error when locale is not a string", () => {
    // @ts-expect-error - Testing invalid input
    expect(() => numToWord(null, "123")).toThrow(InvalidArgumentError);
    // @ts-expect-error - Testing invalid input
    expect(() => numToWord(undefined, "123")).toThrow(InvalidArgumentError);
    // @ts-expect-error - Testing invalid input
    expect(() => numToWord(123, "123")).toThrow(InvalidArgumentError);
    // @ts-expect-error - Testing invalid input
    expect(() => numToWord(true, "123")).toThrow(InvalidArgumentError);
    // @ts-expect-error - Testing invalid input
    expect(() => numToWord({}, "123")).toThrow(InvalidArgumentError);
    // @ts-expect-error - Testing invalid input
    expect(() => numToWord(["en"], "123")).toThrow(InvalidArgumentError);
    // @ts-expect-error - Testing invalid input
    expect(() => numToWord(new String("en"), "123")).toThrow(InvalidArgumentError);
    // @ts-expect-error - Testing invalid input
    expect(() => numToWord(Symbol("en"), "123")).toThrow(InvalidArgumentError);
    // @ts-expect-error - Testing invalid input
    expect(() => numToWord(10n, "123")).toThrow(InvalidArgumentError);
  });

  test("locale error message names the locale, not the number", () => {
    // @ts-expect-error - Testing invalid input
    expect(() => numToWord(123, "123")).toThrow("Expected a string locale.");
  });

  test("throws error for invalid number", () => {
    expect(() => numToWord("en", "")).toThrow(InvalidInputError);
    // @ts-expect-error - Testing invalid input
    expect(() => numToWord("en", null)).toThrow(InvalidArgumentError);
    // @ts-expect-error - Testing invalid input
    expect(() => numToWord("en", undefined)).toThrow(InvalidArgumentError);
    // @ts-expect-error - Testing invalid input
    expect(() => numToWord("en", [1])).toThrow(InvalidArgumentError);
  });

  test("locale is checked before number", () => {
    // @ts-expect-error - Testing invalid input
    expect(() => numToWord("fr", null)).toThrow(InvalidLocaleError);
  });

  test("localeMap exported and valid", () => {
    expect(Array.isArray(localeMap)).toBe(true);
    expect(localeMap.some((e) => e.keys.includes("en") && typeof e.fn === "function")).toBe(true);
    expect(localeMap.some((e) => e.keys.includes("jp") && typeof e.fn === "function")).toBe(true);
  });
});
