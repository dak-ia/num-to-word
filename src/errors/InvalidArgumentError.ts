import { NumToWordErrorBase } from "./NumToWordErrorBase";

export class InvalidArgumentError extends NumToWordErrorBase {
  public override readonly name = "InvalidArgumentError";
  constructor(message = "Expected a number or string.") {
    super(message);
  }
}
