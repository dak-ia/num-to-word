import { DecimalSeparator, GroupSeparator, LetterCase } from "../constants";
import type { DigitWords } from "../types";

export const itDigitWords: DigitWords = {
  name: "Italian",
  locales: ["it-digits", "italian-digits"],
  separators: { decimal: DecimalSeparator.comma, group: GroupSeparator.period },
  digits: ["zero", "uno", "due", "tre", "quattro", "cinque", "sei", "sette", "otto", "nove"],
  join: " ",
  decimalPoint: " virgola ",
  minus: "meno ",
  infinity: "infinito",
  letterCase: LetterCase.capitalize,
};
