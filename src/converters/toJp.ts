import { jpLargeUnits, jpOnesPlace } from "../dictionaries";
import { replaceIntUnitJp, splitNum, splitTo1Digit, splitTo4Digits } from "../utils";

/**
 * Converts a number to Japanese kanji.
 * @param number - The number to convert
 * @returns Japanese kanji representation
 * @throws {Error} If invalid or overflow
 * @example
 * toJp(123) // "百二十三"
 * toJp("1234.56") // "千二百三十四点五六"
 */
export const toJp = (number: number | string): string => {
  const numberParts = splitNum(number);
  if (numberParts.integer.length > jpLargeUnits.length * 4) {
    throw new Error("Overflow");
  }
  // ゼロの特別処理（小数部がない場合のみ）
  if (numberParts.integer === "0" && numberParts.decimal === "") {
    return jpOnesPlace[0];
  }
  // 連続ゼロを単一の0として扱う
  if (/^0+$/.test(numberParts.integer) && numberParts.decimal === "") {
    return jpOnesPlace[0];
  }
  const prefix = numberParts.isNegative ? "負の" : "";
  let integerArray = splitTo4Digits(numberParts.integer);
  let decimalArray = splitTo1Digit(numberParts.decimal);
  integerArray = integerArray
    .reverse()
    .map((num, i) => {
      if (num !== "0" && num !== "00" && num !== "000" && num !== "0000") {
        return replaceIntUnitJp(num) + jpLargeUnits[i];
      }
      return undefined;
    })
    .reverse()
    .filter((item): item is string => item !== undefined);
  decimalArray = decimalArray.map((num) => {
    return jpOnesPlace[Number(num)];
  });

  let integerPart = integerArray.join("");
  // 整数部が空（すべて0）で小数部がある場合は〇を表示
  if (integerPart === "" && decimalArray.length > 0) {
    integerPart = jpOnesPlace[0];
  }

  if (decimalArray.length > 0) {
    return prefix + integerPart + "・" + decimalArray.join("");
  } else {
    return prefix + integerPart;
  }
};
