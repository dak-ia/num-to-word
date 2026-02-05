import { numToDaiji } from "./numToDaiji";

describe("numToDaiji", () => {
  test("basic numerals", () => {
    expect(numToDaiji("0")).toBe("零");
    expect(numToDaiji("1")).toBe("壱");
    expect(numToDaiji("2")).toBe("弐");
    expect(numToDaiji("3")).toBe("参");
    expect(numToDaiji("4")).toBe("肆");
    expect(numToDaiji("5")).toBe("伍");
    expect(numToDaiji("6")).toBe("陸");
    expect(numToDaiji("7")).toBe("漆");
    expect(numToDaiji("8")).toBe("捌");
    expect(numToDaiji("9")).toBe("玖");
    expect(numToDaiji("10")).toBe("壱拾");
    expect(numToDaiji("11")).toBe("壱拾壱");
    expect(numToDaiji("20")).toBe("弐拾");
    expect(numToDaiji("30")).toBe("参拾");
    expect(numToDaiji("40")).toBe("肆拾");
    expect(numToDaiji("99")).toBe("玖拾玖");
  });

  test("simple hundreds", () => {
    expect(numToDaiji("100")).toBe("壱陌");
    expect(numToDaiji("200")).toBe("弐陌");
    expect(numToDaiji("900")).toBe("玖陌");
  });

  test("complex hundreds", () => {
    expect(numToDaiji("101")).toBe("壱陌壱");
    expect(numToDaiji("110")).toBe("壱陌壱拾");
    expect(numToDaiji("111")).toBe("壱陌壱拾壱");
    expect(numToDaiji("202")).toBe("弐陌弐");
    expect(numToDaiji("220")).toBe("弐陌弐拾");
    expect(numToDaiji("222")).toBe("弐陌弐拾弐");
    expect(numToDaiji("123")).toBe("壱陌弐拾参");
    expect(numToDaiji("999")).toBe("玖陌玖拾玖");
  });

  test("simple thousands", () => {
    expect(numToDaiji("1000")).toBe("壱阡");
    expect(numToDaiji("2000")).toBe("弐阡");
    expect(numToDaiji("9000")).toBe("玖阡");
  });

  test("complex thousands", () => {
    expect(numToDaiji("1001")).toBe("壱阡壱");
    expect(numToDaiji("1010")).toBe("壱阡壱拾");
    expect(numToDaiji("1011")).toBe("壱阡壱拾壱");
    expect(numToDaiji("1100")).toBe("壱阡壱陌");
    expect(numToDaiji("1101")).toBe("壱阡壱陌壱");
    expect(numToDaiji("1110")).toBe("壱阡壱陌壱拾");
    expect(numToDaiji("1111")).toBe("壱阡壱陌壱拾壱");
    expect(numToDaiji("2002")).toBe("弐阡弐");
    expect(numToDaiji("2020")).toBe("弐阡弐拾");
    expect(numToDaiji("2022")).toBe("弐阡弐拾弐");
    expect(numToDaiji("2200")).toBe("弐阡弐陌");
    expect(numToDaiji("2201")).toBe("弐阡弐陌壱");
    expect(numToDaiji("2220")).toBe("弐阡弐陌弐拾");
    expect(numToDaiji("2222")).toBe("弐阡弐陌弐拾弐");
    expect(numToDaiji("1234")).toBe("壱阡弐陌参拾肆");
    expect(numToDaiji("9999")).toBe("玖阡玖陌玖拾玖");
  });

  test("simple ten thousands", () => {
    expect(numToDaiji("10000")).toBe("壱萬");
    expect(numToDaiji("20000")).toBe("弐萬");
    expect(numToDaiji("90000")).toBe("玖萬");
  });

  test("complex ten thousands", () => {
    expect(numToDaiji("10001")).toBe("壱萬壱");
    expect(numToDaiji("10010")).toBe("壱萬壱拾");
    expect(numToDaiji("10011")).toBe("壱萬壱拾壱");
    expect(numToDaiji("10100")).toBe("壱萬壱陌");
    expect(numToDaiji("10101")).toBe("壱萬壱陌壱");
    expect(numToDaiji("10110")).toBe("壱萬壱陌壱拾");
    expect(numToDaiji("10111")).toBe("壱萬壱陌壱拾壱");
    expect(numToDaiji("11000")).toBe("壱萬壱阡");
    expect(numToDaiji("11001")).toBe("壱萬壱阡壱");
    expect(numToDaiji("11010")).toBe("壱萬壱阡壱拾");
    expect(numToDaiji("11011")).toBe("壱萬壱阡壱拾壱");
    expect(numToDaiji("11100")).toBe("壱萬壱阡壱陌");
    expect(numToDaiji("11101")).toBe("壱萬壱阡壱陌壱");
    expect(numToDaiji("11110")).toBe("壱萬壱阡壱陌壱拾");
    expect(numToDaiji("11111")).toBe("壱萬壱阡壱陌壱拾壱");
    expect(numToDaiji("20002")).toBe("弐萬弐");
    expect(numToDaiji("20020")).toBe("弐萬弐拾");
    expect(numToDaiji("20022")).toBe("弐萬弐拾弐");
    expect(numToDaiji("20200")).toBe("弐萬弐陌");
    expect(numToDaiji("20202")).toBe("弐萬弐陌弐");
    expect(numToDaiji("20220")).toBe("弐萬弐陌弐拾");
    expect(numToDaiji("20222")).toBe("弐萬弐陌弐拾弐");
    expect(numToDaiji("22000")).toBe("弐萬弐阡");
    expect(numToDaiji("22002")).toBe("弐萬弐阡弐");
    expect(numToDaiji("22020")).toBe("弐萬弐阡弐拾");
    expect(numToDaiji("22022")).toBe("弐萬弐阡弐拾弐");
    expect(numToDaiji("22200")).toBe("弐萬弐阡弐陌");
    expect(numToDaiji("22202")).toBe("弐萬弐阡弐陌弐");
    expect(numToDaiji("22220")).toBe("弐萬弐阡弐陌弐拾");
    expect(numToDaiji("22222")).toBe("弐萬弐阡弐陌弐拾弐");
    expect(numToDaiji("12345")).toBe("壱萬弐阡参陌肆拾伍");
    expect(numToDaiji("99999")).toBe("玖萬玖阡玖陌玖拾玖");
  });

  test("large numbers patterns", () => {
    expect(numToDaiji("100000")).toBe("壱拾萬");
    expect(numToDaiji("1000000")).toBe("壱陌萬");
    expect(numToDaiji("100000000")).toBe("壱億");
    expect(numToDaiji("20000")).toBe("弐萬");
    expect(numToDaiji("200000")).toBe("弐拾萬");
    expect(numToDaiji("2000000")).toBe("弐陌萬");
    expect(numToDaiji("200000000")).toBe("弐億");
    expect(numToDaiji("100001")).toBe("壱拾萬壱");
    expect(numToDaiji("123456")).toBe("壱拾弐萬参阡肆陌伍拾陸");
    expect(numToDaiji("123456789")).toBe("壱億弐阡参陌肆拾伍萬陸阡漆陌捌拾玖");
    expect(numToDaiji("987654321")).toBe("玖億捌阡漆陌陸拾伍萬肆阡参陌弐拾壱");
  });

  test("decimal numbers", () => {
    expect(numToDaiji("1.1")).toBe("壱・壱");
    expect(numToDaiji("1.11")).toBe("壱・壱壱");
    expect(numToDaiji("1.111")).toBe("壱・壱壱壱");
    expect(numToDaiji("1.5")).toBe("壱・伍");
    expect(numToDaiji("12.34")).toBe("壱拾弐・参肆");
    expect(numToDaiji("123.456")).toBe("壱陌弐拾参・肆伍陸");
    expect(numToDaiji("0.1")).toBe("零・壱");
    expect(numToDaiji("1.23")).toBe("壱・弐参");
    expect(numToDaiji("99.99")).toBe("玖拾玖・玖玖");
  });

  test("numbers with zeros", () => {
    expect(numToDaiji("0")).toBe("零");
    expect(numToDaiji("00")).toBe("零");
    expect(numToDaiji("0.0")).toBe("零・零");
    expect(numToDaiji("0.00")).toBe("零・零零");
    expect(numToDaiji("00.0")).toBe("零・零");
  });

  test("zeros in decimal part", () => {
    expect(numToDaiji("1.0")).toBe("壱・零");
    expect(numToDaiji("1.00")).toBe("壱・零零");
    expect(numToDaiji("10.01")).toBe("壱拾・零壱");
    expect(numToDaiji("1.0000")).toBe("壱・零零零零");
    expect(numToDaiji("0.0001")).toBe("零・零零零壱");
    expect(numToDaiji("0.001")).toBe("零・零零壱");
  });

  test("negative numbers", () => {
    expect(numToDaiji("-1")).toBe("負の壱");
    expect(numToDaiji("-123")).toBe("負の壱陌弐拾参");
    expect(numToDaiji("-10000")).toBe("負の壱萬");
  });

  test("infinity", () => {
    expect(numToDaiji(Infinity)).toBe("無限");
    expect(numToDaiji(-Infinity)).toBe("負の無限");
    expect(numToDaiji("Infinity")).toBe("無限");
    expect(numToDaiji("-Infinity")).toBe("負の無限");
  });

  test("invalid input", () => {
    expect(() => numToDaiji("1" + "0".repeat(73))).toThrow("Number too large for conversion.");
    expect(() => numToDaiji("abc")).toThrow("Expected a valid number format.");
    expect(() => numToDaiji("")).toThrow("Expected a number or string.");
    // @ts-expect-error - Testing invalid input
    expect(() => numToDaiji(null)).toThrow("Expected a number or string.");
    // @ts-expect-error - Testing invalid input
    expect(() => numToDaiji(undefined)).toThrow("Expected a number or string.");
  });
});
