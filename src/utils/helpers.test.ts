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
