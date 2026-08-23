import { InvalidArgumentError, InvalidInputError } from "../errors";
import { numToGermanDigits } from "./numToGermanDigits";

describe("numToGermanDigits", () => {
  test("converts each digit", () => {
    expect(numToGermanDigits("123")).toBe("Eins zwei drei");
    expect(numToGermanDigits(123)).toBe("Eins zwei drei");
    expect(numToGermanDigits("0")).toBe("Null");
    expect(numToGermanDigits("0123456789")).toBe("Null eins zwei drei vier fünf sechs sieben acht neun");
  });

  test("keeps leading zeros", () => {
    expect(numToGermanDigits("0123")).toBe("Null eins zwei drei");
  });

  test("keeps trailing zeros in the decimal part", () => {
    expect(numToGermanDigits("1.50")).toBe("Eins Komma fünf null");
  });

  test("converts negative numbers", () => {
    expect(numToGermanDigits("-12")).toBe("Minus eins zwei");
    expect(numToGermanDigits("-0")).toBe("Minus null");
  });

  test("infinity", () => {
    expect(numToGermanDigits(Infinity)).toBe("Unendlich");
    expect(numToGermanDigits(-Infinity)).toBe("Minus unendlich");
  });

  test("expands exponential notation first", () => {
    expect(numToGermanDigits("1.2e3")).toBe("Eins zwei null null");
  });

  test("normalizes full-width digits and separators", () => {
    expect(numToGermanDigits("１２３")).toBe("Eins zwei drei");
    expect(numToGermanDigits("1,234")).toBe("Eins zwei drei vier");
  });

  test("has no digit limit", () => {
    expect(() => numToGermanDigits("1" + "0".repeat(400))).not.toThrow();
  });

  test("changes letter case", () => {
    expect(numToGermanDigits("12", "capitalize")).toBe("Eins zwei");
    expect(numToGermanDigits("12", "upper")).toBe("EINS ZWEI");
    expect(numToGermanDigits("12", "lower")).toBe("eins zwei");
    expect(numToGermanDigits(-Infinity, "upper")).toBe("MINUS UNENDLICH");
  });

  test("invalid input", () => {
    expect(() => numToGermanDigits("abc")).toThrow(InvalidInputError);
    // @ts-expect-error - Testing invalid input
    expect(() => numToGermanDigits(null)).toThrow(InvalidArgumentError);
    // @ts-expect-error - Testing invalid input
    expect(() => numToGermanDigits("12", "bogus")).toThrow(InvalidArgumentError);
  });
});
