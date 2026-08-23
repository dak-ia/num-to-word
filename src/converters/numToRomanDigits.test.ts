import { InvalidArgumentError, InvalidInputError } from "../errors";
import { numToRomanDigits } from "./numToRomanDigits";

describe("numToRomanDigits", () => {
  test("converts each digit", () => {
    expect(numToRomanDigits("123")).toBe("I II III");
    expect(numToRomanDigits(123)).toBe("I II III");
    expect(numToRomanDigits("0")).toBe("N");
    expect(numToRomanDigits("0123456789")).toBe("N I II III IV V VI VII VIII IX");
  });

  test("keeps leading zeros", () => {
    expect(numToRomanDigits("0123")).toBe("N I II III");
  });

  test("keeps trailing zeros in the decimal part", () => {
    expect(numToRomanDigits("1.50")).toBe("I . V N");
  });

  test("converts negative numbers", () => {
    expect(numToRomanDigits("-12")).toBe("-I II");
    expect(numToRomanDigits("-0")).toBe("-N");
  });

  test("infinity", () => {
    expect(numToRomanDigits(Infinity)).toBe("∞");
    expect(numToRomanDigits(-Infinity)).toBe("-∞");
  });

  test("expands exponential notation first", () => {
    expect(numToRomanDigits("1.2e3")).toBe("I II N N");
  });

  test("normalizes full-width digits and separators", () => {
    expect(numToRomanDigits("１２３")).toBe("I II III");
    expect(numToRomanDigits("1,234")).toBe("I II III IV");
  });

  test("has no digit limit", () => {
    expect(() => numToRomanDigits("1" + "0".repeat(400))).not.toThrow();
  });

  test("changes letter case", () => {
    expect(numToRomanDigits("12", "upper")).toBe("I II");
    expect(numToRomanDigits("12", "lower")).toBe("i ii");
  });

  test("invalid input", () => {
    expect(() => numToRomanDigits("abc")).toThrow(InvalidInputError);
    // @ts-expect-error - Testing invalid input
    expect(() => numToRomanDigits(null)).toThrow(InvalidArgumentError);
    // @ts-expect-error - Testing invalid input
    expect(() => numToRomanDigits("12", "bogus")).toThrow(InvalidArgumentError);
  });
});
