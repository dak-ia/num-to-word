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
 * @param number - The number to normalize (supports exponential notation)
 * @returns Normalized numeric string
 * @throws {Error} If not a valid number format
 */
const convertToNumericString = (number: number | string): string => {
  let result = number
    .toString()
    .replace(/[０-９]/g, function (s) {
      return String.fromCharCode(s.charCodeAt(0) - 0xfee0);
    })
    .replace(/．/g, ".")
    .replace(/，/g, "")
    .replace(/,/g, "")
    .replace(/'/g, "")
    .replace(/’/g, "")
    .replace(/＋/g, "+")
    .replace(/−/g, "-")
    .replace(/ｅ/g, "e")
    .replace(/Ｅ/g, "E")
    .replace(/\s/g, "")
    .trim();
  if (!numberFormatValidator(result)) {
    throw new Error("NaN");
  }

  // Expand exponential notation after validation
  result = expandExponentialNotation(result).replace("+", "");

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
 * Expands exponential notation to a full decimal string.
 * Examples:
 * - "1.23e5" → "123000"
 * - "1.23e-2" → "0.0123"
 * - "-1.5e4" → "-15000"
 * @internal
 * @param number - The string that may contain exponential notation (e.g., "1.23e5")
 * @returns Expanded number string without exponential notation
 * @throws {Error} If invalid exponential notation format
 */
const expandExponentialNotation = (number: string): string => {
  if (!/[eE]/.test(number)) {
    return number;
  }

  const isNegative = number.startsWith("-");
  const absNumber = isNegative ? number.slice(1) : number;

  const match = absNumber.match(/^([0-9.]+)[eE]([+-]?[0-9]+)$/);
  if (!match) {
    throw new Error("Invalid exponential notation");
  }

  const mantissa = match[1];
  const exponent = Number(match[2]);

  const decimalPos = mantissa.indexOf(".");
  const hasDecimal = decimalPos !== -1;

  const digits = mantissa.replace(".", "");

  const originalDecimalPos = hasDecimal ? decimalPos : digits.length;

  const newDecimalPos = originalDecimalPos + exponent;

  let result: string;
  if (newDecimalPos <= 0) {
    result = "0." + "0".repeat(Math.abs(newDecimalPos)) + digits;
  } else if (newDecimalPos >= digits.length) {
    const integerPart = (digits + "0".repeat(newDecimalPos - digits.length)).replace(/^0+/, "") || "0";
    result = integerPart;
  } else {
    const integerPart = digits.slice(0, newDecimalPos).replace(/^0+/, "") || "0";
    result = integerPart + "." + digits.slice(newDecimalPos);
  }

  return (isNegative ? "-" : "") + result;
};

/**
 * Validates number format.
 * @internal
 * @param number - Number string to validate
 * @returns True if valid number format
 */
const numberFormatValidator = (number: string): boolean => {
  if (RegExp(/[^0-9.+\-eE]/).test(number)) {
    return false;
  }
  if (!RegExp(/[0-9]+/).test(number)) {
    return false;
  }
  if (!RegExp(/^[+-]?[0-9]*\.?[0-9]*(([eE][+-]?)[0-9]+)?$/).test(number)) {
    return false;
  }
  return true;
};
