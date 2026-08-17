import { InvalidInputError } from "./InvalidInputError";
import { NumToWordError } from "./NumToWordError";

describe("InvalidInputError", () => {
  test("name is InvalidInputError", () => {
    expect(new InvalidInputError().name).toBe("InvalidInputError");
  });

  test("falls back to the default message", () => {
    expect(new InvalidInputError().message).toBe("Expected a valid number format.");
  });

  test("keeps the given message", () => {
    expect(new InvalidInputError("custom").message).toBe("custom");
  });

  test("extends NumToWordError and Error", () => {
    const error = new InvalidInputError();
    expect(error).toBeInstanceOf(NumToWordError);
    expect(error).toBeInstanceOf(Error);
  });
});
