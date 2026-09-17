import { DecimalSeparator, GroupSeparator, LetterCase } from "../constants";
import type { DigitWords } from "../types";

export const frDigitWords: DigitWords = {
  name: "French",
  locales: ["fr-digits", "french-digits"],
  separators: { decimal: DecimalSeparator.comma, group: GroupSeparator.space },
  digits: ["zéro", "un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf"],
  join: " ",
  decimalPoint: " virgule ",
  minus: "moins ",
  infinity: "infini",
  letterCase: LetterCase.capitalize,
};
