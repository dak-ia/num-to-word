// このファイルはnpm run generateからの自動生成のため手動編集禁止
import { numToHindiDigits } from "./numToHindiDigits";

describe("numToHindiDigits", () => {
  test("converts each digit", () => {
    expect(numToHindiDigits("0123456789")).toBe("शून्य एक दो तीन चार पाँच छह सात आठ नौ");
    expect(numToHindiDigits(123)).toBe("एक दो तीन");
    expect(numToHindiDigits("0")).toBe("शून्य");
  });

  test("keeps trailing zeros in the decimal part", () => {
    expect(numToHindiDigits("1.50")).toBe("एक दशमलव पाँच शून्य");
  });

  test("reads the group separator", () => {
    expect(numToHindiDigits("1,500")).toBe("एक पाँच शून्य शून्य");
  });

  test("converts negative numbers", () => {
    expect(numToHindiDigits("-12")).toBe("ऋणात्मक एक दो");
    expect(numToHindiDigits("-0")).toBe("ऋणात्मक शून्य");
  });

  test("converts infinity and negative infinity", () => {
    expect(numToHindiDigits(Infinity)).toBe("अनंत");
    expect(numToHindiDigits(-Infinity)).toBe("ऋणात्मक अनंत");
  });
});
