import type { LetterCase } from "../constants";
import { replaceDigits } from "../utils";
import { trDigitWords } from "../dictionaries";

/**
 * Converts a number to Turkish words digit by digit.
 * @param number - The number to convert
 * @param letterCase - Overrides the default letter case of the language
 * @returns Turkish representation of each digit
 * @example
 * numToTurkishDigits("0123") // "Sıfır bir iki üç"
 */
export const numToTurkishDigits = (number: number | string, letterCase?: LetterCase): string =>
  replaceDigits(number, trDigitWords, letterCase);
