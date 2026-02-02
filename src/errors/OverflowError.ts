import { NumToWordError } from "../constants";
import { NumToWordErrorBase } from "./NumToWordErrorBase";

export class OverflowError extends NumToWordErrorBase {
  public override name: NumToWordError = NumToWordError.OverflowError;
  constructor(message = "Number too large for conversion.") {
    super(message);
  }
}
