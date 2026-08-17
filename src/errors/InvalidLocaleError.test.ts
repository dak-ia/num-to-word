import { InvalidLocaleError } from "./InvalidLocaleError";
import { NumToWordError } from "./NumToWordError";

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

  test("extends NumToWordError and Error", () => {
    const error = new InvalidLocaleError();
    expect(error).toBeInstanceOf(NumToWordError);
    expect(error).toBeInstanceOf(Error);
  });
});
