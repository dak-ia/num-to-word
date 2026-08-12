import { NumToWordErrorBase } from "./NumToWordErrorBase";

describe("NumToWordErrorBase", () => {
  test("name is NumToWordError, not the class name", () => {
    expect(new NumToWordErrorBase("boom").name).toBe("NumToWordError");
  });

  test("keeps the given message", () => {
    expect(new NumToWordErrorBase("boom").message).toBe("boom");
  });

  test("extends Error", () => {
    const error = new NumToWordErrorBase("boom");
    expect(error).toBeInstanceOf(NumToWordErrorBase);
    expect(error).toBeInstanceOf(Error);
  });
});
