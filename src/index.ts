export {
  numToArabicDigits,
  numToBengaliDigits,
  numToBrazilianPortugueseDigits,
  numToChineseDigits,
  numToDaiji,
  numToDaijiDigits,
  numToDutchDigits,
  numToEnglish,
  numToEnglishDigits,
  numToFrenchDigits,
  numToGermanDigits,
  numToGreekDigits,
  numToHindiDigits,
  numToIndonesianDigits,
  numToItalianDigits,
  numToJapanese,
  numToJapaneseDigits,
  numToKoreanDigits,
  numToMexicanSpanishDigits,
  numToPolishDigits,
  numToPortugueseDigits,
  numToRomanDigits,
  numToRussianDigits,
  numToSi,
  numToSpanishDigits,
  numToThaiDigits,
  numToTurkishDigits,
  numToVietnameseDigits,
  numToWord,
} from "./converters";
export { LetterCase } from "./constants";
export { NumToWordError, InvalidArgumentError, InvalidInputError, InvalidLocaleError, OverflowError } from "./errors";

declare const VERSION: string;

export const version = VERSION;
