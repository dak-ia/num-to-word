import { DecimalSeparator, GroupSeparator } from "../constants";
import type { DigitWords } from "../types";

export const thDigitWords: DigitWords = {
  name: "Thai",
  locales: ["th-digits", "thai-digits"],
  separators: { decimal: DecimalSeparator.period, group: GroupSeparator.comma },
  digits: ["ศูนย์", "หนึ่ง", "สอง", "สาม", "สี่", "ห้า", "หก", "เจ็ด", "แปด", "เก้า"],
  join: "",
  decimalPoint: "จุด",
  minus: "ลบ",
  infinity: "อนันต์",
};
