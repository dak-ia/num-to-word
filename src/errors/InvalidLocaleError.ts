import { NumToWordError } from "./NumToWordError";

export class InvalidLocaleError extends NumToWordError {
  public override readonly name = "InvalidLocaleError";
  constructor(message = "Unsupported locale.") {
    super(message);
  }
}
