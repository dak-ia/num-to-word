import { splitNum, splitTo1Digit, splitTo3Digits, splitTo4Digits } from "./helpers";

describe("splitNum", () => {
  test("integer only", () => {
    expect(splitNum("123")).toEqual({ integer: "123", decimal: "", isNegative: false });
    expect(splitNum("0")).toEqual({ integer: "0", decimal: "", isNegative: false });
    expect(splitNum("999")).toEqual({ integer: "999", decimal: "", isNegative: false });
    expect(splitNum("+123")).toEqual({ integer: "123", decimal: "", isNegative: false });
    expect(splitNum("+999")).toEqual({ integer: "999", decimal: "", isNegative: false });
  });

  test("with decimal", () => {
    expect(splitNum("123.456")).toEqual({ integer: "123", decimal: "456", isNegative: false });
    expect(splitNum("0.5")).toEqual({ integer: "0", decimal: "5", isNegative: false });
    expect(splitNum("999.999")).toEqual({ integer: "999", decimal: "999", isNegative: false });
  });

  test("edge cases", () => {
    expect(splitNum(".5")).toEqual({ integer: "0", decimal: "5", isNegative: false });
    expect(splitNum("5.")).toEqual({ integer: "5", decimal: "0", isNegative: false });
    expect(splitNum("-1513")).toEqual({ integer: "1513", decimal: "", isNegative: true });
    expect(splitNum("-4163520.4651")).toEqual({ integer: "4163520", decimal: "4651", isNegative: true });
    expect(splitNum("53.")).toEqual({ integer: "53", decimal: "0", isNegative: false });
    expect(splitNum("216")).toEqual({ integer: "216", decimal: "", isNegative: false });
    expect(splitNum(".113")).toEqual({ integer: "0", decimal: "113", isNegative: false });
    expect(splitNum("-.1553")).toEqual({ integer: "0", decimal: "1553", isNegative: true });
    expect(splitNum("465.145")).toEqual({ integer: "465", decimal: "145", isNegative: false });
    expect(splitNum("5")).toEqual({ integer: "5", decimal: "", isNegative: false });
  });

  test("full-width to half-width", () => {
    expect(splitNum("１２３")).toEqual({ integer: "123", decimal: "", isNegative: false });
    expect(splitNum("０")).toEqual({ integer: "0", decimal: "", isNegative: false });
    expect(splitNum("１２３．４５６")).toEqual({ integer: "123", decimal: "456", isNegative: false });
  });

  test("separator removal", () => {
    expect(splitNum("1,234")).toEqual({ integer: "1234", decimal: "", isNegative: false });
    expect(splitNum("1,234,567")).toEqual({ integer: "1234567", decimal: "", isNegative: false });
    expect(splitNum("１，２３４")).toEqual({ integer: "1234", decimal: "", isNegative: false });
    expect(splitNum("1'234'567")).toEqual({ integer: "1234567", decimal: "", isNegative: false });
    expect(splitNum("1'234'567")).toEqual({ integer: "1234567", decimal: "", isNegative: false });
  });

  test("whitespace removal", () => {
    expect(splitNum(" 123 ")).toEqual({ integer: "123", decimal: "", isNegative: false });
    expect(splitNum("1 2 3")).toEqual({ integer: "123", decimal: "", isNegative: false });
  });

  test("number input", () => {
    expect(splitNum(123)).toEqual({ integer: "123", decimal: "", isNegative: false });
    expect(splitNum(123.456)).toEqual({ integer: "123", decimal: "456", isNegative: false });
  });

  test("negative numbers", () => {
    expect(splitNum("-123")).toEqual({ integer: "123", decimal: "", isNegative: true });
    expect(splitNum("-123.456")).toEqual({ integer: "123", decimal: "456", isNegative: true });
    expect(splitNum(-999)).toEqual({ integer: "999", decimal: "", isNegative: true });
    expect(splitNum("-0.5")).toEqual({ integer: "0", decimal: "5", isNegative: true });
    expect(splitNum("−123")).toEqual({ integer: "123", decimal: "", isNegative: true });
  });

  test("exponential notation", () => {
    expect(splitNum("1.23e5")).toEqual({ integer: "123000", decimal: "", isNegative: false });
    expect(splitNum("1.23e+5")).toEqual({ integer: "123000", decimal: "", isNegative: false });
    expect(splitNum("5e3")).toEqual({ integer: "5000", decimal: "", isNegative: false });
    expect(splitNum("1e0")).toEqual({ integer: "1", decimal: "", isNegative: false });
    expect(splitNum("9.87654e6")).toEqual({ integer: "9876540", decimal: "", isNegative: false });

    expect(splitNum("1.23e-2")).toEqual({ integer: "0", decimal: "0123", isNegative: false });
    expect(splitNum("5e-3")).toEqual({ integer: "0", decimal: "005", isNegative: false });
    expect(splitNum("1.5e-1")).toEqual({ integer: "0", decimal: "15", isNegative: false });
    expect(splitNum("3.14159e-5")).toEqual({ integer: "0", decimal: "0000314159", isNegative: false });

    expect(splitNum("-1.5e4")).toEqual({ integer: "15000", decimal: "", isNegative: true });
    expect(splitNum("-2.5e-3")).toEqual({ integer: "0", decimal: "0025", isNegative: true });
    expect(splitNum("-1e10")).toEqual({ integer: "10000000000", decimal: "", isNegative: true });

    expect(splitNum("2.5E10")).toEqual({ integer: "25000000000", decimal: "", isNegative: false });
    expect(splitNum("1.5E-2")).toEqual({ integer: "0", decimal: "015", isNegative: false });

    expect(splitNum("1e20")).toEqual({ integer: "100000000000000000000", decimal: "", isNegative: false });
    expect(splitNum("1.0e5")).toEqual({ integer: "100000", decimal: "", isNegative: false });

    expect(splitNum("0e5")).toEqual({ integer: "0", decimal: "", isNegative: false });
    expect(splitNum("0.0e3")).toEqual({ integer: "0", decimal: "", isNegative: false });
    expect(splitNum("0.00e2")).toEqual({ integer: "0", decimal: "", isNegative: false });
    expect(splitNum("0.000e1")).toEqual({ integer: "0", decimal: "00", isNegative: false });

    expect(splitNum("0.5e2")).toEqual({ integer: "50", decimal: "", isNegative: false });
    expect(splitNum("0.1e3")).toEqual({ integer: "100", decimal: "", isNegative: false });
    expect(splitNum("0.05e4")).toEqual({ integer: "500", decimal: "", isNegative: false });
    expect(splitNum("0.123e3")).toEqual({ integer: "123", decimal: "", isNegative: false });
    expect(splitNum("0.001e5")).toEqual({ integer: "100", decimal: "", isNegative: false });
    expect(splitNum("0.00456e3")).toEqual({ integer: "4", decimal: "56", isNegative: false });
    expect(splitNum("-0.5e2")).toEqual({ integer: "50", decimal: "", isNegative: true });
    expect(splitNum("-0.123e4")).toEqual({ integer: "1230", decimal: "", isNegative: true });

    expect(splitNum("12.34e3")).toEqual({ integer: "12340", decimal: "", isNegative: false });
    expect(splitNum("123.45e2")).toEqual({ integer: "12345", decimal: "", isNegative: false });
    expect(splitNum("12e5")).toEqual({ integer: "1200000", decimal: "", isNegative: false });
    expect(splitNum("100.5e3")).toEqual({ integer: "100500", decimal: "", isNegative: false });
    expect(splitNum("99.99e4")).toEqual({ integer: "999900", decimal: "", isNegative: false });
    expect(splitNum("-12.34e3")).toEqual({ integer: "12340", decimal: "", isNegative: true });

    expect(splitNum("12.34e-1")).toEqual({ integer: "1", decimal: "234", isNegative: false });
    expect(splitNum("123.456e-2")).toEqual({ integer: "1", decimal: "23456", isNegative: false });
    expect(splitNum("12e-1")).toEqual({ integer: "1", decimal: "2", isNegative: false });
    expect(splitNum("100.5e-2")).toEqual({ integer: "1", decimal: "005", isNegative: false });
    expect(splitNum("-12.34e-1")).toEqual({ integer: "1", decimal: "234", isNegative: true });

    expect(splitNum("1.23e1")).toEqual({ integer: "12", decimal: "3", isNegative: false });
    expect(splitNum("12.34e1")).toEqual({ integer: "123", decimal: "4", isNegative: false });
    expect(splitNum("123.45e-1")).toEqual({ integer: "12", decimal: "345", isNegative: false });
    expect(splitNum("9.876e2")).toEqual({ integer: "987", decimal: "6", isNegative: false });
    expect(splitNum("456.789e-2")).toEqual({ integer: "4", decimal: "56789", isNegative: false });
    expect(splitNum("-1.23e1")).toEqual({ integer: "12", decimal: "3", isNegative: true });
  });

  test("invalid input", () => {
    expect(() => splitNum("")).toThrow("Invalid argument: expected a number or string");
    // @ts-expect-error - Testing invalid input
    expect(() => splitNum(null)).toThrow("Invalid argument: expected a number or string");
    // @ts-expect-error - Testing invalid input
    expect(() => splitNum(undefined)).toThrow("Invalid argument: expected a number or string");
    expect(() => splitNum("abc")).toThrow("NaN");
    expect(() => splitNum("12a34")).toThrow("NaN");
    expect(() => splitNum("1.2.3")).toThrow("NaN");
    expect(() => splitNum(".")).toThrow("NaN");
    expect(() => splitNum("..")).toThrow("NaN");
    expect(() => splitNum("--1")).toThrow("NaN");
    expect(() => splitNum("---1")).toThrow("NaN");
    expect(() => splitNum("1-1")).toThrow("NaN");
    expect(() => splitNum("1-1-1")).toThrow("NaN");
    expect(() => splitNum("....1")).toThrow("NaN");
    expect(() => splitNum("15201..411")).toThrow("NaN");
    expect(() => splitNum("152.01.411")).toThrow("NaN");
    expect(() => splitNum("--41561")).toThrow("NaN");
    expect(() => splitNum("531.-4153")).toThrow("NaN");
    expect(() => splitNum("--..4615")).toThrow("NaN");
    expect(() => splitNum(".-415")).toThrow("NaN");
    expect(() => splitNum("6465-")).toThrow("NaN");
    expect(() => splitNum("45456--")).toThrow("NaN");
    expect(() => splitNum("515-45")).toThrow("NaN");
    expect(() => splitNum("5-15-45")).toThrow("NaN");

    expect(() => splitNum("e5")).toThrow("Invalid exponential notation");
    expect(() => splitNum("1e")).toThrow("NaN");
    expect(() => splitNum("1.23ee5")).toThrow("NaN");
    expect(() => splitNum("1.23e+")).toThrow("NaN");
    expect(() => splitNum("1.23e-")).toThrow("NaN");
  });
});

