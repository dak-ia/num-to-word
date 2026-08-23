import type { LetterCase } from "../constants";
import { itDigitWords } from "../dictionaries";
import { replaceDigits } from "../utils";

/**
 * Converts a number to Italian words digit by digit.
 * @param number - The number to convert
 * @param letterCase - Overrides the default letter case of the language
 * @returns Italian representation of each digit
 * @example
 * numToItalianDigits("0123") // "Zero uno due tre"
 */
export const numToItalianDigits = (number: number | string, letterCase?: LetterCase): string =>
  replaceDigits(number, itDigitWords, letterCase);
