// このファイルはnpm run generateからの自動生成のため手動編集禁止
import { numToGermanDigits } from "./numToGermanDigits";

describe("numToGermanDigits", () => {
  test("converts each digit", () => {
    expect(numToGermanDigits("0123456789")).toBe("Null eins zwei drei vier fünf sechs sieben acht neun");
    expect(numToGermanDigits(123)).toBe("Eins zwei drei");
    expect(numToGermanDigits("0")).toBe("Null");
  });

  test("keeps trailing zeros in the decimal part", () => {
    expect(numToGermanDigits("1,50")).toBe("Eins Komma fünf null");
  });

  test("reads the group separator", () => {
    expect(numToGermanDigits("1.500")).toBe("Eins fünf null null");
  });

  test("converts negative numbers", () => {
    expect(numToGermanDigits("-12")).toBe("Minus eins zwei");
    expect(numToGermanDigits("-0")).toBe("Minus null");
  });

  test("converts infinity and negative infinity", () => {
    expect(numToGermanDigits(Infinity)).toBe("Unendlich");
    expect(numToGermanDigits(-Infinity)).toBe("Minus unendlich");
  });

  test("changes letter case", () => {
    expect(numToGermanDigits("12", "capitalize")).toBe("Eins zwei");
    expect(numToGermanDigits(-Infinity, "capitalize")).toBe("Minus unendlich");
    expect(numToGermanDigits("12", "upper")).toBe("EINS ZWEI");
    expect(numToGermanDigits(-Infinity, "upper")).toBe("MINUS UNENDLICH");
    expect(numToGermanDigits("12", "lower")).toBe("eins zwei");
    expect(numToGermanDigits(-Infinity, "lower")).toBe("minus unendlich");
  });
});
