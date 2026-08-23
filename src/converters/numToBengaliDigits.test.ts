import { InvalidArgumentError, InvalidInputError } from "../errors";
import { numToBengaliDigits } from "./numToBengaliDigits";

describe("numToBengaliDigits", () => {
  test("converts each digit", () => {
    expect(numToBengaliDigits("123")).toBe("এক দুই তিন");
    expect(numToBengaliDigits(123)).toBe("এক দুই তিন");
    expect(numToBengaliDigits("0")).toBe("শূন্য");
    expect(numToBengaliDigits("0123456789")).toBe("শূন্য এক দুই তিন চার পাঁচ ছয় সাত আট নয়");
  });

  test("keeps leading zeros", () => {
    expect(numToBengaliDigits("0123")).toBe("শূন্য এক দুই তিন");
  });

  test("keeps trailing zeros in the decimal part", () => {
    expect(numToBengaliDigits("1.50")).toBe("এক দশমিক পাঁচ শূন্য");
  });

  test("converts negative numbers", () => {
    expect(numToBengaliDigits("-12")).toBe("ঋণাত্মক এক দুই");
    expect(numToBengaliDigits("-0")).toBe("ঋণাত্মক শূন্য");
  });

  test("infinity", () => {
    expect(numToBengaliDigits(Infinity)).toBe("অসীম");
    expect(numToBengaliDigits(-Infinity)).toBe("ঋণাত্মক অসীম");
  });

  test("expands exponential notation first", () => {
    expect(numToBengaliDigits("1.2e3")).toBe("এক দুই শূন্য শূন্য");
  });

  test("normalizes full-width digits and separators", () => {
    expect(numToBengaliDigits("１２３")).toBe("এক দুই তিন");
    expect(numToBengaliDigits("1,234")).toBe("এক দুই তিন চার");
  });

  test("has no digit limit", () => {
    expect(() => numToBengaliDigits("1" + "0".repeat(400))).not.toThrow();
  });

  test("does not support letter case", () => {
    expect(() => numToBengaliDigits("12", "upper")).toThrow(InvalidArgumentError);
  });

  test("invalid input", () => {
    expect(() => numToBengaliDigits("abc")).toThrow(InvalidInputError);
    // @ts-expect-error - Testing invalid input
    expect(() => numToBengaliDigits(null)).toThrow(InvalidArgumentError);
    // @ts-expect-error - Testing invalid input
    expect(() => numToBengaliDigits("12", "bogus")).toThrow(InvalidArgumentError);
  });
});
