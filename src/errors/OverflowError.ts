import type { NumToWordError } from "../types";
import { createNumToWordError } from "./createNumToWordError";

export function createOverflowError(message = "Number too large for conversion."): NumToWordError {
  return createNumToWordError("OverflowError", message);
}
