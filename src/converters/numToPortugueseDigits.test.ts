import { InvalidArgumentError, InvalidInputError } from "../errors";
import { numToPortugueseDigits } from "./numToPortugueseDigits";

describe("numToPortugueseDigits", () => {
  test("converts each digit", () => {
    expect(numToPortugueseDigits("123")).toBe("Um dois três");
    expect(numToPortugueseDigits(123)).toBe("Um dois três");
    expect(numToPortugueseDigits("0")).toBe("Zero");
    expect(numToPortugueseDigits("0123456789")).toBe("Zero um dois três quatro cinco seis sete oito nove");
  });

  test("keeps leading zeros", () => {
    expect(numToPortugueseDigits("0123")).toBe("Zero um dois três");
  });

  test("keeps trailing zeros in the decimal part", () => {
    expect(numToPortugueseDigits("1.50")).toBe("Um vírgula cinco zero");
  });

  test("converts negative numbers", () => {
    expect(numToPortugueseDigits("-12")).toBe("Menos um dois");
    expect(numToPortugueseDigits("-0")).toBe("Menos zero");
  });

  test("infinity", () => {
    expect(numToPortugueseDigits(Infinity)).toBe("Infinito");
    expect(numToPortugueseDigits(-Infinity)).toBe("Menos infinito");
  });

  test("expands exponential notation first", () => {
    expect(numToPortugueseDigits("1.2e3")).toBe("Um dois zero zero");
  });

  test("normalizes full-width digits and separators", () => {
    expect(numToPortugueseDigits("１２３")).toBe("Um dois três");
    expect(numToPortugueseDigits("1,234")).toBe("Um dois três quatro");
  });

  test("has no digit limit", () => {
    expect(() => numToPortugueseDigits("1" + "0".repeat(400))).not.toThrow();
  });

  test("changes letter case", () => {
    expect(numToPortugueseDigits("12", "capitalize")).toBe("Um dois");
    expect(numToPortugueseDigits("12", "upper")).toBe("UM DOIS");
    expect(numToPortugueseDigits("12", "lower")).toBe("um dois");
    expect(numToPortugueseDigits(-Infinity, "upper")).toBe("MENOS INFINITO");
  });

  test("invalid input", () => {
    expect(() => numToPortugueseDigits("abc")).toThrow(InvalidInputError);
    // @ts-expect-error - Testing invalid input
    expect(() => numToPortugueseDigits(null)).toThrow(InvalidArgumentError);
    // @ts-expect-error - Testing invalid input
    expect(() => numToPortugueseDigits("12", "bogus")).toThrow(InvalidArgumentError);
  });
});
