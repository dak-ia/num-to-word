import type { DecimalSeparator, GroupSeparator, LetterCase } from "../src/constants/index.ts";
import type { DigitWords, Separators } from "../src/types/index.ts";
import { dirname, join } from "node:path";
import { mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";

const NOTICE = "このファイルはnpm run generateからの自動生成のため手動編集禁止";
const HEADER = `// ${NOTICE}`;

export type DigitExample = {
  input: number | string;
  output: string;
};

export type DigitCase = {
  input: number | string;
  letterCase?: LetterCase;
  // 例外を期待するケースは出力を持たない
  output?: string;
};

export type DigitTest = {
  name: string;
  cases: readonly DigitCase[];
};

export type DigitEntry = {
  fn: string;
  wordsExport: string;
  label: string;
  letterCase?: LetterCase;
  locales: readonly string[];
  separators: Separators;
  examples: readonly DigitExample[];
  tests: readonly DigitTest[];
};

export type SourceModule = {
  replaceDigits: (_number: number | string, _words: DigitWords, _letterCase?: LetterCase) => string;
  LetterCase: Record<string, LetterCase>;
  [key: string]: unknown;
};

export type FormatSource = (_path: string, _text: string) => Promise<string>;

const firstImportMember = (line: string): string => line.slice(line.indexOf("{") + 1, line.indexOf("}")).trim();

// 生成物もlintを通すので、sort-importsと同じく{}内の先頭の名前で並べる
const sortImports = (imports: string[]): string[] =>
  imports.sort((a, b) => (firstImportMember(a) < firstImportMember(b) ? -1 : 1));

const SEPARATOR_CHARACTER: Record<DecimalSeparator, string> = { period: ".", comma: "," };

const groupCharacter = (group: GroupSeparator): string => (group === "space" ? " " : SEPARATOR_CHARACTER[group]);

// 入力を@exampleの行と結果の計算で別々に書くと、食い違っても生成物としては整合してしまう
const exampleInputs = ({ separators }: DigitWords): readonly (number | string)[] => [
  "0123",
  `1${SEPARATOR_CHARACTER[separators.decimal]}500`,
  Infinity,
];

// JSON.stringifyはInfinityをnullにするので、数値は文字列化だけにする
const literal = (value: number | string): string => (typeof value === "string" ? JSON.stringify(value) : String(value));

export const renderConverter = ({
  fn,
  wordsExport,
  label,
  letterCase,
  examples,
}: Pick<DigitEntry, "fn" | "wordsExport" | "label" | "letterCase" | "examples">): string => {
  const hasLetterCase = letterCase !== undefined;
  // 大文字小文字を持たない言語に引数を残すと、undefinedしか入らない選択肢が公開の型に出てしまう
  const letterCaseParam = hasLetterCase ? ", letterCase?: LetterCase" : "";
  const letterCaseArg = hasLetterCase ? ", letterCase" : "";
  const letterCaseDoc = hasLetterCase
    ? "\n * @param letterCase - Overrides the default letter case of the language"
    : "";
  const imports = [
    `import { ${wordsExport} } from "../../dictionaries";`,
    'import { replaceDigits } from "../../utils";',
  ];
  if (hasLetterCase) imports.push('import type { LetterCase } from "../../constants";');
  sortImports(imports);
  // 例が空のときにタグだけ残ると壊れたJSDocになる
  const exampleLines = examples.map(
    ({ input, output }) => `\n * ${fn}(${literal(input)}) // ${JSON.stringify(output)}`
  );
  const exampleDoc = exampleLines.length === 0 ? "" : `\n * @example${exampleLines.join("")}`;
  return `${HEADER}
${imports.join("\n")}

/**
 * Converts a number to ${label} digit by digit.
 * @param number - The number to convert${letterCaseDoc}
 * @returns ${label} representing each digit${exampleDoc}
 */
export const ${fn} = (number: number | string${letterCaseParam}): string =>
  replaceDigits(number, ${wordsExport}${letterCaseArg});
`;
};

const renderCase = (fn: string, { input, letterCase, output }: DigitCase): string => {
  const args = letterCase === undefined ? literal(input) : `${literal(input)}, ${JSON.stringify(letterCase)}`;
  return output === undefined
    ? `  expect(() => ${fn}(${args})).toThrow(InvalidInputError);`
    : `  expect(${fn}(${args})).toBe(${JSON.stringify(output)});`;
};

export const renderTest = ({ fn, tests }: Pick<DigitEntry, "fn" | "tests">): string => {
  const throwsSomewhere = tests.some(({ cases }) => cases.some(({ output }) => output === undefined));
  const imports = [`import { ${fn} } from "./${fn}";`];
  if (throwsSomewhere) imports.push('import { InvalidInputError } from "../../errors";');
  sortImports(imports);
  const blocks = tests.map(
    ({ name, cases }) =>
      `test(${JSON.stringify(name)}, () => {\n${cases.map((digitCase) => renderCase(fn, digitCase)).join("\n")}\n});`
  );
  return `${HEADER}
${imports.join("\n")}

describe(${JSON.stringify(fn)}, () => {
${blocks.join("\n\n")}
});
`;
};

// 関数名順だと大字がChineseとDutchの間に来る。labelだけで並べると大字が漢数字より前に出る
const byDocOrder = (a: DigitEntry, b: DigitEntry): number => {
  const language = ({ label }: DigitEntry): string => label.split(" ")[0];
  const subtags = ({ locales }: DigitEntry): number => locales[0].split("-").length;
  if (language(a) !== language(b)) return language(a) < language(b) ? -1 : 1;
  if (subtags(a) !== subtags(b)) return subtags(a) - subtags(b);
  return a.locales[0] < b.locales[0] ? -1 : 1;
};

const separatorText = (separator: GroupSeparator): string =>
  separator === "space" ? "空白 / space" : `\`${SEPARATOR_CHARACTER[separator]}\``;

type DigitTestPlan = DigitTest & { throws?: boolean };

// 入力だけを並べ、期待値は辞書を通した結果で埋める
const testInputs = ({ separators, letterCase }: DigitWords, letterCases: readonly LetterCase[]): DigitTestPlan[] => {
  const decimal = SEPARATOR_CHARACTER[separators.decimal];
  const group = groupCharacter(separators.group);
  const tests: DigitTestPlan[] = [
    { name: "converts each digit", cases: [{ input: "0123456789" }, { input: 123 }, { input: "0" }] },
    { name: "keeps trailing zeros in the decimal part", cases: [{ input: `1${decimal}50` }] },
    { name: "reads the group separator", cases: [{ input: `1${group}500` }] },
    { name: "converts negative numbers", cases: [{ input: "-12" }, { input: "-0" }] },
    { name: "converts infinity and negative infinity", cases: [{ input: Infinity }, { input: -Infinity }] },
  ];
  // ピリオドとカンマの片方しか使わない言語だけ、もう片方が誤りになる
  if (separators.group === "space") {
    tests.push({
      name: "rejects a character that is neither the decimal point nor the group separator",
      throws: true,
      cases: [{ input: "1.500" }],
    });
  }
  if (letterCase !== undefined) {
    tests.push({
      name: "changes letter case",
      cases: letterCases.flatMap((value) => [
        { input: "12", letterCase: value },
        { input: -Infinity, letterCase: value },
      ]),
    });
  }
  return tests;
};

const renderDocSection = (
  { fn, label, letterCase, locales, separators, examples }: DigitEntry,
  letterCases: readonly string[]
): string => {
  const calls = examples.map(({ input, output }) => `${fn}(${literal(input)}); // ${JSON.stringify(output)}`);
  if (calls.length > 0) {
    const [{ input, output }] = examples;
    calls.push(`numToWord(${JSON.stringify(locales[0])}, ${literal(input)}); // ${JSON.stringify(output)}`);
  }
  const code = calls.length === 0 ? "" : `\n\`\`\`js\n${calls.join("\n")}\n\`\`\`\n`;
  const cases =
    letterCase === undefined
      ? "非対応 / Not supported"
      : letterCases.map((value) => `\`${value}\`${value === letterCase ? "（既定）" : ""}`).join(", ");
  return `## ${label}
${code}
- 小数点 / Decimal point: ${separatorText(separators.decimal)}
- 桁区切り / Group separator: ${separatorText(separators.group)}
- ロケール / Locale: ${locales.map((locale) => `\`${locale}\``).join(", ")}
- 大文字小文字 / Letter case: ${cases}
`;
};

export const renderDigitsDoc = (entries: readonly DigitEntry[], letterCases: readonly string[]): string =>
  `<!-- ${NOTICE} -->

