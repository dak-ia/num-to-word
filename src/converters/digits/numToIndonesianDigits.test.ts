// このファイルはnpm run generateからの自動生成のため手動編集禁止
import { numToIndonesianDigits } from "./numToIndonesianDigits";

describe("numToIndonesianDigits", () => {
  test("converts each digit", () => {
    expect(numToIndonesianDigits("0123456789")).toBe("Nol satu dua tiga empat lima enam tujuh delapan sembilan");
    expect(numToIndonesianDigits(123)).toBe("Satu dua tiga");
    expect(numToIndonesianDigits("0")).toBe("Nol");
  });

  test("keeps trailing zeros in the decimal part", () => {
    expect(numToIndonesianDigits("1,50")).toBe("Satu koma lima nol");
  });

  test("reads the group separator", () => {
    expect(numToIndonesianDigits("1.500")).toBe("Satu lima nol nol");
  });

  test("converts negative numbers", () => {
    expect(numToIndonesianDigits("-12")).toBe("Minus satu dua");
    expect(numToIndonesianDigits("-0")).toBe("Minus nol");
  });

  test("converts infinity and negative infinity", () => {
    expect(numToIndonesianDigits(Infinity)).toBe("Tak hingga");
    expect(numToIndonesianDigits(-Infinity)).toBe("Minus tak hingga");
  });

  test("changes letter case", () => {
    expect(numToIndonesianDigits("12", "capitalize")).toBe("Satu dua");
    expect(numToIndonesianDigits(-Infinity, "capitalize")).toBe("Minus tak hingga");
    expect(numToIndonesianDigits("12", "upper")).toBe("SATU DUA");
    expect(numToIndonesianDigits(-Infinity, "upper")).toBe("MINUS TAK HINGGA");
    expect(numToIndonesianDigits("12", "lower")).toBe("satu dua");
    expect(numToIndonesianDigits(-Infinity, "lower")).toBe("minus tak hingga");
  });
});
