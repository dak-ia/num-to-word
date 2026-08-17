import { NumToWordError } from "./NumToWordError";

describe("NumToWordError", () => {
  test("name is NumToWordError", () => {
    expect(new NumToWordError("boom").name).toBe("NumToWordError");
  });

  test("keeps the given message", () => {
    expect(new NumToWordError("boom").message).toBe("boom");
  });

  test("extends Error", () => {
    const error = new NumToWordError("boom");
    expect(error).toBeInstanceOf(NumToWordError);
    expect(error).toBeInstanceOf(Error);
  });
});
