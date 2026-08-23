import type { LetterCase } from "../constants";
import { jpDigitWords } from "../dictionaries";
import { replaceDigits } from "../utils";

/**
 * Converts a number to Japanese kanji digit by digit.
 * @param number - The number to convert
 * @param letterCase - Not supported by this conversion, so passing it throws
 * @returns Japanese kanji representation of each digit
 * @example
 * numToJapaneseDigits("0123") // "〇一二三"
 * numToJapaneseDigits("1.500") // "一・五〇〇"
 * numToJapaneseDigits(Infinity) // "無限"
 */
export const numToJapaneseDigits = (number: number | string, letterCase?: LetterCase): string =>
  replaceDigits(number, jpDigitWords, letterCase);
