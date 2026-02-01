import type { NumToWordError } from "../types";
import { createNumToWordError } from "./createNumToWordError";

export function createInvalidLocaleError(message = "Unsupported locale."): NumToWordError {
  return createNumToWordError("InvalidLocaleError", message);
}
