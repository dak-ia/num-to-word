// このファイルはnpm run generateからの自動生成のため手動編集禁止
import { InvalidInputError } from "../../errors";
import { numToFrenchDigits } from "./numToFrenchDigits";

describe("numToFrenchDigits", () => {
  test("converts each digit", () => {
    expect(numToFrenchDigits("0123456789")).toBe("Zéro un deux trois quatre cinq six sept huit neuf");
    expect(numToFrenchDigits(123)).toBe("Un deux trois");
    expect(numToFrenchDigits("0")).toBe("Zéro");
  });

  test("keeps trailing zeros in the decimal part", () => {
    expect(numToFrenchDigits("1,50")).toBe("Un virgule cinq zéro");
  });

  test("reads the group separator", () => {
    expect(numToFrenchDigits("1 500")).toBe("Un cinq zéro zéro");
  });

  test("converts negative numbers", () => {
    expect(numToFrenchDigits("-12")).toBe("Moins un deux");
    expect(numToFrenchDigits("-0")).toBe("Moins zéro");
  });

  test("converts infinity and negative infinity", () => {
    expect(numToFrenchDigits(Infinity)).toBe("Infini");
    expect(numToFrenchDigits(-Infinity)).toBe("Moins infini");
  });

  test("rejects a character that is neither the decimal point nor the group separator", () => {
    expect(() => numToFrenchDigits("1.500")).toThrow(InvalidInputError);
  });

  test("changes letter case", () => {
    expect(numToFrenchDigits("12", "capitalize")).toBe("Un deux");
    expect(numToFrenchDigits(-Infinity, "capitalize")).toBe("Moins infini");
    expect(numToFrenchDigits("12", "upper")).toBe("UN DEUX");
    expect(numToFrenchDigits(-Infinity, "upper")).toBe("MOINS INFINI");
    expect(numToFrenchDigits("12", "lower")).toBe("un deux");
    expect(numToFrenchDigits(-Infinity, "lower")).toBe("moins infini");
  });
});
