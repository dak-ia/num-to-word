import type { NumToWordError } from "../types";
import { createNumToWordError } from "./createNumToWordError";

export function createInvalidInputError(message = "Expected a valid number format."): NumToWordError {
  return createNumToWordError("InvalidInputError", message);
}
