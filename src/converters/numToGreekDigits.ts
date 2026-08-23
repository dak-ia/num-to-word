import type { LetterCase } from "../constants";
import { elDigitWords } from "../dictionaries";
import { replaceDigits } from "../utils";

/**
 * Converts a number to Greek words digit by digit.
 * @param number - The number to convert
 * @param letterCase - Overrides the default letter case of the language
 * @returns Greek representation of each digit
 * @example
 * numToGreekDigits("0123") // "Μηδέν ένα δύο τρία"
 */
export const numToGreekDigits = (number: number | string, letterCase?: LetterCase): string =>
  replaceDigits(number, elDigitWords, letterCase);
