import { InvalidArgumentError, InvalidInputError } from "../errors";
import { numToDutchDigits } from "./numToDutchDigits";

describe("numToDutchDigits", () => {
  test("converts each digit", () => {
    expect(numToDutchDigits("123")).toBe("Een twee drie");
    expect(numToDutchDigits(123)).toBe("Een twee drie");
    expect(numToDutchDigits("0")).toBe("Nul");
    expect(numToDutchDigits("0123456789")).toBe("Nul een twee drie vier vijf zes zeven acht negen");
  });

  test("keeps leading zeros", () => {
    expect(numToDutchDigits("0123")).toBe("Nul een twee drie");
  });

  test("keeps trailing zeros in the decimal part", () => {
    expect(numToDutchDigits("1.50")).toBe("Een komma vijf nul");
  });

  test("converts negative numbers", () => {
    expect(numToDutchDigits("-12")).toBe("Min een twee");
    expect(numToDutchDigits("-0")).toBe("Min nul");
  });

  test("infinity", () => {
    expect(numToDutchDigits(Infinity)).toBe("Oneindig");
    expect(numToDutchDigits(-Infinity)).toBe("Min oneindig");
  });

  test("expands exponential notation first", () => {
    expect(numToDutchDigits("1.2e3")).toBe("Een twee nul nul");
  });

  test("normalizes full-width digits and separators", () => {
    expect(numToDutchDigits("１２３")).toBe("Een twee drie");
    expect(numToDutchDigits("1,234")).toBe("Een twee drie vier");
  });

  test("has no digit limit", () => {
    expect(() => numToDutchDigits("1" + "0".repeat(400))).not.toThrow();
  });

  test("changes letter case", () => {
    expect(numToDutchDigits("12", "capitalize")).toBe("Een twee");
    expect(numToDutchDigits("12", "upper")).toBe("EEN TWEE");
    expect(numToDutchDigits("12", "lower")).toBe("een twee");
    expect(numToDutchDigits(-Infinity, "upper")).toBe("MIN ONEINDIG");
  });

  test("invalid input", () => {
    expect(() => numToDutchDigits("abc")).toThrow(InvalidInputError);
    // @ts-expect-error - Testing invalid input
    expect(() => numToDutchDigits(null)).toThrow(InvalidArgumentError);
    // @ts-expect-error - Testing invalid input
    expect(() => numToDutchDigits("12", "bogus")).toThrow(InvalidArgumentError);
  });
});
