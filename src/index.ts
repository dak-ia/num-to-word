export { numToDaiji, numToEnglish, numToJapanese, numToSi, numToWord } from "./converters";
export {
  NumToWordErrorBase,
  InvalidArgumentError,
  InvalidInputError,
  InvalidLocaleError,
  OverflowError,
} from "./errors";
export { NumToWordError } from "./constants";

declare const VERSION: string;

export const version = VERSION;
