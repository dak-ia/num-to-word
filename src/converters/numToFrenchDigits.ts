import type { LetterCase } from "../constants";
import { frDigitWords } from "../dictionaries";
import { replaceDigits } from "../utils";

/**
 * Converts a number to French words digit by digit.
 * @param number - The number to convert
 * @param letterCase - Overrides the default letter case of the language
 * @returns French representation of each digit
 * @example
 * numToFrenchDigits("0123") // "Zéro un deux trois"
 */
export const numToFrenchDigits = (number: number | string, letterCase?: LetterCase): string =>
  replaceDigits(number, frDigitWords, letterCase);
