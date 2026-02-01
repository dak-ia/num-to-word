import { toEn, toJp, toJpDaiji, toLocaleString, toSi } from "./converters";

declare const VERSION: string;

const version: string = VERSION;

// named export
export const numToWordEn = toEn;
export const numToWordJp = toJp;
export const numToWordJpDaiji = toJpDaiji;
export const numToWordSi = toSi;
export const numToWordLocale = toLocaleString;

// default export
export default {
  version,
  toEn,
  toJp,
  toJpDaiji,
  toSi,
  toLocaleString,
};
