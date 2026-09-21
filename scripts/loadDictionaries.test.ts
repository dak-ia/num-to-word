import * as dictionaries from "../src/dictionaries/index.ts";
import { LetterCase } from "../src/constants/index.ts";
import { loadDictionaries } from "./loadDictionaries.ts";
import { readdir } from "node:fs/promises";

const digitWordsNames = (module: Record<string, unknown>): string[] =>
  Object.keys(module)
    .filter((name) => name.endsWith("DigitWords"))
    .sort();

describe("loadDictionaries", () => {
  test("loads the same dictionaries as a direct import", async () => {
    const loaded = await loadDictionaries();
    expect(digitWordsNames(loaded)).toEqual(digitWordsNames(dictionaries));
    expect(loaded.jpDigitWords).toEqual(dictionaries.jpDigitWords);
    expect(loaded.enDigitWords).toEqual(dictionaries.enDigitWords);
  });

  test("loads the converter and the constants the generator needs", async () => {
    const loaded = await loadDictionaries();
    expect(loaded.replaceDigits("12", dictionaries.jpDigitWords)).toBe("一二");
    expect(loaded.LetterCase).toEqual(LetterCase);
  });

  test("leaves no temporary directory behind", async () => {
    // 並列で動く他のテストも一時ディレクトリを作るので、この呼び出しで増えたものだけを見る
    const before = await readdir("node_modules");
    await loadDictionaries();
    const after = await readdir("node_modules");
    expect(after.filter((name) => name.startsWith(".generate-") && !before.includes(name))).toEqual([]);
  });
});
