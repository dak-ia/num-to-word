import { preprocessNumber, splitTo1Digit } from "./helpers";
import type { DigitWords } from "../types";
import { InvalidArgumentError } from "../errors";
import { LetterCase } from "../constants";

/**
 * Converts a number digit by digit using the given words.
 * @internal
 * @param number - The number to convert
 * @param words - Words for each digit and for the decimal point, minus and infinity
 * @param letterCase - Overrides the default letter case of the language
 * @returns Digit-by-digit representation
 * @throws {InvalidArgumentError} If not a number or string, or if letterCase is unsupported by the language or not a supported value
 * @throws {InvalidInputError} If empty, or not a valid number or exponential notation
 */
export const replaceDigits = (number: number | string, words: DigitWords, letterCase?: LetterCase): string => {
  if (letterCase !== undefined) {
    if (!Object.values(LetterCase).includes(letterCase)) {
      throw new InvalidArgumentError(`Expected one of ${Object.values(LetterCase).join(", ")} for the letter case.`);
    }
    if (words.letterCase === undefined) {
      throw new InvalidArgumentError("Letter case is not supported for this conversion.");
    }
  }
  const numberParts = preprocessNumber(number);
  const prefix = numberParts.isNegative ? words.minus : "";
  if (numberParts.isInfinity) {
    return applyLetterCase(prefix + words.infinity, words, letterCase);
  }
  const toWords = (digits: string): string =>
    splitTo1Digit(digits)
      .map((digit) => words.digits[Number(digit)])
      .join(words.join);
  let result = toWords(numberParts.integer);
  if (numberParts.decimal !== "") {
    result = result + words.decimalPoint + toWords(numberParts.decimal);
  }
  return applyLetterCase(prefix + result, words, letterCase);
};

/** @internal */
const applyLetterCase = (value: string, words: DigitWords, letterCase?: LetterCase): string => {
  if (words.letterCase === undefined) {
    return value;
  }
  const mode = letterCase ?? words.letterCase;
  const locale = words.caseLocale?.[mode];
  switch (mode) {
    case LetterCase.upper:
      return locale === undefined ? value.toUpperCase() : value.toLocaleUpperCase(locale);
    case LetterCase.lower:
      return locale === undefined ? value.toLowerCase() : value.toLocaleLowerCase(locale);
    default: {
      const head = locale === undefined ? value.slice(0, 1).toUpperCase() : value.slice(0, 1).toLocaleUpperCase(locale);
      return head + value.slice(1);
    }
  }
};
