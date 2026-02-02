import { InvalidLocaleError } from "./InvalidLocaleError";

describe("InvalidLocaleError", () => {
  it("should create with default message", () => {
    const error = new InvalidLocaleError();
    expect(error.name).toBe("InvalidLocaleError");
    expect(error.message).toBe("Unsupported locale.");
    expect(error).toBeInstanceOf(Error);
  });

  it("should create with custom message", () => {
    const error = new InvalidLocaleError("custom");
    expect(error.name).toBe("InvalidLocaleError");
    expect(error.message).toBe("custom");
    expect(error).toBeInstanceOf(Error);
  });
});
