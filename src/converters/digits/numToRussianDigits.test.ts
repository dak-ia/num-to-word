// このファイルはnpm run generateからの自動生成のため手動編集禁止
import { InvalidInputError } from "../../errors";
import { numToRussianDigits } from "./numToRussianDigits";

describe("numToRussianDigits", () => {
  test("converts each digit", () => {
    expect(numToRussianDigits("0123456789")).toBe("Ноль один два три четыре пять шесть семь восемь девять");
    expect(numToRussianDigits(123)).toBe("Один два три");
    expect(numToRussianDigits("0")).toBe("Ноль");
  });

  test("keeps trailing zeros in the decimal part", () => {
    expect(numToRussianDigits("1,50")).toBe("Один запятая пять ноль");
  });

  test("reads the group separator", () => {
    expect(numToRussianDigits("1 500")).toBe("Один пять ноль ноль");
  });

  test("converts negative numbers", () => {
    expect(numToRussianDigits("-12")).toBe("Минус один два");
    expect(numToRussianDigits("-0")).toBe("Минус ноль");
  });

  test("converts infinity and negative infinity", () => {
    expect(numToRussianDigits(Infinity)).toBe("Бесконечность");
    expect(numToRussianDigits(-Infinity)).toBe("Минус бесконечность");
  });

  test("rejects a character that is neither the decimal point nor the group separator", () => {
    expect(() => numToRussianDigits("1.500")).toThrow(InvalidInputError);
  });

  test("changes letter case", () => {
    expect(numToRussianDigits("12", "capitalize")).toBe("Один два");
    expect(numToRussianDigits(-Infinity, "capitalize")).toBe("Минус бесконечность");
    expect(numToRussianDigits("12", "upper")).toBe("ОДИН ДВА");
    expect(numToRussianDigits(-Infinity, "upper")).toBe("МИНУС БЕСКОНЕЧНОСТЬ");
    expect(numToRussianDigits("12", "lower")).toBe("один два");
    expect(numToRussianDigits(-Infinity, "lower")).toBe("минус бесконечность");
  });
});
