import { DecimalSeparator, GroupSeparator } from "../constants";
import type { DigitWords } from "../types";

export const bnDigitWords: DigitWords = {
  name: "Bengali",
  locales: ["bn-digits", "bengali-digits"],
  separators: { decimal: DecimalSeparator.period, group: GroupSeparator.comma },
  digits: ["শূন্য", "এক", "দুই", "তিন", "চার", "পাঁচ", "ছয়", "সাত", "আট", "নয়"],
  join: " ",
  decimalPoint: " দশমিক ",
  minus: "ঋণাত্মক ",
  infinity: "অসীম",
};
