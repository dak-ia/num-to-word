import { DecimalSeparator, GroupSeparator } from "../constants";
import type { DigitWords } from "../types";

export const arDigitWords: DigitWords = {
  name: "Arabic",
  locales: ["ar-digits", "arabic-digits"],
  separators: { decimal: DecimalSeparator.period, group: GroupSeparator.comma },
  digits: ["صفر", "واحد", "اثنان", "ثلاثة", "أربعة", "خمسة", "ستة", "سبعة", "ثمانية", "تسعة"],
  join: " ",
  decimalPoint: " فاصلة ",
  minus: "سالب ",
  infinity: "لانهاية",
};
