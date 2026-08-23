import type { DigitWords } from "../types";
import { LetterCase } from "../constants";

export const itDigitWords: DigitWords = {
  digits: ["zero", "uno", "due", "tre", "quattro", "cinque", "sei", "sette", "otto", "nove"],
  join: " ",
  decimalPoint: " virgola ",
  minus: "meno ",
  infinity: "infinito",
  letterCase: LetterCase.capitalize,
};
