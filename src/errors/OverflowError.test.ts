import { NumToWordErrorBase } from "./NumToWordErrorBase";
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

  test("extends NumToWordErrorBase and Error", () => {
    const error = new OverflowError();
    expect(error).toBeInstanceOf(NumToWordErrorBase);
    expect(error).toBeInstanceOf(Error);
  });
});
