import { InvalidArgumentError, InvalidInputError } from "../errors";
import { numToPolishDigits } from "./numToPolishDigits";

describe("numToPolishDigits", () => {
  test("converts each digit", () => {
    expect(numToPolishDigits("123")).toBe("Jeden dwa trzy");
    expect(numToPolishDigits(123)).toBe("Jeden dwa trzy");
    expect(numToPolishDigits("0")).toBe("Zero");
    expect(numToPolishDigits("0123456789")).toBe("Zero jeden dwa trzy cztery pięć sześć siedem osiem dziewięć");
  });

  test("keeps leading zeros", () => {
    expect(numToPolishDigits("0123")).toBe("Zero jeden dwa trzy");
  });

  test("keeps trailing zeros in the decimal part", () => {
    expect(numToPolishDigits("1.50")).toBe("Jeden przecinek pięć zero");
  });

  test("converts negative numbers", () => {
    expect(numToPolishDigits("-12")).toBe("Minus jeden dwa");
    expect(numToPolishDigits("-0")).toBe("Minus zero");
  });

  test("infinity", () => {
    expect(numToPolishDigits(Infinity)).toBe("Nieskończoność");
    expect(numToPolishDigits(-Infinity)).toBe("Minus nieskończoność");
  });

  test("expands exponential notation first", () => {
    expect(numToPolishDigits("1.2e3")).toBe("Jeden dwa zero zero");
  });

  test("normalizes full-width digits and separators", () => {
    expect(numToPolishDigits("１２３")).toBe("Jeden dwa trzy");
    expect(numToPolishDigits("1,234")).toBe("Jeden dwa trzy cztery");
  });

  test("has no digit limit", () => {
    expect(() => numToPolishDigits("1" + "0".repeat(400))).not.toThrow();
  });

  test("changes letter case", () => {
    expect(numToPolishDigits("12", "capitalize")).toBe("Jeden dwa");
    expect(numToPolishDigits("12", "upper")).toBe("JEDEN DWA");
    expect(numToPolishDigits("12", "lower")).toBe("jeden dwa");
    expect(numToPolishDigits(-Infinity, "upper")).toBe("MINUS NIESKOŃCZONOŚĆ");
  });

  test("invalid input", () => {
    expect(() => numToPolishDigits("abc")).toThrow(InvalidInputError);
    // @ts-expect-error - Testing invalid input
    expect(() => numToPolishDigits(null)).toThrow(InvalidArgumentError);
    // @ts-expect-error - Testing invalid input
    expect(() => numToPolishDigits("12", "bogus")).toThrow(InvalidArgumentError);
  });
});
