import { DecimalSeparator, GroupSeparator, LetterCase } from "../constants";
import type { DigitWords } from "../types";

export const esDigitWords: DigitWords = {
  name: "Spanish",
  locales: ["es-digits", "spanish-digits"],
  separators: { decimal: DecimalSeparator.comma, group: GroupSeparator.period },
  digits: ["cero", "uno", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve"],
  join: " ",
  decimalPoint: " coma ",
  minus: "menos ",
  infinity: "infinito",
  letterCase: LetterCase.capitalize,
};

export const esMxDigitWords: DigitWords = {
  ...esDigitWords,
  name: "MexicanSpanish",
  label: "Spanish words (Mexico)",
  locales: ["es-mx-digits", "mexican-spanish-digits"],
  separators: { decimal: DecimalSeparator.period, group: GroupSeparator.comma },
  decimalPoint: " punto ",
};
