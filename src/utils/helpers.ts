import type { NumArray } from "../types/index";

/**
 * Splits a number into integer and decimal parts, handling full-width characters and commas.
 * @param number - The number to split
 * @returns An object with integer and decimal string properties
 * @throws {TypeError} If null, undefined, or empty
 * @throws {Error} If not a valid number
 */
export const splitNum = (number: number | string): NumArray => {
  if (number === null || number === undefined || number === "") {
    throw new TypeError("Invalid argument: expected a number or string");
  }
  const strNumber = convertToNumericString(number);
  const isNegative = strNumber.startsWith("-");
  const absNumber = isNegative ? strNumber.slice(1) : strNumber;
  const numberParts: NumArray = { integer: "", decimal: "", isNegative };
  numberParts.integer = absNumber.split(".")[0];
  numberParts.decimal = absNumber.split(".")[1] || "";
  return numberParts;
};

/**
 * Splits a number string into individual digits.
 * @param number - The number string
 * @returns Array of single-digit strings
 */
export const splitTo1Digit = (number: string): string[] => {
  return number.split("");
};

/**
 * Splits a number string into 3-digit chunks from right to left.
 * @param number - The number string
 * @returns Array of 3-digit chunks
 */
export const splitTo3Digits = (number: string): string[] => {
  const result: string[] = [];
  const length: number = number.length;
  for (let i = 0; i < length; i = i + 3) {
    result.unshift(number.slice(-3));
    number = number.slice(0, -3);
  }
  return result;
};

/**
 * Splits a number string into 4-digit chunks from right to left.
 * @param number - The number string
 * @returns Array of 4-digit chunks
 */
export const splitTo4Digits = (number: string): string[] => {
  const result: string[] = [];
  const length: number = number.length;
  for (let i = 0; i < length; i = i + 4) {
    result.unshift(number.slice(-4));
    number = number.slice(0, -4);
  }
  return result;
};

/**
 * Normalizes number input by converting full-width characters and removing separators.
 * @internal
 * @param number - The number to normalize
 * @returns Normalized number string
 * @throws {Error} If not a valid number
 */
const convertToNumericString = (number: number | string): string => {
  const result = number
    .toString()
    .replace(/[０-９]/g, function (s) {
      return String.fromCharCode(s.charCodeAt(0) - 0xfee0);
    })
    .replace(/．/g, ".")
    .replace(/，/g, "")
    .replace(/,/g, "")
    .replace(/'/g, "")
    .replace(/’/g, "")
    .replace(/＋/g, "")
    .replace(/\+/g, "")
    .replace(/−/g, "-")
    .replace(/\s/g, "")
    .trim();
  if (!numberFormatValidator(result)) {
    throw new Error("NaN");
  }
  const isNegative = result.startsWith("-");
  if (result.slice(0, 1) === "." && !isNegative) {
    return "0" + result;
  }
  if (result.slice(0, 2) === "-." && isNegative) {
    return "-0" + result.slice(1);
  }
  if (result.slice(-1) === ".") {
    return result + "0";
  }
  return result;
};

/**
 * Validates number format.
 * @internal
 * @param number - The number string
 * @returns True if valid
 */
const numberFormatValidator = (number: string): boolean => {
  if (RegExp(/[^0-9.-]/).test(number)) {
    return false;
  }
  if (!RegExp(/^-?[0-9.]+$/).test(number)) {
    return false;
  }
  if (!RegExp(/^[-0-9]*\.?[0-9]*$/).test(number)) {
    return false;
  }
  if (!RegExp(/[0-9]+/).test(number)) {
    return false;
  }
  return true;
};
