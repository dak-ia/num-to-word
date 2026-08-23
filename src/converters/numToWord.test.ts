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

  test("routes to the digit converter of each language", () => {
    expect(numToWord("ar-digits", "0123")).toBe("صفر واحد اثنان ثلاثة");
    expect(numToWord("arabic-digits", "0123")).toBe("صفر واحد اثنان ثلاثة");
    expect(numToWord("bn-digits", "0123")).toBe("শূন্য এক দুই তিন");
    expect(numToWord("bengali-digits", "0123")).toBe("শূন্য এক দুই তিন");
    expect(numToWord("zh-digits", "0123")).toBe("零一二三");
    expect(numToWord("chinese-digits", "0123")).toBe("零一二三");
    expect(numToWord("nl-digits", "0123")).toBe("Nul een twee drie");
    expect(numToWord("dutch-digits", "0123")).toBe("Nul een twee drie");
    expect(numToWord("fr-digits", "0123")).toBe("Zéro un deux trois");
    expect(numToWord("french-digits", "0123")).toBe("Zéro un deux trois");
    expect(numToWord("de-digits", "0123")).toBe("Null eins zwei drei");
    expect(numToWord("german-digits", "0123")).toBe("Null eins zwei drei");
    expect(numToWord("el-digits", "0123")).toBe("Μηδέν ένα δύο τρία");
    expect(numToWord("greek-digits", "0123")).toBe("Μηδέν ένα δύο τρία");
    expect(numToWord("hi-digits", "0123")).toBe("शून्य एक दो तीन");
    expect(numToWord("hindi-digits", "0123")).toBe("शून्य एक दो तीन");
    expect(numToWord("id-digits", "0123")).toBe("Nol satu dua tiga");
    expect(numToWord("indonesian-digits", "0123")).toBe("Nol satu dua tiga");
    expect(numToWord("it-digits", "0123")).toBe("Zero uno due tre");
    expect(numToWord("italian-digits", "0123")).toBe("Zero uno due tre");
    expect(numToWord("ko-digits", "0123")).toBe("영일이삼");
    expect(numToWord("korean-digits", "0123")).toBe("영일이삼");
    expect(numToWord("pl-digits", "0123")).toBe("Zero jeden dwa trzy");
    expect(numToWord("polish-digits", "0123")).toBe("Zero jeden dwa trzy");
    expect(numToWord("pt-digits", "0123")).toBe("Zero um dois três");
    expect(numToWord("portuguese-digits", "0123")).toBe("Zero um dois três");
    expect(numToWord("ru-digits", "0123")).toBe("Ноль один два три");
    expect(numToWord("russian-digits", "0123")).toBe("Ноль один два три");
    expect(numToWord("es-digits", "0123")).toBe("Cero uno dos tres");
    expect(numToWord("spanish-digits", "0123")).toBe("Cero uno dos tres");
    expect(numToWord("th-digits", "0123")).toBe("ศูนย์หนึ่งสองสาม");
    expect(numToWord("thai-digits", "0123")).toBe("ศูนย์หนึ่งสองสาม");
    expect(numToWord("tr-digits", "0123")).toBe("Sıfır bir iki üç");
    expect(numToWord("turkish-digits", "0123")).toBe("Sıfır bir iki üç");
    expect(numToWord("vi-digits", "0123")).toBe("Không một hai ba");
    expect(numToWord("vietnamese-digits", "0123")).toBe("Không một hai ba");
    expect(numToWord("roman-digits", "0123")).toBe("N I II III");
  });

  test("passes the letter case to the digit converter", () => {
    expect(numToWord("en-digits", "0123", "upper")).toBe("ZERO ONE TWO THREE");
    expect(numToWord("fr-digits", "0123", "lower")).toBe("zéro un deux trois");
    expect(numToWord("roman-digits", "0123", "lower")).toBe("n i ii iii");
  });

  test("throws error when the conversion has no letter case", () => {
    expect(() => numToWord("jp-digits", "0123", "upper")).toThrow(InvalidArgumentError);
    expect(() => numToWord("ar-digits", "0123", "upper")).toThrow(InvalidArgumentError);
    expect(() => numToWord("si", "1000", "upper")).toThrow(InvalidArgumentError);
    expect(() => numToWord("en", "123", "upper")).toThrow(InvalidArgumentError);
    expect(() => numToWord("jp", "123", "upper")).toThrow(InvalidArgumentError);
    expect(() => numToWord("daiji", "123", "upper")).toThrow(InvalidArgumentError);
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
