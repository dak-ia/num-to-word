// このファイルはnpm run generateからの自動生成のため手動編集禁止
import { numToArabicDigits } from "./numToArabicDigits";

describe("numToArabicDigits", () => {
  test("converts each digit", () => {
    expect(numToArabicDigits("0123456789")).toBe("صفر واحد اثنان ثلاثة أربعة خمسة ستة سبعة ثمانية تسعة");
    expect(numToArabicDigits(123)).toBe("واحد اثنان ثلاثة");
    expect(numToArabicDigits("0")).toBe("صفر");
  });

  test("keeps trailing zeros in the decimal part", () => {
    expect(numToArabicDigits("1.50")).toBe("واحد فاصلة خمسة صفر");
  });

  test("reads the group separator", () => {
    expect(numToArabicDigits("1,500")).toBe("واحد خمسة صفر صفر");
  });

  test("converts negative numbers", () => {
    expect(numToArabicDigits("-12")).toBe("سالب واحد اثنان");
    expect(numToArabicDigits("-0")).toBe("سالب صفر");
  });

  test("converts infinity and negative infinity", () => {
    expect(numToArabicDigits(Infinity)).toBe("لانهاية");
    expect(numToArabicDigits(-Infinity)).toBe("سالب لانهاية");
  });
});
