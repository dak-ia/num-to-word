// このファイルはnpm run generateからの自動生成のため手動編集禁止
import type { LetterCase } from "../../constants";
import { esMxDigitWords } from "../../dictionaries";
import { replaceDigits } from "../../utils";

/**
 * Converts a number to Spanish words (Mexico) digit by digit.
 * @param number - The number to convert
 * @param letterCase - Overrides the default letter case of the language
 * @returns Spanish words (Mexico) representing each digit
 * @example
 * numToMexicanSpanishDigits("0123") // "Cero uno dos tres"
 * numToMexicanSpanishDigits("1.500") // "Uno punto cinco cero cero"
 * numToMexicanSpanishDigits(Infinity) // "Infinito"
 */
export const numToMexicanSpanishDigits = (number: number | string, letterCase?: LetterCase): string =>
  replaceDigits(number, esMxDigitWords, letterCase);
