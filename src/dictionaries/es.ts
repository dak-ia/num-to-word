import type { DigitWords } from "../types";
import { LetterCase } from "../constants";

export const esDigitWords: DigitWords = {
  name: "Spanish",
  locales: ["es-digits", "spanish-digits"],
  digits: ["cero", "uno", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve"],
  join: " ",
  decimalPoint: " coma ",
  minus: "menos ",
  infinity: "infinito",
  letterCase: LetterCase.capitalize,
};
