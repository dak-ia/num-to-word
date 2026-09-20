import { DecimalSeparator, GroupSeparator, LetterCase } from "../constants";
import type { DigitWords } from "../types";

export const plDigitWords: DigitWords = {
  name: "Polish",
  locales: ["pl-digits", "polish-digits"],
  separators: { decimal: DecimalSeparator.comma, group: GroupSeparator.space },
  digits: ["zero", "jeden", "dwa", "trzy", "cztery", "pięć", "sześć", "siedem", "osiem", "dziewięć"],
  join: " ",
  decimalPoint: " przecinek ",
  minus: "minus ",
  infinity: "nieskończoność",
  letterCase: LetterCase.capitalize,
};
