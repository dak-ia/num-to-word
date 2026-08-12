import { NumToWordErrorBase } from "./NumToWordErrorBase";

export class InvalidInputError extends NumToWordErrorBase {
  public override readonly name = "InvalidInputError";
  constructor(message = "Expected a valid number format.") {
    super(message);
  }
}
