import { InvalidArgumentError, InvalidLocaleError } from "../errors";
import {
  arDigitWords,
  bnDigitWords,
  deDigitWords,
  elDigitWords,
  enDigitWords,
  esDigitWords,
  esMxDigitWords,
  frDigitWords,
  hiDigitWords,
  idDigitWords,
  itDigitWords,
  jpDaijiDigitWords,
  jpDigitWords,
  koDigitWords,
  nlDigitWords,
  plDigitWords,
  ptBrDigitWords,
  ptDigitWords,
  romanDigitWords,
  ruDigitWords,
  thDigitWords,
  trDigitWords,
  viDigitWords,
  zhDigitWords,
} from "../dictionaries";
import {
  numToArabicDigits,
  numToBengaliDigits,
  numToBrazilianPortugueseDigits,
  numToChineseDigits,
  numToDaijiDigits,
  numToDutchDigits,
  numToEnglishDigits,
  numToFrenchDigits,
  numToGermanDigits,
  numToGreekDigits,
  numToHindiDigits,
  numToIndonesianDigits,
  numToItalianDigits,
  numToJapaneseDigits,
  numToKoreanDigits,
  numToMexicanSpanishDigits,
  numToPolishDigits,
  numToPortugueseDigits,
  numToRomanDigits,
  numToRussianDigits,
  numToSpanishDigits,
  numToThaiDigits,
  numToTurkishDigits,
  numToVietnameseDigits,
} from "./digits";
import { LetterCase } from "../constants";
import { numToDaiji } from "./numToDaiji";
import { numToEnglish } from "./numToEnglish";
import { numToJapanese } from "./numToJapanese";
import { numToSi } from "./numToSi";

/**
 * Converts a number to words in the specified locale.
 * @param locale - Locale identifier ("en", "jp", "jpdaiji", "si"). Digit-by-digit conversion uses a "-digits" key such as "en-digits" or "de-digits" and covers more languages
 * @param number - The number to convert
 * @param letterCase - Overrides the default letter case of the language
 * @returns Word representation in the specified locale
 * @throws {InvalidArgumentError} If locale is not a string, number is neither a number nor a string, or letterCase is unsupported by the conversion
 * @throws {InvalidLocaleError} If unsupported locale
 * @example
 * numToWord("en", 123) // "One hundred twenty-three"
 * numToWord("jp", 123) // "百二十三"
 * numToWord("si", 1234) // "1.234K"
 */
export const numToWord = (locale: string, number: number | string, letterCase?: LetterCase): string => {
  if (typeof locale !== "string") {
    throw new InvalidArgumentError("Expected a string locale.");
  }

  const localeLower: string = locale.toLowerCase();
  const entry = localeMap.find((e) => e.keys.includes(localeLower));
  if (!entry) {
    throw new InvalidLocaleError();
  }
  // 変換側で既定値や可変長引数を使うと引数の数が変わり、この判定がサイレントに壊れる
  if (letterCase !== undefined && entry.fn.length < 2) {
    throw new InvalidArgumentError("Letter case is not supported for this conversion.");
  }
  return entry.fn(number, letterCase);
};

type LocaleEntry = {
  keys: readonly string[];
  // メソッド構文にすると引数が双変になり、number|stringを受け取らない関数まで通ってしまう
  fn: (_: number | string, _letterCase?: LetterCase) => string;
};
export const localeMap: LocaleEntry[] = [
  { keys: ["si"], fn: numToSi },
  { keys: ["en", "english"], fn: numToEnglish },
  { keys: ["jp", "japanese", "kanji"], fn: numToJapanese },
  { keys: ["jpdaiji", "daiji"], fn: numToDaiji },
  { keys: enDigitWords.locales, fn: numToEnglishDigits },
  { keys: jpDigitWords.locales, fn: numToJapaneseDigits },
  { keys: jpDaijiDigitWords.locales, fn: numToDaijiDigits },
  { keys: arDigitWords.locales, fn: numToArabicDigits },
  { keys: bnDigitWords.locales, fn: numToBengaliDigits },
  { keys: zhDigitWords.locales, fn: numToChineseDigits },
  { keys: nlDigitWords.locales, fn: numToDutchDigits },
  { keys: frDigitWords.locales, fn: numToFrenchDigits },
  { keys: deDigitWords.locales, fn: numToGermanDigits },
  { keys: elDigitWords.locales, fn: numToGreekDigits },
  { keys: hiDigitWords.locales, fn: numToHindiDigits },
  { keys: idDigitWords.locales, fn: numToIndonesianDigits },
  { keys: itDigitWords.locales, fn: numToItalianDigits },
  { keys: koDigitWords.locales, fn: numToKoreanDigits },
  { keys: plDigitWords.locales, fn: numToPolishDigits },
  { keys: ptDigitWords.locales, fn: numToPortugueseDigits },
  { keys: ptBrDigitWords.locales, fn: numToBrazilianPortugueseDigits },
  { keys: ruDigitWords.locales, fn: numToRussianDigits },
  { keys: esDigitWords.locales, fn: numToSpanishDigits },
  { keys: esMxDigitWords.locales, fn: numToMexicanSpanishDigits },
  { keys: thDigitWords.locales, fn: numToThaiDigits },
  { keys: trDigitWords.locales, fn: numToTurkishDigits },
  { keys: viDigitWords.locales, fn: numToVietnameseDigits },
  { keys: romanDigitWords.locales, fn: numToRomanDigits },
];
