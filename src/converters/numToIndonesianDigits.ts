import type { LetterCase } from "../constants";
import { idDigitWords } from "../dictionaries";
import { replaceDigits } from "../utils";

/**
 * Converts a number to Indonesian words digit by digit.
 * @param number - The number to convert
 * @param letterCase - Overrides the default letter case of the language
 * @returns Indonesian representation of each digit
 * @example
 * numToIndonesianDigits("0123") // "Nol satu dua tiga"
 */
export const numToIndonesianDigits = (number: number | string, letterCase?: LetterCase): string =>
  replaceDigits(number, idDigitWords, letterCase);
