import type { NumToWordError } from "../types";
import { createNumToWordError } from "./createNumToWordError";

export function createInvalidArgumentError(message = "Expected a number or string."): NumToWordError {
  return createNumToWordError("InvalidArgumentError", message);
}
