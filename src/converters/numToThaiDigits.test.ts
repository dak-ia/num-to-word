import { InvalidArgumentError, InvalidInputError } from "../errors";
import { numToThaiDigits } from "./numToThaiDigits";

describe("numToThaiDigits", () => {
  test("converts each digit", () => {
    expect(numToThaiDigits("123")).toBe("หนึ่งสองสาม");
    expect(numToThaiDigits(123)).toBe("หนึ่งสองสาม");
    expect(numToThaiDigits("0")).toBe("ศูนย์");
    expect(numToThaiDigits("0123456789")).toBe("ศูนย์หนึ่งสองสามสี่ห้าหกเจ็ดแปดเก้า");
  });

  test("keeps leading zeros", () => {
    expect(numToThaiDigits("0123")).toBe("ศูนย์หนึ่งสองสาม");
  });

  test("keeps trailing zeros in the decimal part", () => {
    expect(numToThaiDigits("1.50")).toBe("หนึ่งจุดห้าศูนย์");
  });

  test("converts negative numbers", () => {
    expect(numToThaiDigits("-12")).toBe("ลบหนึ่งสอง");
    expect(numToThaiDigits("-0")).toBe("ลบศูนย์");
  });

  test("infinity", () => {
    expect(numToThaiDigits(Infinity)).toBe("อนันต์");
    expect(numToThaiDigits(-Infinity)).toBe("ลบอนันต์");
  });

  test("expands exponential notation first", () => {
    expect(numToThaiDigits("1.2e3")).toBe("หนึ่งสองศูนย์ศูนย์");
  });

  test("normalizes full-width digits and separators", () => {
    expect(numToThaiDigits("１２３")).toBe("หนึ่งสองสาม");
    expect(numToThaiDigits("1,234")).toBe("หนึ่งสองสามสี่");
  });

  test("has no digit limit", () => {
    expect(() => numToThaiDigits("1" + "0".repeat(400))).not.toThrow();
  });

  test("does not support letter case", () => {
    expect(() => numToThaiDigits("12", "upper")).toThrow(InvalidArgumentError);
  });

  test("invalid input", () => {
    expect(() => numToThaiDigits("abc")).toThrow(InvalidInputError);
    // @ts-expect-error - Testing invalid input
    expect(() => numToThaiDigits(null)).toThrow(InvalidArgumentError);
    // @ts-expect-error - Testing invalid input
    expect(() => numToThaiDigits("12", "bogus")).toThrow(InvalidArgumentError);
  });
});
