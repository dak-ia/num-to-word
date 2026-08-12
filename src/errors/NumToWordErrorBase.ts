export class NumToWordErrorBase extends Error {
  public override readonly name: string = "NumToWordError";
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
