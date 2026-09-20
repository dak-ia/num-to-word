import type { LetterCase } from "../constants";
import type { Separators } from "./Separators";

export type DigitWords = {
  /** numTo{name}Digitsという関数名になる */
  name: string;
  /** 関数名に使えない空白や括弧を含められる表示名 */
  label?: string;
  /** 受け付けるロケール文字列 */
  locales: readonly [string, ...string[]];
  /** 入力を読むときの小数点と桁区切り */
  separators: Separators;
  /** 0から9に対応する語 */
  digits: readonly [string, string, string, string, string, string, string, string, string, string];
  /** 桁の語どうしをつなぐ文字列 */
  join: string;
  /** 小数点として読み上げる語 */
  decimalPoint: string;
  /** 負の数の先頭に付ける語 */
  minus: string;
  /** 無限大として読み上げる語 */
  infinity: string;
  /** 既定の大文字小文字。省くと指定を受け付けなくなる */
  letterCase?: LetterCase;
  /** BCP 47の言語タグ */
  caseLocale?: Partial<Record<LetterCase, string>>;
};
