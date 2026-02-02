import { OverflowError } from "./OverflowError";

describe("OverflowError", () => {
  it("should create with default message", () => {
    const error = new OverflowError();
    expect(error.name).toBe("OverflowError");
    expect(error.message).toBe("Number too large for conversion.");
    expect(error).toBeInstanceOf(Error);
  });

  it("should create with custom message", () => {
    const error = new OverflowError("custom");
    expect(error.name).toBe("OverflowError");
    expect(error.message).toBe("custom");
    expect(error).toBeInstanceOf(Error);
  });
});
