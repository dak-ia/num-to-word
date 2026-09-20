// このファイルはnpm run generateからの自動生成のため手動編集禁止
import { numToDaijiDigits } from "./numToDaijiDigits";

describe("numToDaijiDigits", () => {
  test("converts each digit", () => {
    expect(numToDaijiDigits("0123456789")).toBe("零壱弐参肆伍陸漆捌玖");
    expect(numToDaijiDigits(123)).toBe("壱弐参");
    expect(numToDaijiDigits("0")).toBe("零");
  });

  test("keeps trailing zeros in the decimal part", () => {
    expect(numToDaijiDigits("1.50")).toBe("壱・伍零");
  });

  test("reads the group separator", () => {
    expect(numToDaijiDigits("1,500")).toBe("壱伍零零");
  });

  test("converts negative numbers", () => {
    expect(numToDaijiDigits("-12")).toBe("負の壱弐");
    expect(numToDaijiDigits("-0")).toBe("負の零");
  });

  test("converts infinity and negative infinity", () => {
    expect(numToDaijiDigits(Infinity)).toBe("無限");
    expect(numToDaijiDigits(-Infinity)).toBe("負の無限");
  });
});
