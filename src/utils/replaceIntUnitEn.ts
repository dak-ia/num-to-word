import { enHundredsPlace, enOnesPlace, enTens, enTensPlace } from "../dictionaries";

/**
 * Converts a 1-3 digit number string to English words.
 * Internal utility for toEn converter.
 * @param num - A number string with 1-3 digits
 * @returns The English word representation
 * @throws {Error} If the number has more than 3 digits (Overflow)
 * @example
 * replaceIntUnitEn("123") // "One Hundred Twenty Three"
 * replaceIntUnitEn("45") // "Forty Five"
 */
export const replaceIntUnitEn = (number: string): string => {
  const splitDigits: string[] = number.split("");
  if (splitDigits.length > 3) {
    throw new Error("Overflow");
  }
  let result: string = "";
  if (splitDigits.length === 1) {
    result = enOnesPlace[Number(splitDigits[0])];
  } else {
    if (splitDigits.length === 2) {
      splitDigits.unshift("0");
    }
    if (splitDigits[1] === "0") {
      result = enOnesPlace[Number(splitDigits[2])];
    } else if (splitDigits[1] === "1") {
      result = enTens[Number(splitDigits[2])];
    } else {
      if (splitDigits[2] === "0") {
        result = enTensPlace[Number(splitDigits[1])];
      } else {
        result = enTensPlace[Number(splitDigits[1])] + "-" + enOnesPlace[Number(splitDigits[2])];
      }
    }
    if (splitDigits[0] !== "0") {
      if (result === enOnesPlace[0]) {
        result = "";
      }
      result = enOnesPlace[Number(splitDigits[0])] + " " + enHundredsPlace + " " + result;
    }
  }
  return result.trim();
};
