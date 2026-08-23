import type { LetterCase } from "../constants";
import { replaceDigits } from "../utils";
import { romanDigitWords } from "../dictionaries";

/**
 * Converts a number to Roman numeral words digit by digit.
 * @param number - The number to convert
 * @param letterCase - Overrides the default letter case of the language
 * @returns Roman numeral representation of each digit
 * @example
 * numToRomanDigits("0123") // "N I II III"
 */
export const numToRomanDigits = (number: number | string, letterCase?: LetterCase): string =>
  replaceDigits(number, romanDigitWords, letterCase);
