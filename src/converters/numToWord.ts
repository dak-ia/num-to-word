import { InvalidArgumentError, InvalidLocaleError } from "../errors";
import { numToDaiji } from "./numToDaiji";
import { numToDaijiDigits } from "./numToDaijiDigits";
import { numToEnglish } from "./numToEnglish";
import { numToEnglishDigits } from "./numToEnglishDigits";
import { numToJapanese } from "./numToJapanese";
import { numToJapaneseDigits } from "./numToJapaneseDigits";
import { numToSi } from "./numToSi";

/**
 * Converts a number to words in the specified locale.
 * @param locale - Locale identifier ("en", "jp", "jpdaiji", "si"). Add "-digits" to convert digit by digit
 * @param number - The number to convert
 * @returns Word representation in the specified locale
 * @throws {InvalidArgumentError} If locale is not a string, or number is neither a number nor a string
 * @throws {InvalidLocaleError} If unsupported locale
 * @example
 * numToWord("en", 123) // "One Hundred Twenty Three"
 * numToWord("jp", 123) // "百二十三"
 * numToWord("si", 1234) // "1.234K"
 */
export const numToWord = (locale: string, number: number | string): string => {
  if (typeof locale !== "string") {
    throw new InvalidArgumentError("Expected a string locale.");
  }

  const localeLower: string = locale.toLowerCase();
  const entry = localeMap.find((e) => e.keys.includes(localeLower));
  if (entry) return entry.fn(number);
  throw new InvalidLocaleError();
};

interface LocaleEntry {
  keys: string[];
  fn: (_: number | string) => string;
}
export const localeMap: LocaleEntry[] = [
  { keys: ["si"], fn: numToSi },
  { keys: ["en", "english"], fn: numToEnglish },
  { keys: ["jp", "japanese", "kanji"], fn: numToJapanese },
  { keys: ["jpdaiji", "daiji"], fn: numToDaiji },
  { keys: ["en-digits", "english-digits"], fn: numToEnglishDigits },
  { keys: ["jp-digits", "japanese-digits", "kanji-digits"], fn: numToJapaneseDigits },
  { keys: ["jpdaiji-digits", "daiji-digits"], fn: numToDaijiDigits },
];
