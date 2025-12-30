import type { NumArray } from "../types/index";

/**
 * Splits a number into integer and decimal parts.
 * Handles full-width characters, commas, and whitespace normalization.
 * @param num - The number to split (number or string)
 * @returns An object with integer and decimal string properties
 * @throws {TypeError} If num is null, undefined, or empty string
 * @throws {Error} If the input is not a valid number (NaN)
 * @example
 * splitNum(123.456) // { integer: "123", decimal: "456" }
 * splitNum("１，２３４") // { integer: "1234", decimal: "" }
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
 * Splits a number string into an array of single-digit strings.
 * @param num - The number string to split
 * @returns An array of single-digit strings
 * @example
 * splitTo1Digit("123") // ["1", "2", "3"]
 */
export const splitTo1Digit = (number: string): string[] => {
  return number.split("");
};

/**
 * Splits a number string into chunks of 3 digits from right to left.
 * @param num - The number string to split
 * @returns An array of 3-digit strings (or less for the leftmost chunk)
 * @example
 * splitTo3Digits("1234567") // ["1", "234", "567"]
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
 * Splits a number string into chunks of 4 digits from right to left.
 * @param num - The number string to split
 * @returns An array of 4-digit strings (or less for the leftmost chunk)
 * @example
 * splitTo4Digits("12345678") // ["1234", "5678"]
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
 * Normalizes number input to a standard string format.
 * Converts full-width characters to half-width, removes commas and whitespace.
 * @internal
 * @param num - The number to normalize (number or string)
 * @returns The normalized number string
 * @throws {Error} If the input is not a valid number (NaN)
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
 * Check number format validity.
 * @internal
 * @param num - The number string to validate
 * @returns True if valid, otherwise false
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
