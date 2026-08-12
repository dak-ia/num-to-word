import { NumToWordErrorBase } from "./NumToWordErrorBase";

export class OverflowError extends NumToWordErrorBase {
  public override readonly name = "OverflowError";
  constructor(message = "Number too large for conversion.") {
    super(message);
  }
}
