import type { LetterCase } from "../constants";
import { koDigitWords } from "../dictionaries";
import { replaceDigits } from "../utils";

/**
 * Converts a number to Korean words digit by digit.
 * @param number - The number to convert
 * @param letterCase - Not supported by this conversion, so passing it throws
 * @returns Korean representation of each digit
 * @example
 * numToKoreanDigits("0123") // "영일이삼"
 */
export const numToKoreanDigits = (number: number | string, letterCase?: LetterCase): string =>
  replaceDigits(number, koDigitWords, letterCase);
