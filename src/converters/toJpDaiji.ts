import { jpDaijiAfter, jpDaijiBefore, jpLargeUnits } from "../dictionaries";
import { toJp } from "./toJp";

/**
 * Converts a number to formal daiji (大字) numerals used in legal documents.
 * @param number - The number to convert
 * @returns Japanese daiji representation
 * @throws {Error} If invalid or overflow
 * @example
 * toJpDaiji(123) // "壱百弐拾参"
 * toJpDaiji("10000") // "壱萬"
 */
export const toJpDaiji = (number: number | string): string => {
  let result = toJp(number);
  // 大字では算用数字で1になるすべての単位の前に「壱」を明記する
  // 後年省略されるケースもあったが、ここでは明記する方式を採用
  result = result.replace(/(?<![一二三四五六七八九])(十|百|千)/gu, "一$1");
  const largeUnitsPattern: string = jpLargeUnits.filter((p) => p !== "").join("|");
  result = result.replace(new RegExp(`(?<![一二三四五六七八九十百千])(${largeUnitsPattern})`, "gu"), "一$1");
  // 通常の大字変換
  for (let i = 0; i <= 13; i++) {
    const reg = new RegExp(jpDaijiBefore[i], "g");
    result = result.replace(reg, jpDaijiAfter[i]);
  }
  return result;
};
