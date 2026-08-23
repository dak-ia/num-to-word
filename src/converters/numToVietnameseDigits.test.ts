import { InvalidArgumentError, InvalidInputError } from "../errors";
import { numToVietnameseDigits } from "./numToVietnameseDigits";

describe("numToVietnameseDigits", () => {
  test("converts each digit", () => {
    expect(numToVietnameseDigits("123")).toBe("Một hai ba");
    expect(numToVietnameseDigits(123)).toBe("Một hai ba");
    expect(numToVietnameseDigits("0")).toBe("Không");
    expect(numToVietnameseDigits("0123456789")).toBe("Không một hai ba bốn năm sáu bảy tám chín");
  });

  test("keeps leading zeros", () => {
    expect(numToVietnameseDigits("0123")).toBe("Không một hai ba");
  });

  test("keeps trailing zeros in the decimal part", () => {
    expect(numToVietnameseDigits("1.50")).toBe("Một phẩy năm không");
  });

  test("converts negative numbers", () => {
    expect(numToVietnameseDigits("-12")).toBe("Âm một hai");
    expect(numToVietnameseDigits("-0")).toBe("Âm không");
  });

  test("infinity", () => {
    expect(numToVietnameseDigits(Infinity)).toBe("Vô cực");
    expect(numToVietnameseDigits(-Infinity)).toBe("Âm vô cực");
  });

  test("expands exponential notation first", () => {
    expect(numToVietnameseDigits("1.2e3")).toBe("Một hai không không");
  });

  test("normalizes full-width digits and separators", () => {
    expect(numToVietnameseDigits("１２３")).toBe("Một hai ba");
    expect(numToVietnameseDigits("1,234")).toBe("Một hai ba bốn");
  });

  test("has no digit limit", () => {
    expect(() => numToVietnameseDigits("1" + "0".repeat(400))).not.toThrow();
  });

  test("changes letter case", () => {
    expect(numToVietnameseDigits("12", "capitalize")).toBe("Một hai");
    expect(numToVietnameseDigits("12", "upper")).toBe("MỘT HAI");
    expect(numToVietnameseDigits("12", "lower")).toBe("một hai");
    expect(numToVietnameseDigits(-Infinity, "upper")).toBe("ÂM VÔ CỰC");
  });

  test("invalid input", () => {
    expect(() => numToVietnameseDigits("abc")).toThrow(InvalidInputError);
    // @ts-expect-error - Testing invalid input
    expect(() => numToVietnameseDigits(null)).toThrow(InvalidArgumentError);
    // @ts-expect-error - Testing invalid input
    expect(() => numToVietnameseDigits("12", "bogus")).toThrow(InvalidArgumentError);
  });
});
