import { InvalidArgumentError, InvalidInputError } from "../errors";
import { numToItalianDigits } from "./numToItalianDigits";

describe("numToItalianDigits", () => {
  test("converts each digit", () => {
    expect(numToItalianDigits("123")).toBe("Uno due tre");
    expect(numToItalianDigits(123)).toBe("Uno due tre");
    expect(numToItalianDigits("0")).toBe("Zero");
    expect(numToItalianDigits("0123456789")).toBe("Zero uno due tre quattro cinque sei sette otto nove");
  });

  test("keeps leading zeros", () => {
    expect(numToItalianDigits("0123")).toBe("Zero uno due tre");
  });

  test("keeps trailing zeros in the decimal part", () => {
    expect(numToItalianDigits("1.50")).toBe("Uno virgola cinque zero");
  });

  test("converts negative numbers", () => {
    expect(numToItalianDigits("-12")).toBe("Meno uno due");
    expect(numToItalianDigits("-0")).toBe("Meno zero");
  });

  test("infinity", () => {
    expect(numToItalianDigits(Infinity)).toBe("Infinito");
    expect(numToItalianDigits(-Infinity)).toBe("Meno infinito");
  });

  test("expands exponential notation first", () => {
    expect(numToItalianDigits("1.2e3")).toBe("Uno due zero zero");
  });

  test("normalizes full-width digits and separators", () => {
    expect(numToItalianDigits("１２３")).toBe("Uno due tre");
    expect(numToItalianDigits("1,234")).toBe("Uno due tre quattro");
  });

  test("has no digit limit", () => {
    expect(() => numToItalianDigits("1" + "0".repeat(400))).not.toThrow();
  });

  test("changes letter case", () => {
    expect(numToItalianDigits("12", "capitalize")).toBe("Uno due");
    expect(numToItalianDigits("12", "upper")).toBe("UNO DUE");
    expect(numToItalianDigits("12", "lower")).toBe("uno due");
    expect(numToItalianDigits(-Infinity, "upper")).toBe("MENO INFINITO");
  });

  test("invalid input", () => {
    expect(() => numToItalianDigits("abc")).toThrow(InvalidInputError);
    // @ts-expect-error - Testing invalid input
    expect(() => numToItalianDigits(null)).toThrow(InvalidArgumentError);
    // @ts-expect-error - Testing invalid input
    expect(() => numToItalianDigits("12", "bogus")).toThrow(InvalidArgumentError);
  });
});
