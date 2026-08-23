import { InvalidArgumentError, InvalidInputError } from "../errors";
import { numToKoreanDigits } from "./numToKoreanDigits";

describe("numToKoreanDigits", () => {
  test("converts each digit", () => {
    expect(numToKoreanDigits("123")).toBe("일이삼");
    expect(numToKoreanDigits(123)).toBe("일이삼");
    expect(numToKoreanDigits("0")).toBe("영");
    expect(numToKoreanDigits("0123456789")).toBe("영일이삼사오육칠팔구");
  });

  test("keeps leading zeros", () => {
    expect(numToKoreanDigits("0123")).toBe("영일이삼");
  });

  test("keeps trailing zeros in the decimal part", () => {
    expect(numToKoreanDigits("1.50")).toBe("일점오영");
  });

  test("converts negative numbers", () => {
    expect(numToKoreanDigits("-12")).toBe("마이너스 일이");
    expect(numToKoreanDigits("-0")).toBe("마이너스 영");
  });

  test("infinity", () => {
    expect(numToKoreanDigits(Infinity)).toBe("무한");
    expect(numToKoreanDigits(-Infinity)).toBe("마이너스 무한");
  });

  test("expands exponential notation first", () => {
    expect(numToKoreanDigits("1.2e3")).toBe("일이영영");
  });

  test("normalizes full-width digits and separators", () => {
    expect(numToKoreanDigits("１２３")).toBe("일이삼");
    expect(numToKoreanDigits("1,234")).toBe("일이삼사");
  });

  test("has no digit limit", () => {
    expect(() => numToKoreanDigits("1" + "0".repeat(400))).not.toThrow();
  });

  test("does not support letter case", () => {
    expect(() => numToKoreanDigits("12", "upper")).toThrow(InvalidArgumentError);
  });

  test("invalid input", () => {
    expect(() => numToKoreanDigits("abc")).toThrow(InvalidInputError);
    // @ts-expect-error - Testing invalid input
    expect(() => numToKoreanDigits(null)).toThrow(InvalidArgumentError);
    // @ts-expect-error - Testing invalid input
    expect(() => numToKoreanDigits("12", "bogus")).toThrow(InvalidArgumentError);
  });
});
