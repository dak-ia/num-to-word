import { NumToWordError } from "./NumToWordError";

export class OverflowError extends NumToWordError {
  public override readonly name = "OverflowError";
  constructor(message = "Number too large for conversion.") {
    super(message);
  }
}
