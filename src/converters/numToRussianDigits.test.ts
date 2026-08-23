import { InvalidArgumentError, InvalidInputError } from "../errors";
import { numToRussianDigits } from "./numToRussianDigits";

describe("numToRussianDigits", () => {
  test("converts each digit", () => {
    expect(numToRussianDigits("123")).toBe("Один два три");
    expect(numToRussianDigits(123)).toBe("Один два три");
    expect(numToRussianDigits("0")).toBe("Ноль");
    expect(numToRussianDigits("0123456789")).toBe("Ноль один два три четыре пять шесть семь восемь девять");
  });

  test("keeps leading zeros", () => {
    expect(numToRussianDigits("0123")).toBe("Ноль один два три");
  });

  test("keeps trailing zeros in the decimal part", () => {
    expect(numToRussianDigits("1.50")).toBe("Один запятая пять ноль");
  });

  test("converts negative numbers", () => {
    expect(numToRussianDigits("-12")).toBe("Минус один два");
    expect(numToRussianDigits("-0")).toBe("Минус ноль");
  });

  test("infinity", () => {
    expect(numToRussianDigits(Infinity)).toBe("Бесконечность");
    expect(numToRussianDigits(-Infinity)).toBe("Минус бесконечность");
  });

  test("expands exponential notation first", () => {
    expect(numToRussianDigits("1.2e3")).toBe("Один два ноль ноль");
  });

  test("normalizes full-width digits and separators", () => {
    expect(numToRussianDigits("１２３")).toBe("Один два три");
    expect(numToRussianDigits("1,234")).toBe("Один два три четыре");
  });

  test("has no digit limit", () => {
    expect(() => numToRussianDigits("1" + "0".repeat(400))).not.toThrow();
  });

  test("changes letter case", () => {
    expect(numToRussianDigits("12", "capitalize")).toBe("Один два");
    expect(numToRussianDigits("12", "upper")).toBe("ОДИН ДВА");
    expect(numToRussianDigits("12", "lower")).toBe("один два");
    expect(numToRussianDigits(-Infinity, "upper")).toBe("МИНУС БЕСКОНЕЧНОСТЬ");
  });

  test("invalid input", () => {
    expect(() => numToRussianDigits("abc")).toThrow(InvalidInputError);
    // @ts-expect-error - Testing invalid input
    expect(() => numToRussianDigits(null)).toThrow(InvalidArgumentError);
    // @ts-expect-error - Testing invalid input
    expect(() => numToRussianDigits("12", "bogus")).toThrow(InvalidArgumentError);
  });
});