# 1桁ずつの変換（棒読み） / Digit-by-digit Conversion

\`@dak-ia/num-to-word\`で数字を1桁ずつ各言語の語に変換した一覧です。使い方は[README](https://github.com/dak-ia/num-to-word#readme)を参照してください。

${[...entries]
  .sort(byDocOrder)
  .map((entry) => renderDocSection(entry, letterCases))
  .join("\n")}`;

export const renderBarrel = (entries: readonly Pick<DigitEntry, "fn">[]): string =>
  `${HEADER}\n${entries.map(({ fn }) => `export { ${fn} } from "./${fn}";`).join("\n")}\n`;

export const renderBarrelTest = (entries: readonly Pick<DigitEntry, "fn">[]): string =>
  `${HEADER}
import * as digits from "./index";

describe("digits", () => {
test("re-exports every generated converter", () => {
expect(Object.keys(digits).sort()).toEqual([
${entries.map(({ fn }) => `${JSON.stringify(fn)},`).join("\n")}
]);
});
});
`;

// nameは関数名とファイル名の両方になるので、識別子として使えない字が混ざると生成物が壊れる
const NAME_PATTERN = /^[A-Z][A-Za-z0-9]*$/;

// 語が足りなくてもjoinがundefinedを空文字にするので、個数まで見ないと@exampleだけがサイレントに壊れる
const isDigitWords = (value: unknown): value is DigitWords =>
  typeof value === "object" &&
  value !== null &&
  Array.isArray((value as DigitWords).digits) &&
  (value as DigitWords).digits.length === 10 &&
  Array.isArray((value as DigitWords).locales) &&
  typeof (value as DigitWords).separators?.decimal === "string";

