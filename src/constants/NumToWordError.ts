export const NumToWordError = {
  NumToWordError: "NumToWordError",
  OverflowError: "OverflowError",
  InvalidArgumentError: "InvalidArgumentError",
  InvalidInputError: "InvalidInputError",
  InvalidLocaleError: "InvalidLocaleError",
} as const;

export type NumToWordError = (typeof NumToWordError)[keyof typeof NumToWordError];
