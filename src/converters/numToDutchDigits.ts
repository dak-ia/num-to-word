import type { LetterCase } from "../constants";
import { nlDigitWords } from "../dictionaries";
import { replaceDigits } from "../utils";

/**
 * Converts a number to Dutch words digit by digit.
 * @param number - The number to convert
 * @param letterCase - Overrides the default letter case of the language
 * @returns Dutch representation of each digit
 * @example
 * numToDutchDigits("0123") // "Nul een twee drie"
 */
export const numToDutchDigits = (number: number | string, letterCase?: LetterCase): string =>
  replaceDigits(number, nlDigitWords, letterCase);
