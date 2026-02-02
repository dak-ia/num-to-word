import { NumToWordError } from "../constants";
import { NumToWordErrorBase } from "./NumToWordErrorBase";

export class InvalidArgumentError extends NumToWordErrorBase {
  public override name: NumToWordError = NumToWordError.InvalidArgumentError;
  constructor(message = "Expected a number or string.") {
    super(message);
  }
}
