// このファイルはnpm run generateからの自動生成のため手動編集禁止
import { InvalidInputError } from "../../errors";
import { numToPortugueseDigits } from "./numToPortugueseDigits";

describe("numToPortugueseDigits", () => {
  test("converts each digit", () => {
    expect(numToPortugueseDigits("0123456789")).toBe("Zero um dois três quatro cinco seis sete oito nove");
    expect(numToPortugueseDigits(123)).toBe("Um dois três");
    expect(numToPortugueseDigits("0")).toBe("Zero");
  });

  test("keeps trailing zeros in the decimal part", () => {
    expect(numToPortugueseDigits("1,50")).toBe("Um vírgula cinco zero");
  });

  test("reads the group separator", () => {
    expect(numToPortugueseDigits("1 500")).toBe("Um cinco zero zero");
  });

  test("converts negative numbers", () => {
    expect(numToPortugueseDigits("-12")).toBe("Menos um dois");
    expect(numToPortugueseDigits("-0")).toBe("Menos zero");
  });

  test("converts infinity and negative infinity", () => {
    expect(numToPortugueseDigits(Infinity)).toBe("Infinito");
    expect(numToPortugueseDigits(-Infinity)).toBe("Menos infinito");
  });

  test("rejects a character that is neither the decimal point nor the group separator", () => {
    expect(() => numToPortugueseDigits("1.500")).toThrow(InvalidInputError);
  });

  test("changes letter case", () => {
    expect(numToPortugueseDigits("12", "capitalize")).toBe("Um dois");
    expect(numToPortugueseDigits(-Infinity, "capitalize")).toBe("Menos infinito");
    expect(numToPortugueseDigits("12", "upper")).toBe("UM DOIS");
    expect(numToPortugueseDigits(-Infinity, "upper")).toBe("MENOS INFINITO");
    expect(numToPortugueseDigits("12", "lower")).toBe("um dois");
    expect(numToPortugueseDigits(-Infinity, "lower")).toBe("menos infinito");
  });
});
