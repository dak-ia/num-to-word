import { preprocessNumber, splitTo1Digit } from "../utils";
import { jpOnesPlace } from "../dictionaries";

/**
 * Converts a number to Japanese kanji digit by digit.
 * @param number - The number to convert
 * @returns Japanese kanji representation of each digit
 * @example
 * numToJapaneseDigits("0123") // "〇一二三"
 * numToJapaneseDigits("1.500") // "一・五〇〇"
 * numToJapaneseDigits(Infinity) // "無限"
 */
export const numToJapaneseDigits = (number: number | string): string => {
  const numberParts = preprocessNumber(number);
  if (numberParts.isInfinity) {
    return numberParts.isNegative ? "負の無限" : "無限";
  }
  const replaceDigits = (digits: string): string =>
    splitTo1Digit(digits)
      .map((d) => jpOnesPlace[Number(d)])
      .join("");
  const prefix = numberParts.isNegative ? "負の" : "";
  let result = replaceDigits(numberParts.integer);
  if (numberParts.decimal !== "") {
    result = result + "・" + replaceDigits(numberParts.decimal);
  }
  return prefix + result;
};
