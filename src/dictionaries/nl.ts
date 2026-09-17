import { DecimalSeparator, GroupSeparator, LetterCase } from "../constants";
import type { DigitWords } from "../types";

export const nlDigitWords: DigitWords = {
  name: "Dutch",
  locales: ["nl-digits", "dutch-digits"],
  separators: { decimal: DecimalSeparator.comma, group: GroupSeparator.period },
  digits: ["nul", "een", "twee", "drie", "vier", "vijf", "zes", "zeven", "acht", "negen"],
  join: " ",
  decimalPoint: " komma ",
  minus: "min ",
  infinity: "oneindig",
  letterCase: LetterCase.capitalize,
};
