# num-to-word

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org/)
[![Coverage](https://img.shields.io/badge/dynamic/json?url=https://gist.githubusercontent.com/dak-ia/1bf4a4df60ed549dfd9a42b24c72045e/raw/num-to-word-coverage.json&label=coverage&query=$.coverage&suffix=%25&color=brightgreen)](https://github.com/dak-ia/num-to-word/actions/workflows/jest-check.yml)

数字を各言語の単語に変換します（英語、日本語、SI 接頭語）。

Convert numbers to words in multiple languages (English, Japanese, SI prefixes).

---

## 📖 目次 / Table of Contents

- [📦 インストール / Installation](#インストール--installation)
- [🚀 クイックスタート / Quick Start](#クイックスタート--quick-start)
- [📚 API リファレンス / API Reference](#apiリファレンス--api-reference)
- [📝 入力形式 / Input Format](#入力形式--input-format)
- [💻 TypeScript サポート / TypeScript Support](#typescript-サポート--typescript-support)
- [🎨 Examples](#examples)
- [🛠️ 開発 / Development](#開発--development)

---

## 📦 インストール / Installation

最新リリースは [Releases ページ](https://github.com/dak-ia/num-to-word/releases) からダウンロードできます。

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

### `numToEnglish(number)`

数字を英語の単語に変換します。

Convert a number to English words.

- **引数 / Parameters**: `number` (number | string) - 変換する数字 / The number to convert
- **戻り値 / Returns**: string - 英語表現 / English word representation
- **範囲 / Range**: 10^306 (Uncentillion) まで / Up to 10^306 (Uncentillion)
- **負の数 / Negative numbers**: サポート / Supported
- **例 / Example**:
  ```javascript
  numToEnglish(123); // "One hundred twenty-three"
  numToEnglish(123.45); // "One hundred twenty-three point four five"
  numToEnglish("1234567"); // "One million two hundred thirty-four thousand five hundred sixty-seven"
  numToEnglish(-123); // "Minus one hundred twenty-three"
  ```

### `numToJapanese(number)`

数字を日本語の漢数字に変換します。

Convert a number to Japanese Kanji numerals.

- **引数 / Parameters**: `number` (number | string) - 変換する数字 / The number to convert
- **戻り値 / Returns**: string - 日本語（漢数字）表現 / Japanese Kanji representation
- **範囲 / Range**: 10^68 (無量大数) まで / Up to 10^68 (無量大数)
- **負の数 / Negative numbers**: サポート / Supported
- **例 / Example**:
  ```javascript
  numToJapanese(123); // "百二十三"
  numToJapanese(123.45); // "百二十三・四五"
  numToJapanese("1234567"); // "百二十三万四千五百六十七"
  numToJapanese(-123); // "負の百二十三"
  ```

### `numToDaiji(number)`

数字を日本語の大字に変換します。

Convert a number to Japanese Daiji (formal) numerals.

- **引数 / Parameters**: `number` (number | string) - 変換する数字 / The number to convert
- **戻り値 / Returns**: string - 日本語（大字）表現 / Japanese Daiji representation
- **範囲 / Range**: 10^68 まで対応、大字変換は萬 (10,000) まで / Up to 10^68, Daiji conversion up to 萬 (10,000)
- **負の数 / Negative numbers**: サポート / Supported
- **例 / Example**:
  ```javascript
  numToDaiji(123); // "壱陌弐拾参"
  numToDaiji("1234567"); // "壱陌弐拾参萬肆阡伍陌陸拾漆"
  numToDaiji(-123); // "負の壱陌弐拾参"
  ```

### `numToSi(number)`

数字を SI 接頭語表記に変換します。

Convert a number to SI prefix notation.

- **引数 / Parameters**: `number` (number | string) - 変換する数字 / The number to convert
- **戻り値 / Returns**: string - SI 接頭語表現 / SI prefix representation
- **範囲 / Range**: 10^30 (Q - Quetta) まで / Up to 10^30 (Q - Quetta)
- **接頭語 / Prefixes**: K, M, G, T, P, E, Z, Y, R, Q
- **負の数 / Negative numbers**: サポート / Supported
- **例 / Example**:
  ```javascript
  numToSi(1234); // "1.234K"
  numToSi(1234567); // "1.235M"
  numToSi("1234567890"); // "1.235G"
  numToSi(-1234); // "-1.234K"
  ```

### `numToWord(locale, number)`

指定したロケールで数字を変換します。

Convert a number using the specified locale.

- **引数 / Parameters**:
  - `locale` (string) - ロケール識別子 / Locale identifier: `"si"`, `"en"`, `"english"`, `"jp"`, `"japanese"`, `"kanji"`, `"jpdaiji"`, `"daiji"`
  - `number` (number | string) - 変換する数字 / The number to convert
- **戻り値 / Returns**: string - ロケール対応表現 / Localized representation
- **負の数 / Negative numbers**: 全ロケールでサポート / Supported in all locales
- **例 / Example**:
  ```javascript
  numToWord("en", 123); // "One hundred twenty-three"
  numToWord("jp", 123); // "百二十三"
  numToWord("si", 123456); // "123.456K"
  numToWord("en", -123); // "Minus one hundred twenty-three"
  ```

## 📝 入力形式 / Input Format

### サポートされている入力タイプ / Supported Input Types

- **number 型 / Number type**: `numToEnglish(123)`
- **string 型（推奨）/ String type (recommended)**: `numToEnglish("123")`
- **指数表記 / Exponential notation**: `numToEnglish("1.23e5")` → `"One hundred twenty-three thousand"`
- **全角数字 / Full-width numbers**: `numToEnglish("123")` （自動変換 / converted automatically）
- **カンマ区切り / With commas**: `numToEnglish("123,456,789")` （自動的に削除 / commas removed automatically）
- **Infinity / 無限大**: `numToEnglish(Infinity)` → `"Infinity"`, `numToJapanese(Infinity)` → `"無限"`

### 指数表記について / About Exponential Notation

指数表記（例: `1.23e5`、`5.67e-3`）がサポートされています。入力時に自動的に展開されます。

Exponential notation (e.g., `1.23e5`, `5.67e-3`) is supported and automatically expanded.

```javascript
numToEnglish("1.23e5"); // "One hundred twenty-three thousand"
numToEnglish("5.67e-3"); // "Zero point zero zero five six seven"
numToJapanese("1.5e4"); // "一万五千"
```

## 💻 TypeScript サポート / TypeScript Support

TypeScript 型定義が含まれています。

TypeScript definitions are included.

```typescript
import { numToEnglish } from "@dak-ia/num-to-word";

const result: string = numToEnglish(123);
```

## 🎨 Examples

ブラウザでの動作を確認できるデモファイルが含まれています。

An example HTML file is included to test the library in a browser.

```bash
# ビルド後、ブラウザで開く / Build and open in browser
npm run build
open examples/index.html

# または開発サーバーで確認 / Or use dev server
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

---

## ライセンス / License

MIT License

## 作者 / Author

[dak-ia](https://github.com/dak-ia)

## リポジトリ / Repository

https://github.com/dak-ia/num-to-word
