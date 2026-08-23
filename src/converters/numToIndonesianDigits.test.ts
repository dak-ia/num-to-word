import { InvalidArgumentError, InvalidInputError } from "../errors";
import { numToIndonesianDigits } from "./numToIndonesianDigits";

describe("numToIndonesianDigits", () => {
  test("converts each digit", () => {
    expect(numToIndonesianDigits("123")).toBe("Satu dua tiga");
    expect(numToIndonesianDigits(123)).toBe("Satu dua tiga");
    expect(numToIndonesianDigits("0")).toBe("Nol");
    expect(numToIndonesianDigits("0123456789")).toBe("Nol satu dua tiga empat lima enam tujuh delapan sembilan");
  });

  test("keeps leading zeros", () => {
    expect(numToIndonesianDigits("0123")).toBe("Nol satu dua tiga");
  });

  test("keeps trailing zeros in the decimal part", () => {
    expect(numToIndonesianDigits("1.50")).toBe("Satu koma lima nol");
  });

  test("converts negative numbers", () => {
    expect(numToIndonesianDigits("-12")).toBe("Minus satu dua");
    expect(numToIndonesianDigits("-0")).toBe("Minus nol");
  });

  test("infinity", () => {
    expect(numToIndonesianDigits(Infinity)).toBe("Tak hingga");
    expect(numToIndonesianDigits(-Infinity)).toBe("Minus tak hingga");
  });

  test("expands exponential notation first", () => {
    expect(numToIndonesianDigits("1.2e3")).toBe("Satu dua nol nol");
  });

  test("normalizes full-width digits and separators", () => {
    expect(numToIndonesianDigits("１２３")).toBe("Satu dua tiga");
    expect(numToIndonesianDigits("1,234")).toBe("Satu dua tiga empat");
  });

  test("has no digit limit", () => {
    expect(() => numToIndonesianDigits("1" + "0".repeat(400))).not.toThrow();
  });

  test("changes letter case", () => {
    expect(numToIndonesianDigits("12", "capitalize")).toBe("Satu dua");
    expect(numToIndonesianDigits("12", "upper")).toBe("SATU DUA");
    expect(numToIndonesianDigits("12", "lower")).toBe("satu dua");
    expect(numToIndonesianDigits(-Infinity, "upper")).toBe("MINUS TAK HINGGA");
  });

  test("invalid input", () => {
    expect(() => numToIndonesianDigits("abc")).toThrow(InvalidInputError);
    // @ts-expect-error - Testing invalid input
    expect(() => numToIndonesianDigits(null)).toThrow(InvalidArgumentError);
    // @ts-expect-error - Testing invalid input
    expect(() => numToIndonesianDigits("12", "bogus")).toThrow(InvalidArgumentError);
  });
});
