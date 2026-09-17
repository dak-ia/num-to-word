import { DecimalSeparator, GroupSeparator } from "../constants";
import type { DigitWords } from "../types";

export const zhDigitWords: DigitWords = {
  name: "Chinese",
  locales: ["zh-digits", "chinese-digits"],
  separators: { decimal: DecimalSeparator.period, group: GroupSeparator.comma },
  digits: ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"],
  join: "",
  decimalPoint: "点",
  minus: "负",
  infinity: "无穷",
};
