export { numToDaiji, numToEnglish, numToJapanese, numToSi, numToWord } from "./converters";
export {
  NumToWordErrorBase,
  InvalidArgumentError,
  InvalidInputError,
  InvalidLocaleError,
  OverflowError,
} from "./errors";

declare const VERSION: string;

export const version = VERSION;
