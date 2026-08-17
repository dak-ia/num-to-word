import { InvalidArgumentError } from "./InvalidArgumentError";
import { NumToWordError } from "./NumToWordError";

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

  test("extends NumToWordError and Error", () => {
    const error = new InvalidArgumentError();
    expect(error).toBeInstanceOf(NumToWordError);
    expect(error).toBeInstanceOf(Error);
  });
});
