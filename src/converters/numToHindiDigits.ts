import type { LetterCase } from "../constants";
import { hiDigitWords } from "../dictionaries";
import { replaceDigits } from "../utils";

/**
 * Converts a number to Hindi words digit by digit.
 * @param number - The number to convert
 * @param letterCase - Not supported by this conversion, so passing it throws
 * @returns Hindi representation of each digit
 * @example
 * numToHindiDigits("0123") // "शून्य एक दो तीन"
 */
export const numToHindiDigits = (number: number | string, letterCase?: LetterCase): string =>
  replaceDigits(number, hiDigitWords, letterCase);
