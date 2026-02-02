import { InvalidInputError } from "./InvalidInputError";

describe("InvalidInputError", () => {
  it("should create with default message", () => {
    const error = new InvalidInputError();
    expect(error.name).toBe("InvalidInputError");
    expect(error.message).toBe("Expected a valid number format.");
    expect(error).toBeInstanceOf(Error);
  });

  it("should create with custom message", () => {
    const error = new InvalidInputError("custom");
    expect(error.name).toBe("InvalidInputError");
    expect(error.message).toBe("custom");
    expect(error).toBeInstanceOf(Error);
  });
});
