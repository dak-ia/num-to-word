import { DecimalSeparator, GroupSeparator, LetterCase } from "../constants";
import type { DigitWords } from "../types";

export const deDigitWords: DigitWords = {
  name: "German",
  locales: ["de-digits", "german-digits"],
  separators: { decimal: DecimalSeparator.comma, group: GroupSeparator.period },
  digits: ["null", "eins", "zwei", "drei", "vier", "fünf", "sechs", "sieben", "acht", "neun"],
  join: " ",
  decimalPoint: " Komma ",
  minus: "minus ",
  infinity: "unendlich",
  letterCase: LetterCase.capitalize,
};
