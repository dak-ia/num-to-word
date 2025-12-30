import { splitNum, splitTo3Digits } from "../utils";
import { siSymbols } from "../dictionaries";

/**
 * Converts a number to its SI (International System of Units) prefix notation.
 * @param num - The number to convert (number or string)
 * @returns The number in SI prefix notation
 * @throws {Error} If the number is too large (Overflow) or invalid (NaN)
 * @example
 * toSi(1234) // "1.234K"
 * toSi(1234567) // "1.234567M"
 */
export const toSi = (number: number | string): string => {
  const numberParts = splitNum(number);
  if (numberParts.integer.length > (siSymbols.length + 1) * 3) {
    throw new Error("Overflow");
  }
  const prefix = numberParts.isNegative ? "-" : "";
  numberParts.integer = numberParts.integer.replace(/^0+/, "") || "0";

  let integerPart: string, decimalPart: string, suffix: string;

  if (numberParts.integer.length <= 3) {
    integerPart = numberParts.integer;
    decimalPart = numberParts.decimal;
    suffix = "";
  } else {
    const integerArray: string[] = splitTo3Digits(numberParts.integer);
    integerPart = integerArray[0];
    const remainingDigits: string = integerArray.slice(1).join("");
    const symbolIndex: number = integerArray.length - 2;

    // 小数点以下を結合
    decimalPart = remainingDigits;
    if (numberParts.decimal !== "") {
      decimalPart = remainingDigits + numberParts.decimal;
    }
    suffix = siSymbols[symbolIndex];
  }

  // 小数から末尾の0を削除
  if (decimalPart !== "") {
    decimalPart = decimalPart.replace(/0+$/, "");
  }

  if (decimalPart !== "") {
    return prefix + integerPart + "." + decimalPart + suffix;
  } else {
    return prefix + integerPart + suffix;
  }
};
