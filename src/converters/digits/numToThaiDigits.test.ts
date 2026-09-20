// このファイルはnpm run generateからの自動生成のため手動編集禁止
import { numToThaiDigits } from "./numToThaiDigits";

describe("numToThaiDigits", () => {
  test("converts each digit", () => {
    expect(numToThaiDigits("0123456789")).toBe("ศูนย์หนึ่งสองสามสี่ห้าหกเจ็ดแปดเก้า");
    expect(numToThaiDigits(123)).toBe("หนึ่งสองสาม");
    expect(numToThaiDigits("0")).toBe("ศูนย์");
  });

  test("keeps trailing zeros in the decimal part", () => {
    expect(numToThaiDigits("1.50")).toBe("หนึ่งจุดห้าศูนย์");
  });

  test("reads the group separator", () => {
    expect(numToThaiDigits("1,500")).toBe("หนึ่งห้าศูนย์ศูนย์");
  });

  test("converts negative numbers", () => {
    expect(numToThaiDigits("-12")).toBe("ลบหนึ่งสอง");
    expect(numToThaiDigits("-0")).toBe("ลบศูนย์");
  });

  test("converts infinity and negative infinity", () => {
    expect(numToThaiDigits(Infinity)).toBe("อนันต์");
    expect(numToThaiDigits(-Infinity)).toBe("ลบอนันต์");
  });
});
