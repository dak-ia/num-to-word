import { InvalidArgumentError, InvalidInputError } from "../errors";
import { numToDaijiDigits } from "./numToDaijiDigits";

describe("numToDaijiDigits", () => {
  test("converts each digit", () => {
    expect(numToDaijiDigits("123")).toBe("壱弐参");
    expect(numToDaijiDigits(123)).toBe("壱弐参");
    expect(numToDaijiDigits("0")).toBe("零");
    expect(numToDaijiDigits("9876543210")).toBe("玖捌漆陸伍肆参弐壱零");
  });

  test("keeps leading zeros", () => {
    expect(numToDaijiDigits("0123")).toBe("零壱弐参");
    expect(numToDaijiDigits("000")).toBe("零零零");
  });

  test("keeps trailing zeros in the decimal part", () => {
    expect(numToDaijiDigits("12.34")).toBe("壱弐・参肆");
    expect(numToDaijiDigits("1.500")).toBe("壱・伍零零");
    expect(numToDaijiDigits("1.0")).toBe("壱・零");
  });

  test("converts negative numbers", () => {
    expect(numToDaijiDigits("-12")).toBe("負の壱弐");
    expect(numToDaijiDigits("-0")).toBe("負の零");
  });

  test("infinity", () => {
    expect(numToDaijiDigits(Infinity)).toBe("無限");
    expect(numToDaijiDigits(-Infinity)).toBe("負の無限");
  });

  test("expands exponential notation first", () => {
    expect(numToDaijiDigits("1.2e3")).toBe("壱弐零零");
  });

  test("has no digit limit", () => {
    expect(numToDaijiDigits("1" + "0".repeat(400))).toBe("壱" + "零".repeat(400));
  });

  test("invalid input", () => {
    expect(() => numToDaijiDigits("abc")).toThrow(InvalidInputError);
    // @ts-expect-error - Testing invalid input
    expect(() => numToDaijiDigits(null)).toThrow(InvalidArgumentError);
  });
});
