import { sliceTo1digitNum, sliceTo3digitNum, sliceTo4digitNum, splitNum } from "./helpers";

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
  });
});

describe("sliceTo1digitNum", () => {
  test("basic slicing", () => {
    expect(sliceTo1digitNum("123")).toEqual(["1", "2", "3"]);
    expect(sliceTo1digitNum("0")).toEqual(["0"]);
    expect(sliceTo1digitNum("999")).toEqual(["9", "9", "9"]);
    expect(sliceTo1digitNum("12345")).toEqual(["1", "2", "3", "4", "5"]);
  });
});

describe("sliceTo3digitNum", () => {
  test("basic slicing", () => {
    expect(sliceTo3digitNum("123")).toEqual(["123"]);
    expect(sliceTo3digitNum("1234")).toEqual(["1", "234"]);
    expect(sliceTo3digitNum("123456")).toEqual(["123", "456"]);
    expect(sliceTo3digitNum("1234567")).toEqual(["1", "234", "567"]);
    expect(sliceTo3digitNum("12345678")).toEqual(["12", "345", "678"]);
  });

  test("short numbers", () => {
    expect(sliceTo3digitNum("1")).toEqual(["1"]);
    expect(sliceTo3digitNum("12")).toEqual(["12"]);
  });
});

describe("sliceTo4digitNum", () => {
  test("basic slicing", () => {
    expect(sliceTo4digitNum("1234")).toEqual(["1234"]);
    expect(sliceTo4digitNum("12345")).toEqual(["1", "2345"]);
    expect(sliceTo4digitNum("12345678")).toEqual(["1234", "5678"]);
    expect(sliceTo4digitNum("123456789")).toEqual(["1", "2345", "6789"]);
  });

  test("short numbers", () => {
    expect(sliceTo4digitNum("1")).toEqual(["1"]);
    expect(sliceTo4digitNum("123")).toEqual(["123"]);
  });
});
