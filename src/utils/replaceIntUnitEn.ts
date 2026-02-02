import { enHundredsPlace, enOnesPlace, enTens, enTensPlace } from "../dictionaries";
import { OverflowError } from "../errors";

/**
 * Converts a 1-3 digit number string to English words.
 * @internal
 * @param number - Number string (1-3 digits)
 * @returns English word representation
 * @throws {OverflowError} If overflow
 */
export const replaceIntUnitEn = (number: string): string => {
  const splitDigits: string[] = number.split("");
  if (splitDigits.length > 3) {
    throw new OverflowError();
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
