import { numToJapanese } from "./numToJapanese";

describe("numToJapanese", () => {
  test("basic numerals", () => {
    expect(numToJapanese("0")).toBe("〇");
    expect(numToJapanese("1")).toBe("一");
    expect(numToJapanese("2")).toBe("二");
    expect(numToJapanese("3")).toBe("三");
    expect(numToJapanese("4")).toBe("四");
    expect(numToJapanese("5")).toBe("五");
    expect(numToJapanese("6")).toBe("六");
    expect(numToJapanese("7")).toBe("七");
    expect(numToJapanese("8")).toBe("八");
    expect(numToJapanese("9")).toBe("九");
    expect(numToJapanese("10")).toBe("十");
    expect(numToJapanese("11")).toBe("十一");
    expect(numToJapanese("20")).toBe("二十");
    expect(numToJapanese("30")).toBe("三十");
    expect(numToJapanese("40")).toBe("四十");
    expect(numToJapanese("99")).toBe("九十九");
  });

  test("simple hundreds", () => {
    expect(numToJapanese("100")).toBe("百");
    expect(numToJapanese("200")).toBe("二百");
    expect(numToJapanese("900")).toBe("九百");
  });

  test("complex hundreds", () => {
    expect(numToJapanese("101")).toBe("百一");
    expect(numToJapanese("110")).toBe("百十");
    expect(numToJapanese("111")).toBe("百十一");
    expect(numToJapanese("202")).toBe("二百二");
    expect(numToJapanese("220")).toBe("二百二十");
    expect(numToJapanese("222")).toBe("二百二十二");
    expect(numToJapanese("123")).toBe("百二十三");
    expect(numToJapanese("999")).toBe("九百九十九");
  });

  test("simple thousands", () => {
    expect(numToJapanese("1000")).toBe("千");
    expect(numToJapanese("2000")).toBe("二千");
    expect(numToJapanese("9000")).toBe("九千");
  });

  test("complex thousands", () => {
    expect(numToJapanese("1001")).toBe("千一");
    expect(numToJapanese("1010")).toBe("千十");
    expect(numToJapanese("1011")).toBe("千十一");
    expect(numToJapanese("1100")).toBe("千百");
    expect(numToJapanese("1101")).toBe("千百一");
    expect(numToJapanese("1110")).toBe("千百十");
    expect(numToJapanese("1111")).toBe("千百十一");
    expect(numToJapanese("2002")).toBe("二千二");
    expect(numToJapanese("2020")).toBe("二千二十");
    expect(numToJapanese("2022")).toBe("二千二十二");
    expect(numToJapanese("2200")).toBe("二千二百");
    expect(numToJapanese("2201")).toBe("二千二百一");
    expect(numToJapanese("2220")).toBe("二千二百二十");
    expect(numToJapanese("2222")).toBe("二千二百二十二");
    expect(numToJapanese("1234")).toBe("千二百三十四");
    expect(numToJapanese("9999")).toBe("九千九百九十九");
  });

  test("simple ten thousands", () => {
    expect(numToJapanese("10000")).toBe("一万");
    expect(numToJapanese("20000")).toBe("二万");
    expect(numToJapanese("90000")).toBe("九万");
  });

  test("complex ten thousands", () => {
    expect(numToJapanese("10001")).toBe("一万一");
    expect(numToJapanese("10010")).toBe("一万十");
    expect(numToJapanese("10011")).toBe("一万十一");
    expect(numToJapanese("10100")).toBe("一万百");
    expect(numToJapanese("10101")).toBe("一万百一");
    expect(numToJapanese("10110")).toBe("一万百十");
    expect(numToJapanese("10111")).toBe("一万百十一");
    expect(numToJapanese("11000")).toBe("一万千");
    expect(numToJapanese("11001")).toBe("一万千一");
    expect(numToJapanese("11010")).toBe("一万千十");
    expect(numToJapanese("11011")).toBe("一万千十一");
    expect(numToJapanese("11100")).toBe("一万千百");
    expect(numToJapanese("11101")).toBe("一万千百一");
    expect(numToJapanese("11110")).toBe("一万千百十");
    expect(numToJapanese("11111")).toBe("一万千百十一");
    expect(numToJapanese("20002")).toBe("二万二");
    expect(numToJapanese("20020")).toBe("二万二十");
    expect(numToJapanese("20022")).toBe("二万二十二");
    expect(numToJapanese("20200")).toBe("二万二百");
    expect(numToJapanese("20202")).toBe("二万二百二");
    expect(numToJapanese("20220")).toBe("二万二百二十");
    expect(numToJapanese("20222")).toBe("二万二百二十二");
    expect(numToJapanese("22000")).toBe("二万二千");
    expect(numToJapanese("22002")).toBe("二万二千二");
    expect(numToJapanese("22020")).toBe("二万二千二十");
    expect(numToJapanese("22022")).toBe("二万二千二十二");
    expect(numToJapanese("22200")).toBe("二万二千二百");
    expect(numToJapanese("22202")).toBe("二万二千二百二");
    expect(numToJapanese("22220")).toBe("二万二千二百二十");
    expect(numToJapanese("22222")).toBe("二万二千二百二十二");
    expect(numToJapanese("12345")).toBe("一万二千三百四十五");
    expect(numToJapanese("99999")).toBe("九万九千九百九十九");
  });

  test("large numbers patterns", () => {
    expect(numToJapanese("100000")).toBe("十万");
    expect(numToJapanese("1000000")).toBe("百万");
    expect(numToJapanese("100000000")).toBe("一億");
    expect(numToJapanese("20000")).toBe("二万");
    expect(numToJapanese("200000")).toBe("二十万");
    expect(numToJapanese("2000000")).toBe("二百万");
    expect(numToJapanese("200000000")).toBe("二億");
    expect(numToJapanese("100001")).toBe("十万一");
    expect(numToJapanese("123456")).toBe("十二万三千四百五十六");
    expect(numToJapanese("123456789")).toBe("一億二千三百四十五万六千七百八十九");
    expect(numToJapanese("987654321")).toBe("九億八千七百六十五万四千三百二十一");
  });

  test("decimal numbers", () => {
    expect(numToJapanese("1.1")).toBe("一・一");
    expect(numToJapanese("1.11")).toBe("一・一一");
    expect(numToJapanese("1.111")).toBe("一・一一一");
    expect(numToJapanese("1.5")).toBe("一・五");
    expect(numToJapanese("12.34")).toBe("十二・三四");
    expect(numToJapanese("123.456")).toBe("百二十三・四五六");
    expect(numToJapanese("0.1")).toBe("〇・一");
    expect(numToJapanese("1.23")).toBe("一・二三");
    expect(numToJapanese("99.99")).toBe("九十九・九九");
  });

  test("numbers with zeros", () => {
    expect(numToJapanese("0")).toBe("〇");
    expect(numToJapanese("00")).toBe("〇");
    expect(numToJapanese("0.0")).toBe("〇・〇");
    expect(numToJapanese("0.00")).toBe("〇・〇〇");
    expect(numToJapanese("00.0")).toBe("〇・〇");
  });

  test("zeros in decimal part", () => {
    expect(numToJapanese("1.0")).toBe("一・〇");
    expect(numToJapanese("1.00")).toBe("一・〇〇");
    expect(numToJapanese("10.01")).toBe("十・〇一");
    expect(numToJapanese("1.0000")).toBe("一・〇〇〇〇");
    expect(numToJapanese("0.0001")).toBe("〇・〇〇〇一");
    expect(numToJapanese("0.001")).toBe("〇・〇〇一");
  });

  test("negative numbers", () => {
    expect(numToJapanese("-1")).toBe("負の一");
    expect(numToJapanese("-123")).toBe("負の百二十三");
    expect(numToJapanese("-1234.56")).toBe("負の千二百三十四・五六");
    expect(numToJapanese(-999)).toBe("負の九百九十九");
  });

  test("infinity", () => {
    expect(numToJapanese(Infinity)).toBe("無限");
    expect(numToJapanese(-Infinity)).toBe("負の無限");
    expect(numToJapanese("Infinity")).toBe("無限");
    expect(numToJapanese("-Infinity")).toBe("負の無限");
    expect(numToJapanese("infinity")).toBe("無限");
  });

  test("invalid input", () => {
    expect(() => numToJapanese("1" + "0".repeat(73))).toThrow("Number too large for conversion.");
    expect(() => numToJapanese("abc")).toThrow("Expected a valid number format.");
    expect(() => numToJapanese("")).toThrow("Expected a number or string.");
    // @ts-expect-error - Testing invalid input
    expect(() => numToJapanese(null)).toThrow("Expected a number or string.");
    // @ts-expect-error - Testing invalid input
    expect(() => numToJapanese(undefined)).toThrow("Expected a number or string.");
  });
});
