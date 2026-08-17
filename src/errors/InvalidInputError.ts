import { NumToWordError } from "./NumToWordError";

export class InvalidInputError extends NumToWordError {
  public override readonly name = "InvalidInputError";
  constructor(message = "Expected a valid number format.") {
    super(message);
  }
}
