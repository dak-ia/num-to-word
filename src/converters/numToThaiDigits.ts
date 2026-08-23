import type { LetterCase } from "../constants";
import { replaceDigits } from "../utils";
import { thDigitWords } from "../dictionaries";

/**
 * Converts a number to Thai words digit by digit.
 * @param number - The number to convert
 * @param letterCase - Not supported by this conversion, so passing it throws
 * @returns Thai representation of each digit
 * @example
 * numToThaiDigits("0123") // "ศูนย์หนึ่งสองสาม"
 */
export const numToThaiDigits = (number: number | string, letterCase?: LetterCase): string =>
  replaceDigits(number, thDigitWords, letterCase);
