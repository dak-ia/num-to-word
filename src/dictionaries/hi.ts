import { DecimalSeparator, GroupSeparator } from "../constants";
import type { DigitWords } from "../types";

export const hiDigitWords: DigitWords = {
  name: "Hindi",
  locales: ["hi-digits", "hindi-digits"],
  separators: { decimal: DecimalSeparator.period, group: GroupSeparator.comma },
  digits: ["शून्य", "एक", "दो", "तीन", "चार", "पाँच", "छह", "सात", "आठ", "नौ"],
  join: " ",
  decimalPoint: " दशमलव ",
  minus: "ऋणात्मक ",
  infinity: "अनंत",
};
