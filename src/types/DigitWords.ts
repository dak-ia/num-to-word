import type { LetterCase } from "../constants";

export type DigitWords = {
  digits: readonly string[];
  join: string;
  decimalPoint: string;
  minus: string;
  infinity: string;
  letterCase?: LetterCase;
  /** 揃え方ごとに使うBCP 47の言語タグ */
  caseLocale?: Partial<Record<LetterCase, string>>;
};
