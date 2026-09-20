// このファイルはnpm run generateからの自動生成のため手動編集禁止
import { numToEnglishDigits } from "./numToEnglishDigits";

describe("numToEnglishDigits", () => {
  test("converts each digit", () => {
    expect(numToEnglishDigits("0123456789")).toBe("Zero one two three four five six seven eight nine");
    expect(numToEnglishDigits(123)).toBe("One two three");
    expect(numToEnglishDigits("0")).toBe("Zero");
  });

  test("keeps trailing zeros in the decimal part", () => {
    expect(numToEnglishDigits("1.50")).toBe("One point five zero");
  });

  test("reads the group separator", () => {
    expect(numToEnglishDigits("1,500")).toBe("One five zero zero");
  });

  test("converts negative numbers", () => {
    expect(numToEnglishDigits("-12")).toBe("Minus one two");
    expect(numToEnglishDigits("-0")).toBe("Minus zero");
  });

  test("converts infinity and negative infinity", () => {
    expect(numToEnglishDigits(Infinity)).toBe("Infinity");
    expect(numToEnglishDigits(-Infinity)).toBe("Minus infinity");
  });

  test("changes letter case", () => {
    expect(numToEnglishDigits("12", "capitalize")).toBe("One two");
    expect(numToEnglishDigits(-Infinity, "capitalize")).toBe("Minus infinity");
    expect(numToEnglishDigits("12", "upper")).toBe("ONE TWO");
    expect(numToEnglishDigits(-Infinity, "upper")).toBe("MINUS INFINITY");
    expect(numToEnglishDigits("12", "lower")).toBe("one two");
    expect(numToEnglishDigits(-Infinity, "lower")).toBe("minus infinity");
  });
});
