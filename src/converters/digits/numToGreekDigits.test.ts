// このファイルはnpm run generateからの自動生成のため手動編集禁止
import { numToGreekDigits } from "./numToGreekDigits";

describe("numToGreekDigits", () => {
  test("converts each digit", () => {
    expect(numToGreekDigits("0123456789")).toBe("Μηδέν ένα δύο τρία τέσσερα πέντε έξι επτά οκτώ εννέα");
    expect(numToGreekDigits(123)).toBe("Ένα δύο τρία");
    expect(numToGreekDigits("0")).toBe("Μηδέν");
  });

  test("keeps trailing zeros in the decimal part", () => {
    expect(numToGreekDigits("1,50")).toBe("Ένα κόμμα πέντε μηδέν");
  });

  test("reads the group separator", () => {
    expect(numToGreekDigits("1.500")).toBe("Ένα πέντε μηδέν μηδέν");
  });

  test("converts negative numbers", () => {
    expect(numToGreekDigits("-12")).toBe("Μείον ένα δύο");
    expect(numToGreekDigits("-0")).toBe("Μείον μηδέν");
  });

  test("converts infinity and negative infinity", () => {
    expect(numToGreekDigits(Infinity)).toBe("Άπειρο");
    expect(numToGreekDigits(-Infinity)).toBe("Μείον άπειρο");
  });

  test("changes letter case", () => {
    expect(numToGreekDigits("12", "capitalize")).toBe("Ένα δύο");
    expect(numToGreekDigits(-Infinity, "capitalize")).toBe("Μείον άπειρο");
    expect(numToGreekDigits("12", "upper")).toBe("ΕΝΑ ΔΥΟ");
    expect(numToGreekDigits(-Infinity, "upper")).toBe("ΜΕΙΟΝ ΑΠΕΙΡΟ");
    expect(numToGreekDigits("12", "lower")).toBe("ένα δύο");
    expect(numToGreekDigits(-Infinity, "lower")).toBe("μείον άπειρο");
  });
});
