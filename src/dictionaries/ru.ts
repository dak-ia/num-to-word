import { DecimalSeparator, GroupSeparator, LetterCase } from "../constants";
import type { DigitWords } from "../types";

export const ruDigitWords: DigitWords = {
  name: "Russian",
  locales: ["ru-digits", "russian-digits"],
  separators: { decimal: DecimalSeparator.comma, group: GroupSeparator.space },
  digits: ["ноль", "один", "два", "три", "четыре", "пять", "шесть", "семь", "восемь", "девять"],
  join: " ",
  decimalPoint: " запятая ",
  minus: "минус ",
  infinity: "бесконечность",
  letterCase: LetterCase.capitalize,
};
