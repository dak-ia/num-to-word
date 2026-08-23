import { InvalidArgumentError, InvalidInputError } from "../errors";
import { numToFrenchDigits } from "./numToFrenchDigits";

describe("numToFrenchDigits", () => {
  test("converts each digit", () => {
    expect(numToFrenchDigits("123")).toBe("Un deux trois");
    expect(numToFrenchDigits(123)).toBe("Un deux trois");
    expect(numToFrenchDigits("0")).toBe("Zéro");
    expect(numToFrenchDigits("0123456789")).toBe("Zéro un deux trois quatre cinq six sept huit neuf");
  });

  test("keeps leading zeros", () => {
    expect(numToFrenchDigits("0123")).toBe("Zéro un deux trois");
  });

  test("keeps trailing zeros in the decimal part", () => {
    expect(numToFrenchDigits("1.50")).toBe("Un virgule cinq zéro");
  });

  test("converts negative numbers", () => {
    expect(numToFrenchDigits("-12")).toBe("Moins un deux");
    expect(numToFrenchDigits("-0")).toBe("Moins zéro");
  });

  test("infinity", () => {
    expect(numToFrenchDigits(Infinity)).toBe("Infini");
    expect(numToFrenchDigits(-Infinity)).toBe("Moins infini");
  });

  test("expands exponential notation first", () => {
    expect(numToFrenchDigits("1.2e3")).toBe("Un deux zéro zéro");
  });

  test("normalizes full-width digits and separators", () => {
    expect(numToFrenchDigits("１２３")).toBe("Un deux trois");
    expect(numToFrenchDigits("1,234")).toBe("Un deux trois quatre");
  });

  test("has no digit limit", () => {
    expect(() => numToFrenchDigits("1" + "0".repeat(400))).not.toThrow();
  });

  test("changes letter case", () => {
    expect(numToFrenchDigits("12", "capitalize")).toBe("Un deux");
    expect(numToFrenchDigits("12", "upper")).toBe("UN DEUX");
    expect(numToFrenchDigits("12", "lower")).toBe("un deux");
    expect(numToFrenchDigits(-Infinity, "upper")).toBe("MOINS INFINI");
  });

  test("invalid input", () => {
    expect(() => numToFrenchDigits("abc")).toThrow(InvalidInputError);
    // @ts-expect-error - Testing invalid input
    expect(() => numToFrenchDigits(null)).toThrow(InvalidArgumentError);
    // @ts-expect-error - Testing invalid input
    expect(() => numToFrenchDigits("12", "bogus")).toThrow(InvalidArgumentError);
  });
});
