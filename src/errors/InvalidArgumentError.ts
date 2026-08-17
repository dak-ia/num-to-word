import { NumToWordError } from "./NumToWordError";

export class InvalidArgumentError extends NumToWordError {
  public override readonly name = "InvalidArgumentError";
  constructor(message = "Expected a number or string.") {
    super(message);
  }
}
