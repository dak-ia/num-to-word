import type { NumToWordError, NumToWordErrorType } from "../types";

export function createNumToWordError(name: NumToWordErrorType, message: string): NumToWordError {
  const error = new Error(message) as NumToWordError;
  error.name = name;
  return error;
}