describe("splitTo1Digit", () => {
  test("basic slicing", () => {
    expect(splitTo1Digit("123")).toEqual(["1", "2", "3"]);
    expect(splitTo1Digit("0")).toEqual(["0"]);
    expect(splitTo1Digit("999")).toEqual(["9", "9", "9"]);
    expect(splitTo1Digit("12345")).toEqual(["1", "2", "3", "4", "5"]);
  });
});

describe("splitTo3Digits", () => {
  test("basic slicing", () => {
    expect(splitTo3Digits("123")).toEqual(["123"]);
    expect(splitTo3Digits("1234")).toEqual(["1", "234"]);
    expect(splitTo3Digits("123456")).toEqual(["123", "456"]);
    expect(splitTo3Digits("1234567")).toEqual(["1", "234", "567"]);
    expect(splitTo3Digits("12345678")).toEqual(["12", "345", "678"]);
  });

  test("short numbers", () => {
    expect(splitTo3Digits("1")).toEqual(["1"]);
    expect(splitTo3Digits("12")).toEqual(["12"]);
  });
});

describe("splitTo4Digits", () => {
  test("basic slicing", () => {
    expect(splitTo4Digits("1234")).toEqual(["1234"]);
    expect(splitTo4Digits("12345")).toEqual(["1", "2345"]);
    expect(splitTo4Digits("12345678")).toEqual(["1234", "5678"]);
    expect(splitTo4Digits("123456789")).toEqual(["1", "2345", "6789"]);
  });

  test("short numbers", () => {
    expect(splitTo4Digits("1")).toEqual(["1"]);
    expect(splitTo4Digits("123")).toEqual(["123"]);
  });
});