export const buildEntries = (
  dictionaries: Record<string, unknown>,
  exampleOf: (_number: number | string, _words: DigitWords, _letterCase?: LetterCase) => string,
  letterCases: readonly LetterCase[] = []
): DigitEntry[] => {
  const entries = Object.entries(dictionaries)
    .filter(([wordsExport]) => wordsExport.endsWith("DigitWords"))
    .map(([wordsExport, dictionary]) => {
      if (!isDigitWords(dictionary)) {
        throw new Error(`${wordsExport}がDigitWordsの形をしていない`);
      }
      if (!NAME_PATTERN.test(dictionary.name)) {
        throw new Error(`${wordsExport}のnameが識別子として使えない: ${JSON.stringify(dictionary.name)}`);
      }
      const label = dictionary.label ?? `${dictionary.name} words`;
      // labelは文書の見出しになるので、改行が混ざると節が割れる
      if (label.includes("\n")) {
        throw new Error(`${wordsExport}のlabelが1行になっていない: ${JSON.stringify(label)}`);
      }
      if (dictionary.locales.length === 0) {
        throw new Error(`${wordsExport}にロケールが無い`);
      }
      return {
        fn: `numTo${dictionary.name}Digits`,
        wordsExport,
        label,
        letterCase: dictionary.letterCase,
        locales: dictionary.locales,
        separators: dictionary.separators,
        examples: exampleInputs(dictionary).map((input) => ({ input, output: exampleOf(input, dictionary) })),
        tests: testInputs(dictionary, letterCases).map(({ name, throws, cases }) => ({
          name,
          cases: cases.map((digitCase) =>
            throws === true
              ? digitCase
              : { ...digitCase, output: exampleOf(digitCase.input, dictionary, digitCase.letterCase) }
          ),
        })),
      };
    })
    .sort((a, b) => (a.fn < b.fn ? -1 : 1));

  if (entries.length === 0) {
    throw new Error("辞書が1つも見つからない");
  }
  const duplicated = entries.find((entry, index) => entries[index + 1]?.fn === entry.fn);
  if (duplicated !== undefined) {
    throw new Error(`nameが重複している: ${duplicated.fn}`);
  }
  // 同じロケールを2つの辞書が名乗ると、localeMapの後ろ側が引かれなくなる
  const locales = entries.flatMap(({ locales: own }) => own);
  const sharedLocale = locales.find((locale, index) => locales.indexOf(locale) !== index);
  if (sharedLocale !== undefined) {
    throw new Error(`ロケールが重複している: ${sharedLocale}`);
  }
  return entries;
};

