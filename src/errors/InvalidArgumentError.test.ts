import { InvalidArgumentError } from "./InvalidArgumentError";

describe("InvalidArgumentError", () => {
  it("should create with default message", () => {
    const error = new InvalidArgumentError();
    expect(error.name).toBe("InvalidArgumentError");
    expect(error.message).toBe("Expected a number or string.");
    expect(error).toBeInstanceOf(Error);
  });

  it("should create with custom message", () => {
    const error = new InvalidArgumentError("custom");
    expect(error.name).toBe("InvalidArgumentError");
    expect(error.message).toBe("custom");
    expect(error).toBeInstanceOf(Error);
  });
});
