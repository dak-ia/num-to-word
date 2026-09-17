import { DecimalSeparator, GroupSeparator, LetterCase } from "../constants";
import type { DigitWords } from "../types";

export const idDigitWords: DigitWords = {
  name: "Indonesian",
  locales: ["id-digits", "indonesian-digits"],
  separators: { decimal: DecimalSeparator.comma, group: GroupSeparator.period },
  digits: ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan"],
  join: " ",
  decimalPoint: " koma ",
  minus: "minus ",
  infinity: "tak hingga",
  letterCase: LetterCase.capitalize,
};
