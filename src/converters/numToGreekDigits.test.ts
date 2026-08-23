import { InvalidArgumentError, InvalidInputError } from "../errors";
import { numToGreekDigits } from "./numToGreekDigits";

describe("numToGreekDigits", () => {
  test("converts each digit", () => {
    expect(numToGreekDigits("123")).toBe("Ένα δύο τρία");
    expect(numToGreekDigits(123)).toBe("Ένα δύο τρία");
    expect(numToGreekDigits("0")).toBe("Μηδέν");
    expect(numToGreekDigits("0123456789")).toBe("Μηδέν ένα δύο τρία τέσσερα πέντε έξι επτά οκτώ εννέα");
  });

  test("keeps leading zeros", () => {
    expect(numToGreekDigits("0123")).toBe("Μηδέν ένα δύο τρία");
  });

  test("keeps trailing zeros in the decimal part", () => {
    expect(numToGreekDigits("1.50")).toBe("Ένα κόμμα πέντε μηδέν");
  });

  test("converts negative numbers", () => {
    expect(numToGreekDigits("-12")).toBe("Μείον ένα δύο");
    expect(numToGreekDigits("-0")).toBe("Μείον μηδέν");
  });

  test("infinity", () => {
    expect(numToGreekDigits(Infinity)).toBe("Άπειρο");
    expect(numToGreekDigits(-Infinity)).toBe("Μείον άπειρο");
  });

  test("expands exponential notation first", () => {
    expect(numToGreekDigits("1.2e3")).toBe("Ένα δύο μηδέν μηδέν");
  });

  test("normalizes full-width digits and separators", () => {
    expect(numToGreekDigits("１２３")).toBe("Ένα δύο τρία");
    expect(numToGreekDigits("1,234")).toBe("Ένα δύο τρία τέσσερα");
  });

  test("has no digit limit", () => {
    expect(() => numToGreekDigits("1" + "0".repeat(400))).not.toThrow();
  });

  test("drops accents in upper case", () => {
    expect(numToGreekDigits("1", "capitalize")).toBe("Ένα");
    expect(numToGreekDigits("1", "upper")).toBe("ΕΝΑ");
  });

  test("changes letter case", () => {
    expect(numToGreekDigits("12", "capitalize")).toBe("Ένα δύο");
    expect(numToGreekDigits("12", "upper")).toBe("ΕΝΑ ΔΥΟ");
    expect(numToGreekDigits("12", "lower")).toBe("ένα δύο");
    expect(numToGreekDigits(-Infinity, "upper")).toBe("ΜΕΙΟΝ ΑΠΕΙΡΟ");
  });

  test("invalid input", () => {
    expect(() => numToGreekDigits("abc")).toThrow(InvalidInputError);
    // @ts-expect-error - Testing invalid input
    expect(() => numToGreekDigits(null)).toThrow(InvalidArgumentError);
    // @ts-expect-error - Testing invalid input
    expect(() => numToGreekDigits("12", "bogus")).toThrow(InvalidArgumentError);
  });
});
