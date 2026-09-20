// このファイルはnpm run generateからの自動生成のため手動編集禁止
import type { LetterCase } from "../../constants";
import { ptBrDigitWords } from "../../dictionaries";
import { replaceDigits } from "../../utils";

/**
 * Converts a number to Portuguese words (Brazil) digit by digit.
 * @param number - The number to convert
 * @param letterCase - Overrides the default letter case of the language
 * @returns Portuguese words (Brazil) representing each digit
 * @example
 * numToBrazilianPortugueseDigits("0123") // "Zero um dois três"
 * numToBrazilianPortugueseDigits("1,500") // "Um vírgula cinco zero zero"
 * numToBrazilianPortugueseDigits(Infinity) // "Infinito"
 */
export const numToBrazilianPortugueseDigits = (number: number | string, letterCase?: LetterCase): string =>
  replaceDigits(number, ptBrDigitWords, letterCase);
