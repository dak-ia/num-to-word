import { localeMap, numToWord } from "./numToWord";

describe("numToWord", () => {
  test("routes to Si converter", () => {
    expect(numToWord("si", "1000")).toBe("1K");
    expect(numToWord("SI", "1000")).toBe("1K");
  });

  test("routes to En converter", () => {
    expect(numToWord("en", "123")).toBe("One hundred twenty-three");
    expect(numToWord("EN", "123")).toBe("One hundred twenty-three");
    expect(numToWord("english", "123")).toBe("One hundred twenty-three");
    expect(numToWord("ENGLISH", "123")).toBe("One hundred twenty-three");
  });

  test("routes to Jp converter", () => {
    expect(numToWord("jp", "123")).toBe("百二十三");
    expect(numToWord("JP", "123")).toBe("百二十三");
    expect(numToWord("japanese", "123")).toBe("百二十三");
    expect(numToWord("JAPANESE", "123")).toBe("百二十三");
  });

  test("routes to JpDaiji converter", () => {
    expect(numToWord("jpdaiji", "123")).toBe("壱陌弐拾参");
    expect(numToWord("JPDAIJI", "123")).toBe("壱陌弐拾参");
    expect(numToWord("daiji", "123")).toBe("壱陌弐拾参");
    expect(numToWord("DAIJI", "123")).toBe("壱陌弐拾参");
  });

  test("throws error for invalid locale", () => {
    expect(() => numToWord("invalid", "123")).toThrow("Unsupported locale.");
    expect(() => numToWord("fr", "123")).toThrow("Unsupported locale.");
    expect(() => numToWord("", "123")).toThrow("Expected a number or string.");
    // @ts-expect-error - Testing invalid input
    expect(() => numToWord(null, "123")).toThrow("Expected a number or string.");
    // @ts-expect-error - Testing invalid input
    expect(() => numToWord(undefined, "123")).toThrow("Expected a number or string.");
  });

  test("throws error for empty number", () => {
    expect(() => numToWord("en", "")).toThrow("Expected a number or string.");
    // @ts-expect-error - Testing invalid input
    expect(() => numToWord("en", null)).toThrow("Expected a number or string.");
    // @ts-expect-error - Testing invalid input
    expect(() => numToWord("en", undefined)).toThrow("Expected a number or string.");
  });

  test("localeMap exported and valid", () => {
    expect(Array.isArray(localeMap)).toBe(true);
    expect(localeMap.some((e) => e.keys.includes("en") && typeof e.fn === "function")).toBe(true);
    expect(localeMap.some((e) => e.keys.includes("jp") && typeof e.fn === "function")).toBe(true);
  });
});
