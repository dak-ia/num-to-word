import { enLargeUnits, enOnesPlace } from "../dictionaries";
import { preprocessNumber, replaceIntUnitEn, splitTo1Digit, splitTo3Digits } from "../utils";
import { OverflowError } from "../errors";

/**
 * Converts a number to English words.
 * @param number - The number to convert
 * @returns English word representation
 * @throws {OverflowError} If invalid or overflow
 * @example
 * numToEnglish(123) // "One hundred twenty-three"
 * numToEnglish("1234.56") // "One thousand two hundred thirty-four point five six"
 * numToEnglish(Infinity) // "Infinity"
 */
export const numToEnglish = (number: number | string): string => {
  const numberParts = preprocessNumber(number);
  if (numberParts.isInfinity) {
    return numberParts.isNegative ? "Minus infinity" : "Infinity";
  }
  numberParts.integer = numberParts.integer.replace(/^0+/, "") || "0";
  numberParts.decimal = numberParts.decimal.replace(/0+$/, "");
  if (numberParts.integer.length > (Object.values(enLargeUnits).length - 1) * 3) {
    throw new OverflowError();
  }
  const prefix = numberParts.isNegative ? "Minus " : "";
  let integerArray = splitTo3Digits(numberParts.integer);
  let decimalArray = splitTo1Digit(numberParts.decimal);
  integerArray = integerArray
    .reverse()
    .map((num, i) => {
      return replaceIntUnitEn(num) + " " + enLargeUnits[i * 3].toLowerCase();
    })
    .reverse();
  if (integerArray.length > 1) {
    integerArray = integerArray.map((num) => {
      if (RegExp(enOnesPlace[0]).test(num)) {
        return "";
      }
      return num;
    });
  }
  integerArray = integerArray.filter((num) => num !== "");
  decimalArray = decimalArray.map((num) => {
    return enOnesPlace[Number(num)];
  });
  let result = "";
  if (decimalArray.length > 0) {
    result = (integerArray.join(" ").trim() + " point " + decimalArray.join(" ").trim()).trim();
  } else {
    result = integerArray.join(" ").trim();
  }
  result = (prefix + result).toLowerCase();
  return result.slice(0, 1).toUpperCase() + result.slice(1);
};
