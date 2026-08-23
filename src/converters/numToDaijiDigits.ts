import { jpDaijiAfter, jpDaijiBefore, jpOnesPlace } from "../dictionaries";
import type { LetterCase } from "../constants";
import { numToJapaneseDigits } from "./numToJapaneseDigits";

/**
 * Converts a number to Japanese daiji (大字) numerals digit by digit.
 * @param number - The number to convert
 * @param letterCase - Not supported by this conversion, so passing it throws
 * @returns Japanese daiji representation of each digit
 * @example
 * numToDaijiDigits("0123") // "零壱弐参"
 * numToDaijiDigits("1.500") // "壱・伍零零"
 * numToDaijiDigits(Infinity) // "無限"
 */
export const numToDaijiDigits = (number: number | string, letterCase?: LetterCase): string => {
  let result = numToJapaneseDigits(number, letterCase);
  for (let i = 0; i < jpOnesPlace.length; i++) {
    result = result.replace(new RegExp(jpDaijiBefore[i], "g"), jpDaijiAfter[i]);
  }
  return result;
};
