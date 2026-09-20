// このファイルはnpm run generateからの自動生成のため手動編集禁止
import { numToBrazilianPortugueseDigits } from "./numToBrazilianPortugueseDigits";

describe("numToBrazilianPortugueseDigits", () => {
  test("converts each digit", () => {
    expect(numToBrazilianPortugueseDigits("0123456789")).toBe("Zero um dois três quatro cinco seis sete oito nove");
    expect(numToBrazilianPortugueseDigits(123)).toBe("Um dois três");
    expect(numToBrazilianPortugueseDigits("0")).toBe("Zero");
  });

  test("keeps trailing zeros in the decimal part", () => {
    expect(numToBrazilianPortugueseDigits("1,50")).toBe("Um vírgula cinco zero");
  });

  test("reads the group separator", () => {
    expect(numToBrazilianPortugueseDigits("1.500")).toBe("Um cinco zero zero");
  });

  test("converts negative numbers", () => {
    expect(numToBrazilianPortugueseDigits("-12")).toBe("Menos um dois");
    expect(numToBrazilianPortugueseDigits("-0")).toBe("Menos zero");
  });

  test("converts infinity and negative infinity", () => {
    expect(numToBrazilianPortugueseDigits(Infinity)).toBe("Infinito");
    expect(numToBrazilianPortugueseDigits(-Infinity)).toBe("Menos infinito");
  });

  test("changes letter case", () => {
    expect(numToBrazilianPortugueseDigits("12", "capitalize")).toBe("Um dois");
    expect(numToBrazilianPortugueseDigits(-Infinity, "capitalize")).toBe("Menos infinito");
    expect(numToBrazilianPortugueseDigits("12", "upper")).toBe("UM DOIS");
    expect(numToBrazilianPortugueseDigits(-Infinity, "upper")).toBe("MENOS INFINITO");
    expect(numToBrazilianPortugueseDigits("12", "lower")).toBe("um dois");
    expect(numToBrazilianPortugueseDigits(-Infinity, "lower")).toBe("menos infinito");
  });
});
