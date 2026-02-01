import { createInvalidInputError } from "./InvalidInputError";

describe("createInvalidInputError", () => {
  it("should create an InvalidInputError with default message", () => {
    const error = createInvalidInputError();
    expect(error.name).toBe("InvalidInputError");
    expect(error.message).toBe("Expected a valid number format.");
  });
  it("should create an InvalidInputError with custom message", () => {
    const error = createInvalidInputError("custom");
    expect(error.message).toBe("custom");
  });
});
