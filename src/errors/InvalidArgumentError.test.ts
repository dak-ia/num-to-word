import { createInvalidArgumentError } from "./InvalidArgumentError";

describe("createInvalidArgumentError", () => {
  it("should create an InvalidArgumentError with default message", () => {
    const error = createInvalidArgumentError();
    expect(error.name).toBe("InvalidArgumentError");
    expect(error.message).toBe("Expected a number or string.");
  });
  it("should create an InvalidArgumentError with custom message", () => {
    const error = createInvalidArgumentError("custom");
    expect(error.message).toBe("custom");
  });
});
