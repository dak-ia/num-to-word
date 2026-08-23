import type { LetterCase } from "../constants";
import { ptDigitWords } from "../dictionaries";
import { replaceDigits } from "../utils";

/**
 * Converts a number to Portuguese words digit by digit.
 * @param number - The number to convert
 * @param letterCase - Overrides the default letter case of the language
 * @returns Portuguese representation of each digit
 * @example
 * numToPortugueseDigits("0123") // "Zero um dois três"
 */
export const numToPortugueseDigits = (number: number | string, letterCase?: LetterCase): string =>
  replaceDigits(number, ptDigitWords, letterCase);
