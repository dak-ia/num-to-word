import { InvalidLocaleError } from "./InvalidLocaleError";
import { NumToWordErrorBase } from "./NumToWordErrorBase";

describe("InvalidLocaleError", () => {
  test("name is InvalidLocaleError", () => {
    expect(new InvalidLocaleError().name).toBe("InvalidLocaleError");
  });

  test("falls back to the default message", () => {
    expect(new InvalidLocaleError().message).toBe("Unsupported locale.");
  });

  test("keeps the given message", () => {
    expect(new InvalidLocaleError("custom").message).toBe("custom");
  });

  test("extends NumToWordErrorBase and Error", () => {
    const error = new InvalidLocaleError();
    expect(error).toBeInstanceOf(NumToWordErrorBase);
    expect(error).toBeInstanceOf(Error);
  });
});
