import { jpBasicUnits, jpOnesPlace } from "../dictionaries";
import { createOverflowError } from "../errors";

/**
 * Converts a 1-4 digit number string to Japanese kanji (十, 百, 千).
 * @internal
 * @param number - Number string (1-4 digits)
 * @returns Japanese kanji representation
 * @throws {Error} If overflow
 */
export const replaceIntUnitJp = (number: string): string => {
  const splitDigits: string[] = number.split("").reverse();
  if (splitDigits.length > 4) {
    throw createOverflowError();
  }
  let result: string = "";
  for (let i = 0; i < splitDigits.length; i++) {
    if ((i > 0 && splitDigits[i] === "0") || (i === 0 && splitDigits.length > 1 && splitDigits[i] === "0")) {
      continue;
    } else if (i > 0 && splitDigits[i] === "1") {
      result = jpBasicUnits[i] + result;
    } else {
      result = jpOnesPlace[Number(splitDigits[i])] + jpBasicUnits[i] + result;
    }
  }
  return result;
};
