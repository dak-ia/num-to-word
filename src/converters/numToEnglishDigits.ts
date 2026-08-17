import { preprocessNumber, splitTo1Digit } from "../utils";
import { enOnesPlace } from "../dictionaries";

/**
 * Converts a number to English words digit by digit.
 * @param number - The number to convert
 * @returns English word representation of each digit
 * @example
 * numToEnglishDigits("0123") // "Zero one two three"
 * numToEnglishDigits("1.500") // "One point five zero zero"
 * numToEnglishDigits(Infinity) // "Infinity"
 */
export const numToEnglishDigits = (number: number | string): string => {
  const numberParts = preprocessNumber(number);
  if (numberParts.isInfinity) {
    return numberParts.isNegative ? "Minus infinity" : "Infinity";
  }
  const replaceDigits = (digits: string): string =>
    splitTo1Digit(digits)
      .map((d) => enOnesPlace[Number(d)])
      .join(" ");
  const prefix = numberParts.isNegative ? "Minus " : "";
  let result = replaceDigits(numberParts.integer);
  if (numberParts.decimal !== "") {
    result = result + " point " + replaceDigits(numberParts.decimal);
  }
  result = (prefix + result).toLowerCase();
  return result.slice(0, 1).toUpperCase() + result.slice(1);
};
