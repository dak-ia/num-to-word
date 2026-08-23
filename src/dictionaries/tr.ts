import type { DigitWords } from "../types";
import { LetterCase } from "../constants";

export const trDigitWords: DigitWords = {
  digits: ["sıfır", "bir", "iki", "üç", "dört", "beş", "altı", "yedi", "sekiz", "dokuz"],
  join: " ",
  decimalPoint: " virgül ",
  minus: "eksi ",
  infinity: "sonsuz",
  letterCase: LetterCase.capitalize,
  // 既定の変換だとiがIになる。トルコ語では点が残ってİになり、Iは点なしのıの大文字になる
  caseLocale: { capitalize: "tr", upper: "tr", lower: "tr" },
};