export const findStale = (existingNames: readonly string[], wantedNames: readonly string[]): string[] =>
  existingNames.filter((name) => name.endsWith(".ts") && !wantedNames.includes(name));

export const prettify: FormatSource = async (path, text) => {
  const { format, resolveConfig } = await import("prettier");
  return format(text, { ...(await resolveConfig(path)), filepath: path });
};

export type MainOptions = {
  argv: readonly string[];
  outDir: string;
  docPath: string;
  load: () => Promise<SourceModule>;
  formatSource: FormatSource;
  log: (_message: string) => void;
  error: (_message: string) => void;
};

/**
 * 辞書から変換関数を生成して書き出す
 * @returns 終了コード
 */
export const main = async ({ argv, outDir, docPath, load, formatSource, log, error }: MainOptions): Promise<number> => {
  const unknown = argv.filter((arg) => arg !== "--check");
  if (unknown.length > 0) {
    error(`知らない引数: ${unknown.join(", ")}`);
    return 1;
  }
  const { replaceDigits, LetterCase: letterCases, ...dictionaries } = await load();
  const cases = Object.values(letterCases);
  const entries = buildEntries(dictionaries, replaceDigits, cases);

  const files = new Map<string, string>();
  for (const entry of entries) {
    const path = join(outDir, `${entry.fn}.ts`);
    files.set(path, await formatSource(path, renderConverter(entry)));
    const testPath = join(outDir, `${entry.fn}.test.ts`);
    files.set(testPath, await formatSource(testPath, renderTest(entry)));
  }
  const barrelPath = join(outDir, "index.ts");
  files.set(barrelPath, await formatSource(barrelPath, renderBarrel(entries)));
  const barrelTestPath = join(outDir, "index.test.ts");
  files.set(barrelTestPath, await formatSource(barrelTestPath, renderBarrelTest(entries)));
  files.set(docPath, await formatSource(docPath, renderDigitsDoc(entries, cases)));

  const wanted = [...entries.flatMap(({ fn }) => [`${fn}.ts`, `${fn}.test.ts`]), "index.ts", "index.test.ts"];
  const stale = findStale(await readdir(outDir).catch(() => []), wanted);

  const changed: string[] = [];
  for (const [path, text] of files) {
    if ((await readFile(path, "utf8").catch(() => null)) !== text) changed.push(path);
  }

  const summary = `${entries.length}種類、うち大文字小文字あり${entries.filter((e) => e.letterCase !== undefined).length}`;

  if (argv.includes("--check")) {
    if (changed.length > 0 || stale.length > 0) {
      for (const path of changed) error(`辞書と食い違っている: ${path}`);
      for (const name of stale) error(`辞書に無いのに残っている: ${join(outDir, name)}`);
      error("npm run generateを実行すること");
      return 1;
    }
    log(`最新（${summary}）`);
    return 0;
  }

  for (const [path, text] of files) {
    if (!changed.includes(path)) continue;
    await mkdir(dirname(path), { recursive: true });
    await writeFile(path, text);
  }
  for (const name of stale) await rm(join(outDir, name));
  const moved = changed.length + stale.length;
  log(`${moved === 0 ? "変更なし" : `生成${moved}件`}（${summary}）`);
  return 0;
};
