import { InvalidArgumentError, InvalidInputError } from "../errors";
import { numToJapaneseDigits } from "./numToJapaneseDigits";

describe("numToJapaneseDigits", () => {
  test("converts each digit", () => {
    expect(numToJapaneseDigits("123")).toBe("一二三");
    expect(numToJapaneseDigits(123)).toBe("一二三");
    expect(numToJapaneseDigits("0")).toBe("〇");
    expect(numToJapaneseDigits("9876543210")).toBe("九八七六五四三二一〇");
  });

  test("keeps leading zeros", () => {
    expect(numToJapaneseDigits("0123")).toBe("〇一二三");
    expect(numToJapaneseDigits("000")).toBe("〇〇〇");
  });

  test("keeps trailing zeros in the decimal part", () => {
    expect(numToJapaneseDigits("12.34")).toBe("一二・三四");
    expect(numToJapaneseDigits("1.500")).toBe("一・五〇〇");
    expect(numToJapaneseDigits("1.0")).toBe("一・〇");
  });

  test("converts negative numbers", () => {
    expect(numToJapaneseDigits("-12")).toBe("負の一二");
    expect(numToJapaneseDigits("-0")).toBe("負の〇");
    expect(numToJapaneseDigits("-0.50")).toBe("負の〇・五〇");
  });

  test("infinity", () => {
    expect(numToJapaneseDigits(Infinity)).toBe("無限");
    expect(numToJapaneseDigits(-Infinity)).toBe("負の無限");
    expect(numToJapaneseDigits("Infinity")).toBe("無限");
  });

  test("expands exponential notation first", () => {
    expect(numToJapaneseDigits("1.2e3")).toBe("一二〇〇");
    expect(numToJapaneseDigits("5e-3")).toBe("〇・〇〇五");
  });

  test("normalizes full-width digits and separators", () => {
    expect(numToJapaneseDigits("１２３")).toBe("一二三");
    expect(numToJapaneseDigits("1,234")).toBe("一二三四");
  });

  test("has no digit limit", () => {
    expect(numToJapaneseDigits("1" + "0".repeat(400))).toBe("一" + "〇".repeat(400));
  });

  test("does not support letter case", () => {
    expect(() => numToJapaneseDigits("12", "upper")).toThrow(InvalidArgumentError);
    expect(() => numToJapaneseDigits("12", "upper")).toThrow("Letter case is not supported for this conversion.");
  });

  test("checks the letter case value before the language", () => {
    // @ts-expect-error - Testing invalid input
    expect(() => numToJapaneseDigits("12", "bogus")).toThrow(
      "Expected one of capitalize, upper, lower for the letter case."
    );
  });

  test("invalid input", () => {
    expect(() => numToJapaneseDigits("abc")).toThrow(InvalidInputError);
    expect(() => numToJapaneseDigits("")).toThrow(InvalidInputError);
    // @ts-expect-error - Testing invalid input
    expect(() => numToJapaneseDigits(null)).toThrow(InvalidArgumentError);
    // @ts-expect-error - Testing invalid input
    expect(() => numToJapaneseDigits("12", "bogus")).toThrow(InvalidArgumentError);
    // @ts-expect-error - Testing invalid input
    expect(() => numToJapaneseDigits([1])).toThrow(InvalidArgumentError);
  });
});
