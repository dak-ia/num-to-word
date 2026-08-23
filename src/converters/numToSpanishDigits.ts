import type { LetterCase } from "../constants";
import { esDigitWords } from "../dictionaries";
import { replaceDigits } from "../utils";

/**
 * Converts a number to Spanish words digit by digit.
 * @param number - The number to convert
 * @param letterCase - Overrides the default letter case of the language
 * @returns Spanish representation of each digit
 * @example
 * numToSpanishDigits("0123") // "Cero uno dos tres"
 */
export const numToSpanishDigits = (number: number | string, letterCase?: LetterCase): string =>
  replaceDigits(number, esDigitWords, letterCase);
