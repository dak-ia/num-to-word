import type { DigitWords } from "../types";
import { LetterCase } from "../constants";

export const frDigitWords: DigitWords = {
  name: "French",
  locales: ["fr-digits", "french-digits"],
  digits: ["zéro", "un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf"],
  join: " ",
  decimalPoint: " virgule ",
  minus: "moins ",
  infinity: "infini",
  letterCase: LetterCase.capitalize,
};
