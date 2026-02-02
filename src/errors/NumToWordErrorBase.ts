import { NumToWordError } from "../constants";

export class NumToWordErrorBase extends Error {
  public override name: NumToWordError = NumToWordError.NumToWordError;
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
