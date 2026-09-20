// このファイルはnpm run generateからの自動生成のため手動編集禁止
import { numToItalianDigits } from "./numToItalianDigits";

describe("numToItalianDigits", () => {
  test("converts each digit", () => {
    expect(numToItalianDigits("0123456789")).toBe("Zero uno due tre quattro cinque sei sette otto nove");
    expect(numToItalianDigits(123)).toBe("Uno due tre");
    expect(numToItalianDigits("0")).toBe("Zero");
  });

  test("keeps trailing zeros in the decimal part", () => {
    expect(numToItalianDigits("1,50")).toBe("Uno virgola cinque zero");
  });

  test("reads the group separator", () => {
    expect(numToItalianDigits("1.500")).toBe("Uno cinque zero zero");
  });

  test("converts negative numbers", () => {
    expect(numToItalianDigits("-12")).toBe("Meno uno due");
    expect(numToItalianDigits("-0")).toBe("Meno zero");
  });

  test("converts infinity and negative infinity", () => {
    expect(numToItalianDigits(Infinity)).toBe("Infinito");
    expect(numToItalianDigits(-Infinity)).toBe("Meno infinito");
  });

  test("changes letter case", () => {
    expect(numToItalianDigits("12", "capitalize")).toBe("Uno due");
    expect(numToItalianDigits(-Infinity, "capitalize")).toBe("Meno infinito");
    expect(numToItalianDigits("12", "upper")).toBe("UNO DUE");
    expect(numToItalianDigits(-Infinity, "upper")).toBe("MENO INFINITO");
    expect(numToItalianDigits("12", "lower")).toBe("uno due");
    expect(numToItalianDigits(-Infinity, "lower")).toBe("meno infinito");
  });
});
