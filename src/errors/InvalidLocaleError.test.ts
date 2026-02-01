import { createInvalidLocaleError } from "./InvalidLocaleError";

describe("createInvalidLocaleError", () => {
  it("should create an InvalidLocaleError with default message", () => {
    const error = createInvalidLocaleError();
    expect(error.name).toBe("InvalidLocaleError");
    expect(error.message).toBe("Unsupported locale.");
  });
  it("should create an InvalidLocaleError with custom message", () => {
    const error = createInvalidLocaleError("custom");
    expect(error.message).toBe("custom");
  });
});
