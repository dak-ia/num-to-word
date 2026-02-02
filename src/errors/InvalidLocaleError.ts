import { NumToWordError } from "../constants";
import { NumToWordErrorBase } from "./NumToWordErrorBase";

export class InvalidLocaleError extends NumToWordErrorBase {
  public override name: NumToWordError = NumToWordError.InvalidLocaleError;
  constructor(message = "Unsupported locale.") {
    super(message);
  }
}
