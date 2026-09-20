import { DecimalSeparator, GroupSeparator, LetterCase } from "../constants";
import type { DigitWords } from "../types";

export const romanDigitWords: DigitWords = {
  name: "Roman",
  label: "Roman numerals",
  locales: ["roman-digits"],
  separators: { decimal: DecimalSeparator.period, group: GroupSeparator.comma },
  // ローマ数字にゼロはないため、中世の計算書で使われたN（nulla）を当てる
  digits: ["n", "i", "ii", "iii", "iv", "v", "vi", "vii", "viii", "ix"],
  // 区切りがないとIIとIIIが繋がってIIIIIになり、元の桁を読み取れない
  join: " ",
  decimalPoint: " . ",
  minus: "-",
  infinity: "∞",
  letterCase: LetterCase.upper,
};
