# APIリファレンス / API Reference

数を位取りのある表記に変換する関数です。1桁ずつの変換は[docs/digits.md](https://github.com/dak-ia/num-to-word/blob/main/docs/digits.md)にまとめています。

Functions that convert a number with place values. Digit-by-digit conversion is listed in [docs/digits.md](https://github.com/dak-ia/num-to-word/blob/main/docs/digits.md).

## `numToEnglish(number)`

数字を英語の単語に変換します。

Convert a number to English words.

- **引数 / Parameters**: `number` (number | string) - 変換する数字 / The number to convert
- **戻り値 / Returns**: string - 英語表現 / English word representation
- **範囲 / Range**: 10^306（Uncentillion）まで / Up to 10^306 (Uncentillion)
- **負の数 / Negative numbers**: サポート / Supported
- **例 / Example**:
  ```javascript
  numToEnglish(123); // "One hundred twenty-three"
  numToEnglish(123.45); // "One hundred twenty-three point four five"
  numToEnglish("1234567"); // "One million two hundred thirty-four thousand five hundred sixty-seven"
  numToEnglish(-123); // "Minus one hundred twenty-three"
  ```

## `numToJapanese(number)`

数字を日本語の漢数字に変換します。

Convert a number to Japanese Kanji numerals.

- **引数 / Parameters**: `number` (number | string) - 変換する数字 / The number to convert
- **戻り値 / Returns**: string - 日本語（漢数字）表現 / Japanese Kanji representation
- **範囲 / Range**: 10^68（無量大数）まで / Up to 10^68 (無量大数)
- **負の数 / Negative numbers**: サポート / Supported
- **例 / Example**:
  ```javascript
  numToJapanese(123); // "百二十三"
  numToJapanese(123.45); // "百二十三・四五"
  numToJapanese("1234567"); // "百二十三万四千五百六十七"
  numToJapanese(-123); // "負の百二十三"
  ```

## `numToDaiji(number)`

数字を日本語の大字に変換します。

Convert a number to Japanese Daiji (formal) numerals.

- **引数 / Parameters**: `number` (number | string) - 変換する数字 / The number to convert
- **戻り値 / Returns**: string - 日本語（大字）表現 / Japanese Daiji representation
- **範囲 / Range**: 10^68まで対応、大字変換は萬（10,000）まで / Up to 10^68, Daiji conversion up to 萬 (10,000)
- **負の数 / Negative numbers**: サポート / Supported
- **例 / Example**:
  ```javascript
  numToDaiji(123); // "壱陌弐拾参"
  numToDaiji("1234567"); // "壱陌弐拾参萬肆阡伍陌陸拾漆"
  numToDaiji(-123); // "負の壱陌弐拾参"
  ```

## `numToSi(number)`

数字をSI接頭語表記に変換します。

Convert a number to SI prefix notation.

- **引数 / Parameters**: `number` (number | string) - 変換する数字 / The number to convert
- **戻り値 / Returns**: string - SI接頭語表現 / SI prefix representation
- **範囲 / Range**: 10^30（Q - Quetta）まで / Up to 10^30 (Q - Quetta)
- **接頭語 / Prefixes**: K, M, G, T, P, E, Z, Y, R, Q
- **負の数 / Negative numbers**: サポート / Supported
- **例 / Example**:
  ```javascript
  numToSi(1234); // "1.234K"
  numToSi(1234567); // "1.234567M"
  numToSi("1234567890"); // "1.23456789G"
  numToSi(-1234); // "-1.234K"
  ```
