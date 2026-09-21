# num-to-word

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org/)
[![Node.js for development](<https://img.shields.io/badge/node%20(dev)-%3E%3D22.18.0-brightgreen.svg>)](https://nodejs.org/)
[![Coverage](https://img.shields.io/badge/dynamic/json?url=https://gist.githubusercontent.com/dak-ia/1bf4a4df60ed549dfd9a42b24c72045e/raw/num-to-word-coverage.json&label=coverage&query=$.coverage&suffix=%25&color=brightgreen)](https://github.com/dak-ia/num-to-word/actions/workflows/jest-check.yml)

数字を各言語の単語に変換します。1桁ずつの変換（棒読み）は多くの言語に対応していて、数としての変換は今のところ英語と日本語だけです。ローマ数字・大字・SI接頭語にも変換できます。

Convert numbers to words. Digit-by-digit conversion covers many languages, while reading a number as a whole is currently English and Japanese only. Roman numerals, Japanese daiji and SI prefixes are supported too.

---

## 📖 目次 / Table of Contents

- [📦 インストール / Installation](#インストール--installation)
- [🚀 クイックスタート / Quick Start](#クイックスタート--quick-start)
- [📚 APIリファレンス / API Reference](#apiリファレンス--api-reference)
- [📝 入力形式 / Input Format](#入力形式--input-format)
- [💻 TypeScriptサポート / TypeScript Support](#typescriptサポート--typescript-support)
- [🎨 Examples](#examples)
- [🛠️ 開発 / Development](#開発--development)

---

## 📦 インストール / Installation

最新リリースは[Releasesページ](https://github.com/dak-ia/num-to-word/releases)からダウンロードできます。

Download the latest release from the [Releases page](https://github.com/dak-ia/num-to-word/releases).

```bash
# npm (scoped package)
npm install @dak-ia/num-to-word
```

## 🚀 クイックスタート / Quick Start

### Node.js (CommonJS)

```javascript
const { numToEnglish, numToJapanese, numToDaiji, numToSi, numToWord } = require("@dak-ia/num-to-word");

console.log(numToEnglish(123456.789));
// → "One hundred twenty-three thousand four hundred fifty-six point seven eight nine"
```

### Node.js (ESM)

```javascript
import { numToEnglish, numToJapanese, numToDaiji, numToSi, numToWord } from "@dak-ia/num-to-word";

console.log(numToEnglish(123456.789));
// → "One hundred twenty-three thousand four hundred fifty-six point seven eight nine"
```

### 🌐 CDN経由での利用 / Use via CDN

jsDelivrやunpkgのCDNから直接ブラウザで利用できます。

You can use the library directly in the browser via jsDelivr or unpkg CDN.

```html
<script src="https://cdn.jsdelivr.net/npm/@dak-ia/num-to-word/dist/index.umd.js"></script>
<script>
  // グローバル変数NumToWord経由で利用できます
  // Use via global variable NumToWord
  const ntw = NumToWord;
  console.log(ntw.numToWord("en", 123)); // "One hundred twenty-three"
  console.log(ntw.numToWord("jp", 123)); // "百二十三"
  console.log(ntw.numToWord("si", 1234)); // "1.234K"
</script>
```

unpkgも同様に利用可能です：

You can also use unpkg:

```html
<script src="https://unpkg.com/@dak-ia/num-to-word/dist/index.umd.js"></script>
```

---

## 📚 APIリファレンス / API Reference

### `numToEnglish(number)` / `numToJapanese(number)` / `numToDaiji(number)` / `numToSi(number)`

数を読み方どおりに変換します。桁の単位語（hundred、万など）やSI接頭語を使うため、変換できる桁数に上限があります。

Convert a number the way it is read as a whole. They use scale words such as "hundred" or 万, or SI prefixes, so the number of digits is capped.

- **引数 / Parameters**: `number` (number | string) - 変換する数字 / The number to convert
- **戻り値 / Returns**: string - 数としての読み / The number as it is read
- **負の数 / Negative numbers**: サポート / Supported
- **例 / Example**:
  ```javascript
  numToEnglish(123); // "One hundred twenty-three"
  numToJapanese(123); // "百二十三"
  numToDaiji(123); // "壱陌弐拾参"
  numToSi(1234); // "1.234K"
  ```

関数ごとの上限や詳細は[docs/places.md](https://github.com/dak-ia/num-to-word/blob/main/docs/places.md)にまとめています。

The upper limit and the details of each function are in [docs/places.md](https://github.com/dak-ia/num-to-word/blob/main/docs/places.md).

### `numTo***Digits(number, letterCase?)`

数字を1桁ずつ変換します（いわゆる棒読み）。IDなどのように、桁をそのまま表現したい場合に使います。多くの言語に対応し、ローマ数字と大字も同じ形で使えます。

Convert a number digit by digit. Use these when the digits themselves matter, such as IDs. Many languages are supported, along with Roman numerals and Japanese daiji.

- **引数 / Parameters**:
  - `number` (number | string) - 変換する数字 / The number to convert
  - `letterCase` (`"capitalize"` | `"upper"` | `"lower"`) - 大文字小文字の指定 / Letter case
- **戻り値 / Returns**: string - 1桁ずつの読み（棒読み） / Digit-by-digit representation
- **範囲 / Range**: 上限なし（桁の単位語を使わないため）/ No limit, because no scale words are used
- **例 / Example**:
  ```javascript
  numToEnglishDigits("0123"); // "Zero one two three"
  numToJapaneseDigits("0123"); // "〇一二三"
  numToEnglishDigits("1.50"); // "One point five zero"
  numToEnglishDigits(-12); // "Minus one two"
  numToEnglishDigits("12", "upper"); // "ONE TWO"
  ```

対応する変換の関数名・ロケール・変換例は[docs/digits.md](https://github.com/dak-ia/num-to-word/blob/main/docs/digits.md)にまとめています。

The full list, with function names, locales and examples, is in [docs/digits.md](https://github.com/dak-ia/num-to-word/blob/main/docs/digits.md).

### `numToWord(locale, number, letterCase?)`

指定したロケールで数字を変換します。

Convert a number using the specified locale.

- **引数 / Parameters**:
  - `locale` (string) - ロケール識別子 / Locale identifier: `"si"`, `"en"`, `"english"`, `"jp"`, `"japanese"`, `"kanji"`, `"jpdaiji"`, `"daiji"`
    - 末尾に`-digits`を付けると1桁ずつ変換します（`"en-digits"`, `"jp-digits"`, `"daiji-digits"`など）。`"si"`は1桁ずつの変換がありません / Append `-digits` to convert digit by digit. Not available for `"si"`
    - 1桁ずつの変換（棒読み）に使えるロケールの一覧は[docs/digits.md](https://github.com/dak-ia/num-to-word/blob/main/docs/digits.md) / The full list of digit-by-digit locales is in [docs/digits.md](https://github.com/dak-ia/num-to-word/blob/main/docs/digits.md)
    - ロケールは`locales`としてexportしています / The locales are exported as `locales`
  - `number` (number | string) - 変換する数字 / The number to convert
  - `letterCase` (`"capitalize"` | `"upper"` | `"lower"`) - 大文字小文字の指定 / Letter case
- **戻り値 / Returns**: string - 指定したロケールでの読み / Localized representation
- **負の数 / Negative numbers**: 全ロケールでサポート / Supported in all locales
- **例 / Example**:
  ```javascript
  numToWord("en", 123); // "One hundred twenty-three"
  numToWord("jp", 123); // "百二十三"
  numToWord("si", 123456); // "123.456K"
  numToWord("en", -123); // "Minus one hundred twenty-three"
  numToWord("en-digits", "0123"); // "Zero one two three"
  numToWord("jp-digits", "0123"); // "〇一二三"
  numToWord("en-digits", "0123", "upper"); // "ZERO ONE TWO THREE"
  ```

## 📝 入力形式 / Input Format

### 変換ルール / Conversion Policy

- **言語への変換 / To words**: 数としての読み方に変換します。整数部の先頭のゼロや小数部の末尾のゼロは値に影響しないため取り除きます。 / converted as a numeral. Leading zeros in the integer part and trailing zeros in the decimal part are removed because they do not affect the value.
- **単位への変換 / To units**: SI接頭語として適切な形式に整えます。末尾のゼロやゼロの符号など、表記として不要なものは取り除きます。 / formatted as a proper SI prefix notation. Anything unnecessary for the notation, such as trailing zeros and the sign of zero, is removed.

```javascript
numToEnglish("0123.500"); // "One hundred twenty-three point five"
numToJapanese("0123.500"); // "百二十三・五"
numToSi("0123.500"); // "123.5"
```

### サポートされている入力タイプ / Supported Input Types

- **number型 / Number type**: `numToEnglish(123)`
- **string型（推奨）/ String type (recommended)**: `numToEnglish("123")`
- **指数表記 / Exponential notation**: `numToEnglish("1.23e5")` → `"One hundred twenty-three thousand"`
- **全角数字 / Full-width numbers**: `numToEnglish("123")` （自動変換 / converted automatically）
- **区切り文字 / Separators**: `numToEnglish("123,456,789")`, `numToGermanDigits("1.234,5")` （桁区切りは自動的に削除。小数点と桁区切りに使う文字は言語ごと / group separators are removed automatically, and which characters are used depends on the language）
- **Infinity / 無限大**: `numToEnglish(Infinity)` → `"Infinity"`, `numToJapanese(Infinity)` → `"無限"`

### 指数表記について / About Exponential Notation

指数表記（例: `1.23e5`、`5.67e-3`）がサポートされています。入力時に自動で展開します。

Exponential notation (e.g., `1.23e5`, `5.67e-3`) is supported and automatically expanded.

```javascript
numToEnglish("1.23e5"); // "One hundred twenty-three thousand"
numToEnglish("5.67e-3"); // "Zero point zero zero five six seven"
numToJapanese("1.5e4"); // "一万五千"
```

## 💻 TypeScriptサポート / TypeScript Support

TypeScript型定義が含まれています。

TypeScript definitions are included.

```typescript
import { numToEnglish } from "@dak-ia/num-to-word";

const result: string = numToEnglish(123);
```

## 🎨 Examples

[デモページ](https://dak-ia.github.io/num-to-word/)で動作を試せます。同じものがリポジトリにも含まれているので、手元で開くこともできます。

Try it on the [demo page](https://dak-ia.github.io/num-to-word/). The same page is included in the repository, so you can also open it locally.

```bash
# 開発サーバーで、手元のコードを試す / Try the local code with the dev server
npm run dev
# http://localhost:5173/
```

## 🛠️ 開発 / Development

### ビルド / Build

```bash
npm run build         # ビルドを実行 / Build the project
```

### テストの実行 / Running Tests

```bash
npm test              # 全テストを実行 / Run all tests
npm run test:watch    # ウォッチモードでテストを実行 / Run tests in watch mode
npm run test:coverage # カバレッジレポート付きでテストを実行 / Run tests with coverage report
```

### 1桁ずつの変換（棒読み）の生成 / Generating the Digit Converters

`src/converters/digits/`以下の`numTo***Digits`と一覧の`docs/digits.md`は`src/dictionaries/`の辞書から自動生成しています。

The `numTo***Digits` functions under `src/converters/digits/` and the list in `docs/digits.md` are generated from the dictionaries in `src/dictionaries/`.

```bash
npm run generate       # 辞書から1桁ずつの変換を生成 / Generate the converters from the dictionaries
npm run generate:check # 生成物が辞書と一致するか確認 / Check the generated files match the dictionaries
```

---

## ライセンス / License

MIT License

## 作者 / Author

[dak-ia](https://github.com/dak-ia)

## リポジトリ / Repository

https://github.com/dak-ia/num-to-word
