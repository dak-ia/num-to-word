// このファイルはnpm run generateからの自動生成のため手動編集禁止
import { numToChineseDigits } from "./numToChineseDigits";

describe("numToChineseDigits", () => {
  test("converts each digit", () => {
    expect(numToChineseDigits("0123456789")).toBe("零一二三四五六七八九");
    expect(numToChineseDigits(123)).toBe("一二三");
    expect(numToChineseDigits("0")).toBe("零");
  });

  test("keeps trailing zeros in the decimal part", () => {
    expect(numToChineseDigits("1.50")).toBe("一点五零");
  });

  test("reads the group separator", () => {
    expect(numToChineseDigits("1,500")).toBe("一五零零");
  });

  test("converts negative numbers", () => {
    expect(numToChineseDigits("-12")).toBe("负一二");
    expect(numToChineseDigits("-0")).toBe("负零");
  });

  test("converts infinity and negative infinity", () => {
    expect(numToChineseDigits(Infinity)).toBe("无穷");
    expect(numToChineseDigits(-Infinity)).toBe("负无穷");
  });
});
