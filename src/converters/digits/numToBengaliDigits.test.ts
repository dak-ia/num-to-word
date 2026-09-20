// このファイルはnpm run generateからの自動生成のため手動編集禁止
import { numToBengaliDigits } from "./numToBengaliDigits";

describe("numToBengaliDigits", () => {
  test("converts each digit", () => {
    expect(numToBengaliDigits("0123456789")).toBe("শূন্য এক দুই তিন চার পাঁচ ছয় সাত আট নয়");
    expect(numToBengaliDigits(123)).toBe("এক দুই তিন");
    expect(numToBengaliDigits("0")).toBe("শূন্য");
  });

  test("keeps trailing zeros in the decimal part", () => {
    expect(numToBengaliDigits("1.50")).toBe("এক দশমিক পাঁচ শূন্য");
  });

  test("reads the group separator", () => {
    expect(numToBengaliDigits("1,500")).toBe("এক পাঁচ শূন্য শূন্য");
  });

  test("converts negative numbers", () => {
    expect(numToBengaliDigits("-12")).toBe("ঋণাত্মক এক দুই");
    expect(numToBengaliDigits("-0")).toBe("ঋণাত্মক শূন্য");
  });

  test("converts infinity and negative infinity", () => {
    expect(numToBengaliDigits(Infinity)).toBe("অসীম");
    expect(numToBengaliDigits(-Infinity)).toBe("ঋণাত্মক অসীম");
  });
});
