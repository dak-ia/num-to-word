import type { LetterCase } from "../constants";
import { arDigitWords } from "../dictionaries";
import { replaceDigits } from "../utils";

/**
 * Converts a number to Arabic words digit by digit.
 * @param number - The number to convert
 * @param letterCase - Not supported by this conversion, so passing it throws
 * @returns Arabic representation of each digit
 * @example
 * numToArabicDigits("0123") // "صفر واحد اثنان ثلاثة"
 */
export const numToArabicDigits = (number: number | string, letterCase?: LetterCase): string =>
  replaceDigits(number, arDigitWords, letterCase);
