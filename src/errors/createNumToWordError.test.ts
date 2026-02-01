import type { NumToWordErrorType } from "../types";
import { createNumToWordError } from "./createNumToWordError";

describe("createNumToWordError", () => {
  it("should create an error with correct name and message", () => {
    const name: NumToWordErrorType = "OverflowError";
    const message = "Test message";
    const error = createNumToWordError(name, message);
    expect(error.name).toBe(name);
    expect(error.message).toBe(message);
    expect(error).toBeInstanceOf(Error);
  });
});
