import { NumToWordError } from "./NumToWordError";
import { OverflowError } from "./OverflowError";

describe("OverflowError", () => {
  test("name is OverflowError", () => {
    expect(new OverflowError().name).toBe("OverflowError");
  });

  test("falls back to the default message", () => {
    expect(new OverflowError().message).toBe("Number too large for conversion.");
  });

  test("keeps the given message", () => {
    expect(new OverflowError("custom").message).toBe("custom");
  });

  test("extends NumToWordError and Error", () => {
    const error = new OverflowError();
    expect(error).toBeInstanceOf(NumToWordError);
    expect(error).toBeInstanceOf(Error);
  });
});
