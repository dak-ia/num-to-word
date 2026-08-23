import { InvalidArgumentError, InvalidInputError } from "../errors";
import { numToTurkishDigits } from "./numToTurkishDigits";

describe("numToTurkishDigits", () => {
  test("converts each digit", () => {
    expect(numToTurkishDigits("123")).toBe("Bir iki üç");
    expect(numToTurkishDigits(123)).toBe("Bir iki üç");
    expect(numToTurkishDigits("0")).toBe("Sıfır");
    expect(numToTurkishDigits("0123456789")).toBe("Sıfır bir iki üç dört beş altı yedi sekiz dokuz");
  });

  test("capitalizes the leading i as İ", () => {
    expect(numToTurkishDigits("2")).toBe("İki");
    expect(numToTurkishDigits("-2")).toBe("Eksi iki");
  });

  test("keeps leading zeros", () => {
    expect(numToTurkishDigits("0123")).toBe("Sıfır bir iki üç");
  });

  test("keeps trailing zeros in the decimal part", () => {
    expect(numToTurkishDigits("1.50")).toBe("Bir virgül beş sıfır");
  });

  test("converts negative numbers", () => {
    expect(numToTurkishDigits("-12")).toBe("Eksi bir iki");
    expect(numToTurkishDigits("-0")).toBe("Eksi sıfır");
  });

  test("infinity", () => {
    expect(numToTurkishDigits(Infinity)).toBe("Sonsuz");
    expect(numToTurkishDigits(-Infinity)).toBe("Eksi sonsuz");
  });

  test("expands exponential notation first", () => {
    expect(numToTurkishDigits("1.2e3")).toBe("Bir iki sıfır sıfır");
  });

  test("normalizes full-width digits and separators", () => {
    expect(numToTurkishDigits("１２３")).toBe("Bir iki üç");
    expect(numToTurkishDigits("1,234")).toBe("Bir iki üç dört");
  });

  test("has no digit limit", () => {
    expect(() => numToTurkishDigits("1" + "0".repeat(400))).not.toThrow();
  });

  test("changes letter case", () => {
    expect(numToTurkishDigits("12", "capitalize")).toBe("Bir iki");
    expect(numToTurkishDigits("12", "upper")).toBe("BİR İKİ");
    expect(numToTurkishDigits("12", "lower")).toBe("bir iki");
    expect(numToTurkishDigits(-Infinity, "upper")).toBe("EKSİ SONSUZ");
  });

  test("invalid input", () => {
    expect(() => numToTurkishDigits("abc")).toThrow(InvalidInputError);
    // @ts-expect-error - Testing invalid input
    expect(() => numToTurkishDigits(null)).toThrow(InvalidArgumentError);
    // @ts-expect-error - Testing invalid input
    expect(() => numToTurkishDigits("12", "bogus")).toThrow(InvalidArgumentError);
  });
});
