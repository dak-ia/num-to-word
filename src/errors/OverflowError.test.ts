import { createOverflowError } from "./OverflowError";

describe("createOverflowError", () => {
  it("should create an OverflowError with default message", () => {
    const error = createOverflowError();
    expect(error.name).toBe("OverflowError");
    expect(error.message).toBe("Number too large for conversion.");
  });
  it("should create an OverflowError with custom message", () => {
    const error = createOverflowError("custom");
    expect(error.message).toBe("custom");
  });
});
