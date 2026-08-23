import { InvalidArgumentError, InvalidInputError } from "../errors";
import { numToArabicDigits } from "./numToArabicDigits";

describe("numToArabicDigits", () => {
  test("converts each digit", () => {
    expect(numToArabicDigits("123")).toBe("واحد اثنان ثلاثة");
    expect(numToArabicDigits(123)).toBe("واحد اثنان ثلاثة");
    expect(numToArabicDigits("0")).toBe("صفر");
    expect(numToArabicDigits("0123456789")).toBe("صفر واحد اثنان ثلاثة أربعة خمسة ستة سبعة ثمانية تسعة");
  });

  test("keeps leading zeros", () => {
    expect(numToArabicDigits("0123")).toBe("صفر واحد اثنان ثلاثة");
  });

  test("keeps trailing zeros in the decimal part", () => {
    expect(numToArabicDigits("1.50")).toBe("واحد فاصلة خمسة صفر");
  });

  test("converts negative numbers", () => {
    expect(numToArabicDigits("-12")).toBe("سالب واحد اثنان");
    expect(numToArabicDigits("-0")).toBe("سالب صفر");
  });

  test("infinity", () => {
    expect(numToArabicDigits(Infinity)).toBe("لانهاية");
    expect(numToArabicDigits(-Infinity)).toBe("سالب لانهاية");
  });

  test("expands exponential notation first", () => {
    expect(numToArabicDigits("1.2e3")).toBe("واحد اثنان صفر صفر");
  });

  test("normalizes full-width digits and separators", () => {
    expect(numToArabicDigits("１２３")).toBe("واحد اثنان ثلاثة");
    expect(numToArabicDigits("1,234")).toBe("واحد اثنان ثلاثة أربعة");
  });

  test("has no digit limit", () => {
    expect(() => numToArabicDigits("1" + "0".repeat(400))).not.toThrow();
  });

  test("does not support letter case", () => {
    expect(() => numToArabicDigits("12", "upper")).toThrow(InvalidArgumentError);
  });

  test("invalid input", () => {
    expect(() => numToArabicDigits("abc")).toThrow(InvalidInputError);
    // @ts-expect-error - Testing invalid input
    expect(() => numToArabicDigits(null)).toThrow(InvalidArgumentError);
    // @ts-expect-error - Testing invalid input
    expect(() => numToArabicDigits("12", "bogus")).toThrow(InvalidArgumentError);
  });
});
