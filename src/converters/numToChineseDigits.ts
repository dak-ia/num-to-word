import type { LetterCase } from "../constants";
import { replaceDigits } from "../utils";
import { zhDigitWords } from "../dictionaries";

/**
 * Converts a number to Chinese words digit by digit.
 * @param number - The number to convert
 * @param letterCase - Not supported by this conversion, so passing it throws
 * @returns Chinese representation of each digit
 * @example
 * numToChineseDigits("0123") // "零一二三"
 */
export const numToChineseDigits = (number: number | string, letterCase?: LetterCase): string =>
  replaceDigits(number, zhDigitWords, letterCase);
