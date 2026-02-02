import { NumToWordError } from "../constants";
import { NumToWordErrorBase } from "./NumToWordErrorBase";

export class InvalidInputError extends NumToWordErrorBase {
  public override name: NumToWordError = NumToWordError.InvalidInputError;
  constructor(message = "Expected a valid number format.") {
    super(message);
  }
}
