import { InvalidArgumentError, InvalidInputError } from "../errors";
import { numToChineseDigits } from "./numToChineseDigits";

describe("numToChineseDigits", () => {
  test("converts each digit", () => {
    expect(numToChineseDigits("123")).toBe("一二三");
    expect(numToChineseDigits(123)).toBe("一二三");
    expect(numToChineseDigits("0")).toBe("零");
    expect(numToChineseDigits("0123456789")).toBe("零一二三四五六七八九");
  });

  test("keeps leading zeros", () => {
    expect(numToChineseDigits("0123")).toBe("零一二三");
  });

  test("keeps trailing zeros in the decimal part", () => {
    expect(numToChineseDigits("1.50")).toBe("一点五零");
  });

  test("converts negative numbers", () => {
    expect(numToChineseDigits("-12")).toBe("负一二");
    expect(numToChineseDigits("-0")).toBe("负零");
  });

  test("infinity", () => {
    expect(numToChineseDigits(Infinity)).toBe("无穷");
    expect(numToChineseDigits(-Infinity)).toBe("负无穷");
  });

  test("expands exponential notation first", () => {
    expect(numToChineseDigits("1.2e3")).toBe("一二零零");
  });

  test("normalizes full-width digits and separators", () => {
    expect(numToChineseDigits("１２３")).toBe("一二三");
    expect(numToChineseDigits("1,234")).toBe("一二三四");
  });

  test("has no digit limit", () => {
    expect(() => numToChineseDigits("1" + "0".repeat(400))).not.toThrow();
  });

  test("does not support letter case", () => {
    expect(() => numToChineseDigits("12", "upper")).toThrow(InvalidArgumentError);
  });

  test("invalid input", () => {
    expect(() => numToChineseDigits("abc")).toThrow(InvalidInputError);
    // @ts-expect-error - Testing invalid input
    expect(() => numToChineseDigits(null)).toThrow(InvalidArgumentError);
    // @ts-expect-error - Testing invalid input
    expect(() => numToChineseDigits("12", "bogus")).toThrow(InvalidArgumentError);
  });
});
