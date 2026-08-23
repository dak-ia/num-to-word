export const LetterCase = {
  capitalize: "capitalize",
  upper: "upper",
  lower: "lower",
} as const;

export type LetterCase = (typeof LetterCase)[keyof typeof LetterCase];
