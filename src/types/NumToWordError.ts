export type NumToWordErrorType = "OverflowError" | "InvalidArgumentError" | "InvalidInputError" | "InvalidLocaleError";

export interface NumToWordError extends Error {
  name: NumToWordErrorType;
}
