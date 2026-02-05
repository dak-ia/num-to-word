import { numToSi } from "./numToSi";

describe("numToSi", () => {
  test("numbers less than 1000", () => {
    expect(numToSi("0")).toBe("0");
    expect(numToSi("1")).toBe("1");
    expect(numToSi("9")).toBe("9");
    expect(numToSi("10")).toBe("10");
    expect(numToSi("99")).toBe("99");
    expect(numToSi("100")).toBe("100");
    expect(numToSi("999")).toBe("999");
  });

  test("thousands (K)", () => {
    expect(numToSi("1000")).toBe("1K");
    expect(numToSi("1500")).toBe("1.5K");
    expect(numToSi("2000")).toBe("2K");
    expect(numToSi("9999")).toBe("9.999K");
    expect(numToSi("10000")).toBe("10K");
    expect(numToSi("99999")).toBe("99.999K");
    expect(numToSi("100000")).toBe("100K");
    expect(numToSi("999999")).toBe("999.999K");
  });

  test("quetta bytes (Q)", () => {
    expect(numToSi("1000000000000000000000000000000")).toBe("1Q");
    expect(numToSi("1500000000000000000000000000000")).toBe("1.5Q");
    expect(numToSi("2000000000000000000000000000000")).toBe("2Q");
    expect(numToSi("123456789012345678901234567890123")).toBe("123.456789012345678901234567890123Q");
    expect(numToSi("987654321098765432109876543210987")).toBe("987.654321098765432109876543210987Q");
  });

  test("decimal inputs", () => {
    expect(numToSi("1.5")).toBe("1.5");
    expect(numToSi("999.999")).toBe("999.999");
    expect(numToSi("1500.5")).toBe("1.5005K");
    expect(numToSi("0.00")).toBe("0");
    expect(numToSi("00.00")).toBe("0");
    expect(numToSi("1.0000")).toBe("1");
    expect(numToSi("0.0001")).toBe("0.0001");
    expect(numToSi("0.00010")).toBe("0.0001");
  });

  test("negative numbers", () => {
    expect(numToSi("-1234")).toBe("-1.234K");
    expect(numToSi("-1234567")).toBe("-1.234567M");
    expect(numToSi(-999)).toBe("-999");
  });

  test("infinity", () => {
    expect(numToSi(Infinity)).toBe("∞");
    expect(numToSi(-Infinity)).toBe("-∞");
    expect(numToSi("Infinity")).toBe("∞");
    expect(numToSi("-Infinity")).toBe("-∞");
    expect(numToSi("infinity")).toBe("∞");
  });

  test("invalid input", () => {
    expect(() => numToSi("1" + "0".repeat(33))).toThrow("Number too large for conversion.");
    expect(() => numToSi("abc")).toThrow("Expected a valid number format.");
    expect(() => numToSi("")).toThrow("Expected a number or string.");
    // @ts-expect-error - Testing invalid input
    expect(() => numToSi(null)).toThrow("Expected a number or string.");
    // @ts-expect-error - Testing invalid input
    expect(() => numToSi(undefined)).toThrow("Expected a number or string.");
  });
});
