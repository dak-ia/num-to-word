import { NumToWordErrorBase } from "./NumToWordErrorBase";

export class InvalidLocaleError extends NumToWordErrorBase {
  public override readonly name = "InvalidLocaleError";
  constructor(message = "Unsupported locale.") {
    super(message);
  }
}
