import { DecimalSeparator, GroupSeparator } from "../constants";
import type { DigitWords } from "../types";

export const koDigitWords: DigitWords = {
  name: "Korean",
  locales: ["ko-digits", "korean-digits"],
  separators: { decimal: DecimalSeparator.period, group: GroupSeparator.comma },
  digits: ["영", "일", "이", "삼", "사", "오", "육", "칠", "팔", "구"],
  join: "",
  decimalPoint: "점",
  minus: "마이너스 ",
  infinity: "무한",
};
