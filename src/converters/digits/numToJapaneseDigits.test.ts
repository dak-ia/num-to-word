// このファイルはnpm run generateからの自動生成のため手動編集禁止
import { numToJapaneseDigits } from "./numToJapaneseDigits";

describe("numToJapaneseDigits", () => {
  test("converts each digit", () => {
    expect(numToJapaneseDigits("0123456789")).toBe("〇一二三四五六七八九");
    expect(numToJapaneseDigits(123)).toBe("一二三");
    expect(numToJapaneseDigits("0")).toBe("〇");
  });

  test("keeps trailing zeros in the decimal part", () => {
    expect(numToJapaneseDigits("1.50")).toBe("一・五〇");
  });

  test("reads the group separator", () => {
    expect(numToJapaneseDigits("1,500")).toBe("一五〇〇");
  });

  test("converts negative numbers", () => {
    expect(numToJapaneseDigits("-12")).toBe("負の一二");
    expect(numToJapaneseDigits("-0")).toBe("負の〇");
  });

  test("converts infinity and negative infinity", () => {
    expect(numToJapaneseDigits(Infinity)).toBe("無限");
    expect(numToJapaneseDigits(-Infinity)).toBe("負の無限");
  });
});
