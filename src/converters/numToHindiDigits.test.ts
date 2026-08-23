import { InvalidArgumentError, InvalidInputError } from "../errors";
import { numToHindiDigits } from "./numToHindiDigits";

describe("numToHindiDigits", () => {
  test("converts each digit", () => {
    expect(numToHindiDigits("123")).toBe("एक दो तीन");
    expect(numToHindiDigits(123)).toBe("एक दो तीन");
    expect(numToHindiDigits("0")).toBe("शून्य");
    expect(numToHindiDigits("0123456789")).toBe("शून्य एक दो तीन चार पाँच छह सात आठ नौ");
  });

  test("keeps leading zeros", () => {
    expect(numToHindiDigits("0123")).toBe("शून्य एक दो तीन");
  });

  test("keeps trailing zeros in the decimal part", () => {
    expect(numToHindiDigits("1.50")).toBe("एक दशमलव पाँच शून्य");
  });

  test("converts negative numbers", () => {
    expect(numToHindiDigits("-12")).toBe("ऋणात्मक एक दो");
    expect(numToHindiDigits("-0")).toBe("ऋणात्मक शून्य");
  });

  test("infinity", () => {
    expect(numToHindiDigits(Infinity)).toBe("अनंत");
    expect(numToHindiDigits(-Infinity)).toBe("ऋणात्मक अनंत");
  });

  test("expands exponential notation first", () => {
    expect(numToHindiDigits("1.2e3")).toBe("एक दो शून्य शून्य");
  });

  test("normalizes full-width digits and separators", () => {
    expect(numToHindiDigits("１２３")).toBe("एक दो तीन");
    expect(numToHindiDigits("1,234")).toBe("एक दो तीन चार");
  });

  test("has no digit limit", () => {
    expect(() => numToHindiDigits("1" + "0".repeat(400))).not.toThrow();
  });

  test("does not support letter case", () => {
    expect(() => numToHindiDigits("12", "upper")).toThrow(InvalidArgumentError);
  });

  test("invalid input", () => {
    expect(() => numToHindiDigits("abc")).toThrow(InvalidInputError);
    // @ts-expect-error - Testing invalid input
    expect(() => numToHindiDigits(null)).toThrow(InvalidArgumentError);
    // @ts-expect-error - Testing invalid input
    expect(() => numToHindiDigits("12", "bogus")).toThrow(InvalidArgumentError);
  });
});
