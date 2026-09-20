import * as converters from "./index";
import * as pkg from "../index";
import { localeMap } from "./numToWord";

describe("converters", () => {
  test("every converter is exported from the package", () => {
    const missing = Object.entries(converters)
      .filter(([name, fn]) => (pkg as Record<string, unknown>)[name] !== fn)
      .map(([name]) => name);
    expect(missing).toEqual([]);
  });

  test("every converter but the dispatcher answers to a locale of numToWord", () => {
    const mapped = new Set<unknown>(localeMap.map((entry) => entry.fn));
    const missing = Object.entries(converters)
      .filter(([name, exported]) => typeof exported === "function" && name !== "numToWord" && !mapped.has(exported))
      .map(([name]) => name);
    expect(missing).toEqual([]);
  });
});
