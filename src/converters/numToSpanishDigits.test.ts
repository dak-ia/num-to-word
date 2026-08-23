import { InvalidArgumentError, InvalidInputError } from "../errors";
import { numToSpanishDigits } from "./numToSpanishDigits";

describe("numToSpanishDigits", () => {
  test("converts each digit", () => {
    expect(numToSpanishDigits("123")).toBe("Uno dos tres");
    expect(numToSpanishDigits(123)).toBe("Uno dos tres");
    expect(numToSpanishDigits("0")).toBe("Cero");
    expect(numToSpanishDigits("0123456789")).toBe("Cero uno dos tres cuatro cinco seis siete ocho nueve");
  });

  test("keeps leading zeros", () => {
    expect(numToSpanishDigits("0123")).toBe("Cero uno dos tres");
  });

  test("keeps trailing zeros in the decimal part", () => {
    expect(numToSpanishDigits("1.50")).toBe("Uno coma cinco cero");
  });

  test("converts negative numbers", () => {
    expect(numToSpanishDigits("-12")).toBe("Menos uno dos");
    expect(numToSpanishDigits("-0")).toBe("Menos cero");
  });

  test("infinity", () => {
    expect(numToSpanishDigits(Infinity)).toBe("Infinito");
    expect(numToSpanishDigits(-Infinity)).toBe("Menos infinito");
  });

  test("expands exponential notation first", () => {
    expect(numToSpanishDigits("1.2e3")).toBe("Uno dos cero cero");
  });

  test("normalizes full-width digits and separators", () => {
    expect(numToSpanishDigits("１２３")).toBe("Uno dos tres");
    expect(numToSpanishDigits("1,234")).toBe("Uno dos tres cuatro");
  });

  test("has no digit limit", () => {
    expect(() => numToSpanishDigits("1" + "0".repeat(400))).not.toThrow();
  });

  test("changes letter case", () => {
    expect(numToSpanishDigits("12", "capitalize")).toBe("Uno dos");
    expect(numToSpanishDigits("12", "upper")).toBe("UNO DOS");
    expect(numToSpanishDigits("12", "lower")).toBe("uno dos");
    expect(numToSpanishDigits(-Infinity, "upper")).toBe("MENOS INFINITO");
  });

  test("invalid input", () => {
    expect(() => numToSpanishDigits("abc")).toThrow(InvalidInputError);
    // @ts-expect-error - Testing invalid input
    expect(() => numToSpanishDigits(null)).toThrow(InvalidArgumentError);
    // @ts-expect-error - Testing invalid input
    expect(() => numToSpanishDigits("12", "bogus")).toThrow(InvalidArgumentError);
  });
});
