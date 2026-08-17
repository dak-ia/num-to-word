import { InvalidArgumentError, InvalidInputError } from "../errors";
import { numToEnglishDigits } from "./numToEnglishDigits";

describe("numToEnglishDigits", () => {
  test("converts each digit", () => {
    expect(numToEnglishDigits("123")).toBe("One two three");
    expect(numToEnglishDigits(123)).toBe("One two three");
    expect(numToEnglishDigits("0")).toBe("Zero");
    expect(numToEnglishDigits("9876543210")).toBe("Nine eight seven six five four three two one zero");
  });

  test("keeps leading zeros", () => {
    expect(numToEnglishDigits("0123")).toBe("Zero one two three");
    expect(numToEnglishDigits("000")).toBe("Zero zero zero");
  });

  test("keeps trailing zeros in the decimal part", () => {
    expect(numToEnglishDigits("12.34")).toBe("One two point three four");
    expect(numToEnglishDigits("1.500")).toBe("One point five zero zero");
    expect(numToEnglishDigits("1.0")).toBe("One point zero");
  });

  test("converts negative numbers", () => {
    expect(numToEnglishDigits("-12")).toBe("Minus one two");
    expect(numToEnglishDigits("-0")).toBe("Minus zero");
    expect(numToEnglishDigits("-0.50")).toBe("Minus zero point five zero");
  });

  test("infinity", () => {
    expect(numToEnglishDigits(Infinity)).toBe("Infinity");
    expect(numToEnglishDigits(-Infinity)).toBe("Minus infinity");
    expect(numToEnglishDigits("Infinity")).toBe("Infinity");
  });

  test("expands exponential notation first", () => {
    expect(numToEnglishDigits("1.2e3")).toBe("One two zero zero");
    expect(numToEnglishDigits("5e-3")).toBe("Zero point zero zero five");
  });

  test("normalizes full-width digits and separators", () => {
    expect(numToEnglishDigits("１２３")).toBe("One two three");
    expect(numToEnglishDigits("1,234")).toBe("One two three four");
  });

  test("has no digit limit", () => {
    expect(numToEnglishDigits("1" + "0".repeat(400))).toBe("One" + " zero".repeat(400));
  });

  test("invalid input", () => {
    expect(() => numToEnglishDigits("abc")).toThrow(InvalidInputError);
    expect(() => numToEnglishDigits("")).toThrow(InvalidInputError);
    // @ts-expect-error - Testing invalid input
    expect(() => numToEnglishDigits(null)).toThrow(InvalidArgumentError);
    // @ts-expect-error - Testing invalid input
    expect(() => numToEnglishDigits([1])).toThrow(InvalidArgumentError);
  });
});
