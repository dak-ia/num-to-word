import type { LetterCase } from "../constants";
import { bnDigitWords } from "../dictionaries";
import { replaceDigits } from "../utils";

/**
 * Converts a number to Bengali words digit by digit.
 * @param number - The number to convert
 * @param letterCase - Not supported by this conversion, so passing it throws
 * @returns Bengali representation of each digit
 * @example
 * numToBengaliDigits("0123") // "শূন্য এক দুই তিন"
 */
export const numToBengaliDigits = (number: number | string, letterCase?: LetterCase): string =>
  replaceDigits(number, bnDigitWords, letterCase);
