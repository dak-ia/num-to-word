import { InvalidArgumentError } from "./InvalidArgumentError";
import { NumToWordErrorBase } from "./NumToWordErrorBase";

describe("InvalidArgumentError", () => {
  test("name is InvalidArgumentError", () => {
    expect(new InvalidArgumentError().name).toBe("InvalidArgumentError");
  });

  test("falls back to the default message", () => {
    expect(new InvalidArgumentError().message).toBe("Expected a number or string.");
  });

  test("keeps the given message", () => {
    expect(new InvalidArgumentError("custom").message).toBe("custom");
  });

  test("extends NumToWordErrorBase and Error", () => {
    const error = new InvalidArgumentError();
    expect(error).toBeInstanceOf(NumToWordErrorBase);
    expect(error).toBeInstanceOf(Error);
  });
});
