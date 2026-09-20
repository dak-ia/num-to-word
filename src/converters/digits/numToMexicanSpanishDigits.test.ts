// このファイルはnpm run generateからの自動生成のため手動編集禁止
import { numToMexicanSpanishDigits } from "./numToMexicanSpanishDigits";

describe("numToMexicanSpanishDigits", () => {
  test("converts each digit", () => {
    expect(numToMexicanSpanishDigits("0123456789")).toBe("Cero uno dos tres cuatro cinco seis siete ocho nueve");
    expect(numToMexicanSpanishDigits(123)).toBe("Uno dos tres");
    expect(numToMexicanSpanishDigits("0")).toBe("Cero");
  });

  test("keeps trailing zeros in the decimal part", () => {
    expect(numToMexicanSpanishDigits("1.50")).toBe("Uno punto cinco cero");
  });

  test("reads the group separator", () => {
    expect(numToMexicanSpanishDigits("1,500")).toBe("Uno cinco cero cero");
  });

  test("converts negative numbers", () => {
    expect(numToMexicanSpanishDigits("-12")).toBe("Menos uno dos");
    expect(numToMexicanSpanishDigits("-0")).toBe("Menos cero");
  });

  test("converts infinity and negative infinity", () => {
    expect(numToMexicanSpanishDigits(Infinity)).toBe("Infinito");
    expect(numToMexicanSpanishDigits(-Infinity)).toBe("Menos infinito");
  });

  test("changes letter case", () => {
    expect(numToMexicanSpanishDigits("12", "capitalize")).toBe("Uno dos");
    expect(numToMexicanSpanishDigits(-Infinity, "capitalize")).toBe("Menos infinito");
    expect(numToMexicanSpanishDigits("12", "upper")).toBe("UNO DOS");
    expect(numToMexicanSpanishDigits(-Infinity, "upper")).toBe("MENOS INFINITO");
    expect(numToMexicanSpanishDigits("12", "lower")).toBe("uno dos");
    expect(numToMexicanSpanishDigits(-Infinity, "lower")).toBe("menos infinito");
  });
});
