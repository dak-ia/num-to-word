import { DecimalSeparator, GroupSeparator, LetterCase } from "../src/constants/index.ts";
import {
  buildEntries,
  findStale,
  main,
  prettify,
  renderBarrel,
  renderBarrelTest,
  renderConverter,
  renderDigitsDoc,
  renderTest,
} from "./generateDigits.ts";
import { mkdtemp, readFile, readdir, rm, writeFile } from "node:fs/promises";
import type { DigitWords } from "../src/types/index.ts";
import type { FormatSource } from "./generateDigits.ts";
import { join } from "node:path";

// prettierの設定はファイルの位置から引かれるので、リポジトリ内に作業ディレクトリを作る
const withTempDir = async <T>(run: (_dir: string) => Promise<T>): Promise<T> => {
  const dir = await mkdtemp(join("node_modules", ".test-generate-"));
  try {
    return await run(dir);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
};

const base = {
  digits: ["ze", "on", "tw", "th", "fo", "fi", "si", "se", "ei", "ni"] as const,
  separators: { decimal: DecimalSeparator.period, group: GroupSeparator.comma } as const,
  join: "-",
  decimalPoint: " dot ",
  minus: "neg ",
  infinity: "inf",
};

const enDigitWords: DigitWords = {
  ...base,
  name: "English",
  locales: ["en-digits", "english-digits"],
  letterCase: LetterCase.capitalize,
};
const jpDigitWords: DigitWords = { ...base, name: "Japanese", label: "Japanese kanji", locales: ["jp-digits"] };
const romanDigitWords: DigitWords = {
  ...base,
  name: "Roman",
  label: "Roman numeral",
  locales: ["roman-digits"],
  letterCase: LetterCase.upper,
};

const exampleOf = (number: number | string, dictionary: DigitWords): string => `<${dictionary.name}:${number}>`;
const load = async () => ({
  replaceDigits: (number: number | string, dictionary: DigitWords) => exampleOf(number, dictionary),
  LetterCase,
  enDigitWords,
  jpDigitWords,
  romanDigitWords,
});
const formatSource: FormatSource = async (_path, text) => `${text}// formatted\n`;
const io = () => ({ log: jest.fn(), error: jest.fn() });

describe("renderConverter", () => {
  test("takes a letter case when the dictionary has one", () => {
    const source = renderConverter({
      fn: "numToEnglishDigits",
      wordsExport: "enDigitWords",
      label: "English",
      letterCase: LetterCase.capitalize,
      examples: [{ input: "0123", output: "Ze-on-tw-th" }],
    });
    expect(source).toContain("letterCase?: LetterCase");
    expect(source).toContain('import type { LetterCase } from "../../constants";');
    expect(source).toContain("@param letterCase - Overrides the default letter case of the language");
    expect(source).toContain('numToEnglishDigits("0123") // "Ze-on-tw-th"');
  });

  test("leaves out the letter case parameter when the dictionary has none", () => {
    const source = renderConverter({
      fn: "numToJapaneseDigits",
      wordsExport: "jpDigitWords",
      label: "Japanese kanji",
      examples: [{ input: "0123", output: "ze-on-tw-th" }],
    });
    expect(source).toContain("(number: number | string): string =>\n  replaceDigits(number, jpDigitWords);");
    expect(source).not.toContain("letterCase");
    expect(source).not.toContain("LetterCase");
    expect(source).toContain("Converts a number to Japanese kanji digit by digit.");
  });

  test("orders the imports the way sort-imports expects", () => {
    const order = (wordsExport: string): number[] => {
      const source = renderConverter({
        fn: "f",
        wordsExport,
        label: "l",
        letterCase: LetterCase.capitalize,
        examples: [],
      });
      return ['from "../../constants"', 'from "../../dictionaries"', 'from "../../utils"'].map((from) =>
        source.indexOf(from)
      );
    };
    const [constants, dictionaries, utils] = order("enDigitWords");
    expect(constants).toBeLessThan(dictionaries);
    expect(dictionaries).toBeLessThan(utils);

    const [, romanDictionaries, romanUtils] = order("romanDigitWords");
    expect(romanUtils).toBeLessThan(romanDictionaries);
  });

  test("leaves out the example tag when there is nothing to show", () => {
    const source = renderConverter({
      fn: "f",
      wordsExport: "enDigitWords",
      label: "l",
      examples: [],
    });
    expect(source).not.toContain("@example");
    expect(source).toContain(" * @returns l representing each digit\n */");
  });

  test("writes an example line per input, with Infinity as a number literal", () => {
    const source = renderConverter({
      fn: "numToEnglishDigits",
      wordsExport: "enDigitWords",
      label: "English words",
      letterCase: LetterCase.capitalize,
      examples: [
        { input: "1.500", output: "on dot fi" },
        { input: Infinity, output: "inf" },
      ],
    });
    expect(source).toContain('numToEnglishDigits("1.500") // "on dot fi"');
    expect(source).toContain('numToEnglishDigits(Infinity) // "inf"');
    expect(source).toContain("@returns English words representing each digit");
  });
});

describe("renderBarrel", () => {
  test("re-exports every generated converter", () => {
    expect(renderBarrel([{ fn: "numToAaaDigits" }, { fn: "numToBbbDigits" }])).toBe(
      '// このファイルはnpm run generateからの自動生成のため手動編集禁止\nexport { numToAaaDigits } from "./numToAaaDigits";\nexport { numToBbbDigits } from "./numToBbbDigits";\n'
    );
  });
});

describe("renderBarrelTest", () => {
  const source = renderBarrelTest([{ fn: "numToAaaDigits" }, { fn: "numToBbbDigits" }]);

  test("says the file is generated", () => {
    expect(source).toContain("// このファイルはnpm run generateからの自動生成のため手動編集禁止");
  });

  test("expects the barrel to hold every generated converter", () => {
    expect(source).toContain('import * as digits from "./index";');
    expect(source).toContain("expect(Object.keys(digits).sort()).toEqual([");
    expect(source).toContain('"numToAaaDigits"');
    expect(source).toContain('"numToBbbDigits"');
  });
});

describe("renderDigitsDoc", () => {
  const letterCases = Object.values(LetterCase);
  const entries = [
    {
      fn: "numToEnglishDigits",
      wordsExport: "enDigitWords",
      label: "English words",
      letterCase: LetterCase.capitalize,
      locales: ["en-digits", "english-digits"],
      separators: { decimal: DecimalSeparator.period, group: GroupSeparator.comma } as const,
      examples: [
        { input: "0123", output: "Ze-on-tw-th" },
        { input: Infinity, output: "inf" },
      ],
      tests: [],
    },
    {
      fn: "numToJapaneseDigits",
      wordsExport: "jpDigitWords",
      label: "Japanese kanji",
      letterCase: undefined,
      locales: ["jp-digits"],
      separators: { decimal: DecimalSeparator.period, group: GroupSeparator.comma } as const,
      examples: [{ input: "0123", output: "ze-on-tw-th" }],
      tests: [],
    },
  ];

  test("says the file is generated", () => {
    expect(renderDigitsDoc(entries, letterCases)).toContain(
      "<!-- このファイルはnpm run generateからの自動生成のため手動編集禁止 -->"
    );
  });

  test("puts the plain conversion before its variant when both start with the same language", () => {
    const kanji = { ...entries[1], fn: "numToJapaneseDigits", label: "Japanese kanji", locales: ["jp-digits"] };
    const daiji = {
      ...entries[1],
      fn: "numToDaijiDigits",
      label: "Japanese daiji (大字) numerals",
      locales: ["jpdaiji-digits"],
    };
    const doc = renderDigitsDoc([daiji, kanji], letterCases);
    expect(doc.indexOf("## Japanese kanji")).toBeLessThan(doc.indexOf("## Japanese daiji"));
    expect(renderDigitsDoc([kanji, daiji], letterCases)).toBe(doc);
  });

  test("puts the base language before its regional variant", () => {
    const spanish = { ...entries[0], label: "Spanish words", locales: ["es-digits"] };
    const mexican = { ...entries[0], label: "Spanish words (Mexico)", locales: ["es-mx-digits"] };
    const portuguese = { ...entries[0], label: "Portuguese words", locales: ["pt-digits"] };
    const brazilian = { ...entries[0], label: "Portuguese words (Brazil)", locales: ["pt-br-digits"] };
    const doc = renderDigitsDoc([mexican, spanish, brazilian, portuguese], letterCases);
    expect(doc.indexOf("## Spanish words\n")).toBeLessThan(doc.indexOf("## Spanish words (Mexico)"));
    expect(doc.indexOf("## Portuguese words\n")).toBeLessThan(doc.indexOf("## Portuguese words (Brazil)"));
  });

  test("orders the sections by heading, not by function name", () => {
    const daiji = { ...entries[1], fn: "numToDaijiDigits", label: "Japanese daiji" };
    const doc = renderDigitsDoc([daiji, entries[0]], letterCases);
    expect(doc.indexOf("## English words")).toBeLessThan(doc.indexOf("## Japanese daiji"));
  });

  test("gives every dictionary a section headed by its label", () => {
    const doc = renderDigitsDoc(entries, letterCases);
    expect(doc).toContain("## English words");
    expect(doc).toContain("## Japanese kanji");
  });

  test("shows the result of every example input", () => {
    expect(renderDigitsDoc(entries, letterCases)).toContain('numToEnglishDigits("0123"); // "Ze-on-tw-th"');
    expect(renderDigitsDoc(entries, letterCases)).toContain('numToEnglishDigits(Infinity); // "inf"');
  });

  test("shows how to reach the conversion through numToWord", () => {
    expect(renderDigitsDoc(entries, letterCases)).toContain('numToWord("en-digits", "0123"); // "Ze-on-tw-th"');
  });

  test("shows how the language writes the decimal point and the group separator", () => {
    const doc = renderDigitsDoc(entries, letterCases);
    expect(doc).toContain("- 小数点 / Decimal point: `.`");
    expect(doc).toContain("- 桁区切り / Group separator: `,`");
  });

  test("spells out a group separator that is whitespace", () => {
    const spaced = { ...entries[0], separators: { decimal: DecimalSeparator.comma, group: GroupSeparator.space } };
    expect(renderDigitsDoc([spaced], letterCases)).toContain("- 桁区切り / Group separator: 空白 / space");
  });

  test("lists every locale the conversion answers to", () => {
    expect(renderDigitsDoc(entries, letterCases)).toContain("`en-digits`, `english-digits`");
  });

  test("marks the default letter case among the values that can be given", () => {
    expect(renderDigitsDoc(entries, letterCases)).toContain("`capitalize`（既定）, `upper`, `lower`");
  });

  test("says a conversion without a letter case does not take one", () => {
    const doc = renderDigitsDoc([entries[1]], letterCases);
    expect(doc).toContain("非対応 / Not supported");
    expect(doc).not.toContain("capitalize");
  });

  test("leaves out the code block when there is no example", () => {
    expect(renderDigitsDoc([{ ...entries[1], examples: [] }], letterCases)).not.toContain("```");
  });
});

describe("buildEntries", () => {
  test("takes only the dictionaries and sorts them by function name", () => {
    const entries = buildEntries({ romanDigitWords, enDigitWords, siSymbols: {}, jpOnesPlace: [] }, exampleOf);
    expect(entries.map((e) => e.fn)).toEqual(["numToEnglishDigits", "numToRomanDigits"]);
  });

  test("falls back to the name when the dictionary has no label", () => {
    const entries = buildEntries({ enDigitWords, jpDigitWords }, exampleOf);
    expect(entries.map((e) => e.label)).toEqual(["English words", "Japanese kanji"]);
  });

  test("reads the default letter case from the dictionary", () => {
    const entries = buildEntries({ enDigitWords, jpDigitWords }, exampleOf);
    expect(entries.map((e) => e.letterCase)).toEqual([LetterCase.capitalize, undefined]);
  });

  test("carries the locales of the dictionary", () => {
    const entries = buildEntries({ enDigitWords }, exampleOf);
    expect(entries[0].locales).toEqual(["en-digits", "english-digits"]);
  });

  test("carries the separators of the dictionary", () => {
    const entries = buildEntries({ enDigitWords }, exampleOf);
    expect(entries[0].separators).toEqual({ decimal: DecimalSeparator.period, group: GroupSeparator.comma });
  });

  test("builds the test inputs from the separators of the dictionary", () => {
    const comma: DigitWords = {
      ...enDigitWords,
      separators: { decimal: DecimalSeparator.comma, group: GroupSeparator.period },
    };
    const inputs = (words: DigitWords, name: string): (number | string)[] => {
      const entry = buildEntries({ someDigitWords: words }, exampleOf)[0];
      return entry.tests.find((test) => test.name === name)?.cases.map(({ input }) => input) ?? [];
    };
    expect(inputs(enDigitWords, "keeps trailing zeros in the decimal part")).toEqual(["1.50"]);
    expect(inputs(comma, "keeps trailing zeros in the decimal part")).toEqual(["1,50"]);
    expect(inputs(enDigitWords, "reads the group separator")).toEqual(["1,500"]);
    expect(inputs(comma, "reads the group separator")).toEqual(["1.500"]);
  });

  test("expects a rejection only where neither the period nor the comma is a separator", () => {
    const rejects = (group: GroupSeparator): boolean => {
      const words: DigitWords = { ...enDigitWords, separators: { decimal: DecimalSeparator.comma, group } };
      const entry = buildEntries({ someDigitWords: words }, exampleOf)[0];
      return entry.tests.some(({ cases }) => cases.some(({ output }) => output === undefined));
    };
    expect(rejects(GroupSeparator.space)).toBe(true);
    expect(rejects(GroupSeparator.period)).toBe(false);
  });

  test("adds the letter case cases only for a dictionary that has one", () => {
    const named = (words: Record<string, DigitWords>): string[] => {
      const entry = buildEntries(words, exampleOf, [LetterCase.upper])[0];
      return entry.tests.map(({ name }) => name);
    };
    expect(named({ enDigitWords })).toContain("changes letter case");
    expect(named({ jpDigitWords })).not.toContain("changes letter case");
  });

  test("rejects a dictionary without a locale", () => {
    const words = { ...enDigitWords, locales: [] };
    expect(() => buildEntries({ emptyDigitWords: words }, exampleOf)).toThrow("emptyDigitWordsにロケールが無い");
  });

  test("rejects two dictionaries that share a locale", () => {
    const words = { ...jpDigitWords, name: "Clash", locales: ["en-digits"] };
    expect(() => buildEntries({ enDigitWords, clashDigitWords: words }, exampleOf)).toThrow(
      "ロケールが重複している: en-digits"
    );
  });

  test("rejects a label that would break the document heading", () => {
    const words = { ...enDigitWords, label: "English\nwords" };
    expect(() => buildEntries({ brokenDigitWords: words }, exampleOf)).toThrow(
      'brokenDigitWordsのlabelが1行になっていない: "English\\nwords"'
    );
  });

  test("rejects a dictionary that is not shaped like one", () => {
    expect(() => buildEntries({ brokenDigitWords: { name: "Broken" } }, exampleOf)).toThrow(
      "brokenDigitWordsがDigitWordsの形をしていない"
    );
  });

  test("rejects a dictionary without separators", () => {
    const words = { ...enDigitWords, separators: undefined };
    expect(() => buildEntries({ looseDigitWords: words }, exampleOf)).toThrow(
      "looseDigitWordsがDigitWordsの形をしていない"
    );
  });

  test("rejects a dictionary that does not cover every digit", () => {
    const words = { ...enDigitWords, digits: ["ze", "on", "tw"] };
    expect(() => buildEntries({ shortDigitWords: words }, exampleOf)).toThrow(
      "shortDigitWordsがDigitWordsの形をしていない"
    );
  });

  test("rejects a name that cannot be part of an identifier", () => {
    const words = { ...enDigitWords, name: "Brazilian Portuguese" };
    expect(() => buildEntries({ ptBrDigitWords: words }, exampleOf)).toThrow(
      'ptBrDigitWordsのnameが識別子として使えない: "Brazilian Portuguese"'
    );
  });

  test("rejects two dictionaries that would generate the same function", () => {
    expect(() => buildEntries({ aDigitWords: enDigitWords, bDigitWords: enDigitWords }, exampleOf)).toThrow(
      "nameが重複している: numToEnglishDigits"
    );
  });

  test("rejects an empty set of dictionaries", () => {
    expect(() => buildEntries({ siSymbols: {} }, exampleOf)).toThrow("辞書が1つも見つからない");
  });

  test("writes the decimal example with the separator of the dictionary", () => {
    const comma: DigitWords = {
      ...enDigitWords,
      separators: { decimal: DecimalSeparator.comma, group: GroupSeparator.period },
    };
    const entry = buildEntries({ commaDigitWords: comma }, exampleOf)[0];
    expect(entry.examples.map(({ input }) => input)).toEqual(["0123", "1,500", Infinity]);
  });

  test("builds every example by converting through the dictionary", () => {
    const entry = buildEntries({ enDigitWords }, exampleOf)[0];
    expect(entry.examples).toEqual([
      { input: "0123", output: "<English:0123>" },
      { input: "1.500", output: "<English:1.500>" },
      { input: Infinity, output: "<English:Infinity>" },
    ]);
  });
});

describe("renderTest", () => {
  const tests = [
    {
      name: "converts each digit",
      cases: [
        { input: "0123", output: "Ze-on-tw-th" },
        { input: 12, output: "on-tw" },
      ],
    },
    { name: "changes letter case", cases: [{ input: "12", letterCase: LetterCase.upper, output: "ON-TW" }] },
  ];

  test("says the file is generated", () => {
    expect(renderTest({ fn: "numToEnglishDigits", tests })).toContain(
      "// このファイルはnpm run generateからの自動生成のため手動編集禁止"
    );
  });

  test("describes the converter and names every test", () => {
    const source = renderTest({ fn: "numToEnglishDigits", tests });
    expect(source).toContain('describe("numToEnglishDigits", () => {');
    expect(source).toContain('test("converts each digit", () => {');
    expect(source).toContain('test("changes letter case", () => {');
  });

  test("writes the expected output of every case", () => {
    const source = renderTest({ fn: "numToEnglishDigits", tests });
    expect(source).toContain('expect(numToEnglishDigits("0123")).toBe("Ze-on-tw-th");');
    expect(source).toContain('expect(numToEnglishDigits(12)).toBe("on-tw");');
  });

  test("passes the letter case as a second argument", () => {
    expect(renderTest({ fn: "numToEnglishDigits", tests })).toContain(
      'expect(numToEnglishDigits("12", "upper")).toBe("ON-TW");'
    );
  });

  test("expects a throw when the case has no output", () => {
    const rejecting = [{ name: "rejects the period", cases: [{ input: "1.500" }] }];
    const source = renderTest({ fn: "numToFrenchDigits", tests: rejecting });
    expect(source).toContain('expect(() => numToFrenchDigits("1.500")).toThrow(InvalidInputError);');
    expect(source).toContain('import { InvalidInputError } from "../../errors";');
  });

  test("leaves out the error import when nothing throws", () => {
    expect(renderTest({ fn: "numToEnglishDigits", tests })).not.toContain("InvalidInputError");
  });
});

describe("findStale", () => {
  test("reports a generated file that no dictionary asks for", () => {
    expect(findStale(["numToGoneDigits.ts"], ["numToEnglishDigits.ts"])).toEqual(["numToGoneDigits.ts"]);
  });

  test("keeps a file that a dictionary asks for", () => {
    expect(findStale(["numToEnglishDigits.ts"], ["numToEnglishDigits.ts"])).toEqual([]);
  });

  test("reports a generated test that no dictionary asks for", () => {
    expect(findStale(["numToGoneDigits.test.ts"], ["numToEnglishDigits.test.ts"])).toEqual(["numToGoneDigits.test.ts"]);
  });

  test("keeps files that are not TypeScript", () => {
    expect(findStale(["README.md"], ["numToEnglishDigits.ts"])).toEqual([]);
  });
});

describe("main", () => {
  test("refuses an argument it does not know instead of writing", async () => {
    await withTempDir(async (dir) => {
      const { log, error } = io();
      expect(
        await main({ argv: ["--chek"], outDir: dir, docPath: join(dir, "digits.md"), load, formatSource, log, error })
      ).toBe(1);
      expect(await readdir(dir)).toEqual([]);
      expect(error).toHaveBeenCalledWith("知らない引数: --chek");
      expect(log).not.toHaveBeenCalled();
    });
  });

  test("writes a converter and a test per dictionary plus a barrel", async () => {
    await withTempDir(async (dir) => {
      const { log, error } = io();
      expect(
        await main({ argv: [], outDir: dir, docPath: join(dir, "digits.md"), load, formatSource, log, error })
      ).toBe(0);
      expect((await readdir(dir)).sort()).toEqual([
        "digits.md",
        "index.test.ts",
        "index.ts",
        "numToEnglishDigits.test.ts",
        "numToEnglishDigits.ts",
        "numToJapaneseDigits.test.ts",
        "numToJapaneseDigits.ts",
        "numToRomanDigits.test.ts",
        "numToRomanDigits.ts",
      ]);
      expect(log).toHaveBeenCalledWith("生成9件（3種類、うち大文字小文字あり2）");
      expect(error).not.toHaveBeenCalled();
    });
  });

  test("writes the document alongside the converters", async () => {
    await withTempDir(async (dir) => {
      await main({ argv: [], outDir: dir, docPath: join(dir, "digits.md"), load, formatSource, ...io() });
      const doc = await readFile(join(dir, "digits.md"), "utf8");
      expect(doc).toContain("## English words");
      expect(doc).toContain("## Japanese kanji");
    });
  });

  test("creates the directory of the document when it does not exist", async () => {
    await withTempDir(async (dir) => {
      const docPath = join(dir, "docs", "digits.md");
      expect(await main({ argv: [], outDir: dir, docPath, load, formatSource, ...io() })).toBe(0);
      expect(await readFile(docPath, "utf8")).toContain("## English words");
    });
  });

  test("fails the check when only the document is out of date", async () => {
    await withTempDir(async (dir) => {
      const docPath = join(dir, "digits.md");
      await main({ argv: [], outDir: dir, docPath, load, formatSource, ...io() });
      await writeFile(docPath, "手で書き換えた\n");
      const { log, error } = io();
      expect(await main({ argv: ["--check"], outDir: dir, docPath, load, formatSource, log, error })).toBe(1);
      expect(error).toHaveBeenCalledWith(`辞書と食い違っている: ${docPath}`);
      // --checkは書き換えない
      expect(await readFile(docPath, "utf8")).toBe("手で書き換えた\n");
    });
  });

  test("reports nothing moved when the files are already up to date", async () => {
    await withTempDir(async (dir) => {
      await main({ argv: [], outDir: dir, docPath: join(dir, "digits.md"), load, formatSource, ...io() });
      const { log } = io();
      expect(
        await main({
          argv: [],
          outDir: dir,
          docPath: join(dir, "digits.md"),
          load,
          formatSource,
          log,
          error: jest.fn(),
        })
      ).toBe(0);
      expect(log).toHaveBeenCalledWith("変更なし（3種類、うち大文字小文字あり2）");
    });
  });

  test("removes a converter whose dictionary is gone", async () => {
    await withTempDir(async (dir) => {
      await main({ argv: [], outDir: dir, docPath: join(dir, "digits.md"), load, formatSource, ...io() });
      await writeFile(join(dir, "numToGoneDigits.ts"), "export const numToGoneDigits = () => '';\n");
      const { log } = io();
      expect(
        await main({
          argv: [],
          outDir: dir,
          docPath: join(dir, "digits.md"),
          load,
          formatSource,
          log,
          error: jest.fn(),
        })
      ).toBe(0);
      expect(await readdir(dir)).not.toContain("numToGoneDigits.ts");
      // 削除だけでも件数に数える
      expect(log).toHaveBeenCalledWith("生成1件（3種類、うち大文字小文字あり2）");
    });
  });

  test("leaves hand-written tests alone", async () => {
    await withTempDir(async (dir) => {
      await main({ argv: [], outDir: dir, docPath: join(dir, "digits.md"), load, formatSource, ...io() });
      await writeFile(join(dir, "numToEnglishDigits.test.ts"), "test.skip('x', () => {});\n");
      await main({ argv: [], outDir: dir, docPath: join(dir, "digits.md"), load, formatSource, ...io() });
      expect(await readdir(dir)).toContain("numToEnglishDigits.test.ts");
    });
  });

  test("accepts a directory that does not exist yet", async () => {
    await withTempDir(async (dir) => {
      const nested = join(dir, "digits");
      expect(
        await main({ argv: [], outDir: nested, docPath: join(nested, "digits.md"), load, formatSource, ...io() })
      ).toBe(0);
      expect(await readdir(nested)).toContain("index.ts");
    });
  });

  test("passes the check when the files match the dictionaries", async () => {
    await withTempDir(async (dir) => {
      await main({ argv: [], outDir: dir, docPath: join(dir, "digits.md"), load, formatSource, ...io() });
      const { log, error } = io();
      expect(
        await main({ argv: ["--check"], outDir: dir, docPath: join(dir, "digits.md"), load, formatSource, log, error })
      ).toBe(0);
      expect(log).toHaveBeenCalledWith(expect.stringContaining("最新"));
      expect(error).not.toHaveBeenCalled();
    });
  });

  test("fails the check when a file no longer matches its dictionary", async () => {
    await withTempDir(async (dir) => {
      await main({ argv: [], outDir: dir, docPath: join(dir, "digits.md"), load, formatSource, ...io() });
      await writeFile(join(dir, "numToEnglishDigits.ts"), "手で書き換えた\n");
      const { log, error } = io();
      expect(
        await main({ argv: ["--check"], outDir: dir, docPath: join(dir, "digits.md"), load, formatSource, log, error })
      ).toBe(1);
      expect(error).toHaveBeenCalledWith(`辞書と食い違っている: ${join(dir, "numToEnglishDigits.ts")}`);
      expect(error).toHaveBeenCalledWith("npm run generateを実行すること");
      expect(error).not.toHaveBeenCalledWith(expect.stringContaining("辞書に無いのに残っている"));
      // --checkは書き換えない
      expect(await readFile(join(dir, "numToEnglishDigits.ts"), "utf8")).toBe("手で書き換えた\n");
    });
  });

  test("fails the check when a converter is left over", async () => {
    await withTempDir(async (dir) => {
      await main({ argv: [], outDir: dir, docPath: join(dir, "digits.md"), load, formatSource, ...io() });
      await writeFile(join(dir, "numToGoneDigits.ts"), "export const numToGoneDigits = () => '';\n");
      const { log, error } = io();
      expect(
        await main({ argv: ["--check"], outDir: dir, docPath: join(dir, "digits.md"), load, formatSource, log, error })
      ).toBe(1);
      expect(error).toHaveBeenCalledWith(`辞書に無いのに残っている: ${join(dir, "numToGoneDigits.ts")}`);
      expect(error).not.toHaveBeenCalledWith(expect.stringContaining("辞書と食い違っている"));
      // --checkは消さない
      expect(await readdir(dir)).toContain("numToGoneDigits.ts");
    });
  });

  test("fails the check when a file is stale and another is left over", async () => {
    await withTempDir(async (dir) => {
      await main({ argv: [], outDir: dir, docPath: join(dir, "digits.md"), load, formatSource, ...io() });
      await writeFile(join(dir, "numToEnglishDigits.ts"), "手で書き換えた\n");
      await writeFile(join(dir, "numToGoneDigits.ts"), "export const numToGoneDigits = () => '';\n");
      const { error } = io();
      expect(
        await main({
          argv: ["--check"],
          outDir: dir,
          docPath: join(dir, "digits.md"),
          load,
          formatSource,
          log: jest.fn(),
          error,
        })
      ).toBe(1);
      expect(error).toHaveBeenCalledWith(expect.stringContaining("辞書と食い違っている"));
      expect(error).toHaveBeenCalledWith(expect.stringContaining("辞書に無いのに残っている"));
    });
  });

  test("writes every converter and the barrel through the formatter", async () => {
    await withTempDir(async (dir) => {
      await main({ argv: [], outDir: dir, docPath: join(dir, "digits.md"), load, formatSource, ...io() });

      expect(await readFile(join(dir, "numToEnglishDigits.ts"), "utf8")).toBe(
        `// このファイルはnpm run generateからの自動生成のため手動編集禁止
import type { LetterCase } from "../../constants";
import { enDigitWords } from "../../dictionaries";
import { replaceDigits } from "../../utils";

/**
 * Converts a number to English words digit by digit.
 * @param number - The number to convert
 * @param letterCase - Overrides the default letter case of the language
 * @returns English words representing each digit
 * @example
 * numToEnglishDigits("0123") // "<English:0123>"
 * numToEnglishDigits("1.500") // "<English:1.500>"
 * numToEnglishDigits(Infinity) // "<English:Infinity>"
 */
export const numToEnglishDigits = (number: number | string, letterCase?: LetterCase): string =>
  replaceDigits(number, enDigitWords, letterCase);
// formatted
`
      );

      // 先頭以外も辞書ごとに書き分けられていること
      const japanese = await readFile(join(dir, "numToJapaneseDigits.ts"), "utf8");
      expect(japanese).toContain("replaceDigits(number, jpDigitWords)");
      expect(japanese).not.toContain("letterCase");
      expect(japanese).not.toContain("LetterCase");
      expect(japanese).toContain("// formatted");

      expect(await readFile(join(dir, "index.ts"), "utf8")).toBe(
        `// このファイルはnpm run generateからの自動生成のため手動編集禁止
export { numToEnglishDigits } from "./numToEnglishDigits";
export { numToJapaneseDigits } from "./numToJapaneseDigits";
export { numToRomanDigits } from "./numToRomanDigits";
// formatted
`
      );
    });
  });
});

describe("prettify", () => {
  test("formats with the repository's Prettier settings", async () => {
    const formatted = await prettify("src/converters/digits/x.ts", "export  const  a=1\n");
    expect(formatted).toBe("export const a = 1;\n");
  });
});
