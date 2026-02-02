import { InvalidArgumentError, InvalidLocaleError } from "../errors";
import { toEn } from "./toEn";
import { toJp } from "./toJp";
import { toJpDaiji } from "./toJpDaiji";
import { toSi } from "./toSi";

/**
 * Converts a number to words in the specified locale.
 * @param locale - Locale identifier ("en", "jp", "jpdaiji", "si")
 * @param number - The number to convert
 * @returns Word representation in the specified locale
 * @throws {InvalidArgumentError} If invalid arguments
 * @throws {InvalidLocaleError} If unsupported locale
 * @example
 * toLocaleString("en", 123) // "One Hundred Twenty Three"
 * toLocaleString("jp", 123) // "百二十三"
 * toLocaleString("si", 1234) // "1.234K"
 */
export const toLocaleString = (locale: string, number: number | string): string => {
  if (
    locale === null ||
    locale === undefined ||
    locale === "" ||
    number === null ||
    number === undefined ||
    number === ""
  ) {
    throw new InvalidArgumentError();
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
  { keys: ["si"], fn: toSi },
  { keys: ["en", "english"], fn: toEn },
  { keys: ["jp", "japanese"], fn: toJp },
  { keys: ["jpdaiji", "daiji"], fn: toJpDaiji },
];
