import { DecimalSeparator, GroupSeparator, LetterCase } from "../constants";
import type { DigitWords } from "../types";

export const viDigitWords: DigitWords = {
  name: "Vietnamese",
  locales: ["vi-digits", "vietnamese-digits"],
  separators: { decimal: DecimalSeparator.comma, group: GroupSeparator.period },
  digits: ["không", "một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín"],
  join: " ",
  decimalPoint: " phẩy ",
  minus: "âm ",
  infinity: "vô cực",
  letterCase: LetterCase.capitalize,
};
