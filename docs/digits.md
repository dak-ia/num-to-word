<!-- このファイルはnpm run generateからの自動生成のため手動編集禁止 -->

# 桁読み変換 / Digit-by-digit Conversion

`@dak-ia/num-to-word`で数字を1桁ずつ各言語の語に変換した一覧です。使い方は[README](https://github.com/dak-ia/num-to-word#readme)を参照してください。

## Arabic words

```js
numToArabicDigits("0123"); // "صفر واحد اثنان ثلاثة"
numToArabicDigits("1.500"); // "واحد فاصلة خمسة صفر صفر"
numToArabicDigits(Infinity); // "لانهاية"
numToWord("ar-digits", "0123"); // "صفر واحد اثنان ثلاثة"
```

- ロケール / Locale: `ar-digits`, `arabic-digits`
- 大文字小文字 / Letter case: 非対応 / Not supported

## Bengali words

```js
numToBengaliDigits("0123"); // "শূন্য এক দুই তিন"
numToBengaliDigits("1.500"); // "এক দশমিক পাঁচ শূন্য শূন্য"
numToBengaliDigits(Infinity); // "অসীম"
numToWord("bn-digits", "0123"); // "শূন্য এক দুই তিন"
```

- ロケール / Locale: `bn-digits`, `bengali-digits`
- 大文字小文字 / Letter case: 非対応 / Not supported

## Chinese words

```js
numToChineseDigits("0123"); // "零一二三"
numToChineseDigits("1.500"); // "一点五零零"
numToChineseDigits(Infinity); // "无穷"
numToWord("zh-digits", "0123"); // "零一二三"
```

- ロケール / Locale: `zh-digits`, `chinese-digits`
- 大文字小文字 / Letter case: 非対応 / Not supported

## Dutch words

```js
numToDutchDigits("0123"); // "Nul een twee drie"
numToDutchDigits("1.500"); // "Een komma vijf nul nul"
numToDutchDigits(Infinity); // "Oneindig"
numToWord("nl-digits", "0123"); // "Nul een twee drie"
```

- ロケール / Locale: `nl-digits`, `dutch-digits`
- 大文字小文字 / Letter case: `capitalize`（既定）, `upper`, `lower`

## English words

```js
numToEnglishDigits("0123"); // "Zero one two three"
numToEnglishDigits("1.500"); // "One point five zero zero"
numToEnglishDigits(Infinity); // "Infinity"
numToWord("en-digits", "0123"); // "Zero one two three"
```

- ロケール / Locale: `en-digits`, `english-digits`
- 大文字小文字 / Letter case: `capitalize`（既定）, `upper`, `lower`

## French words

```js
numToFrenchDigits("0123"); // "Zéro un deux trois"
numToFrenchDigits("1.500"); // "Un virgule cinq zéro zéro"
numToFrenchDigits(Infinity); // "Infini"
numToWord("fr-digits", "0123"); // "Zéro un deux trois"
```

- ロケール / Locale: `fr-digits`, `french-digits`
- 大文字小文字 / Letter case: `capitalize`（既定）, `upper`, `lower`

## German words

```js
numToGermanDigits("0123"); // "Null eins zwei drei"
numToGermanDigits("1.500"); // "Eins Komma fünf null null"
numToGermanDigits(Infinity); // "Unendlich"
numToWord("de-digits", "0123"); // "Null eins zwei drei"
```

- ロケール / Locale: `de-digits`, `german-digits`
- 大文字小文字 / Letter case: `capitalize`（既定）, `upper`, `lower`

## Greek words

```js
numToGreekDigits("0123"); // "Μηδέν ένα δύο τρία"
numToGreekDigits("1.500"); // "Ένα κόμμα πέντε μηδέν μηδέν"
numToGreekDigits(Infinity); // "Άπειρο"
numToWord("el-digits", "0123"); // "Μηδέν ένα δύο τρία"
```

- ロケール / Locale: `el-digits`, `greek-digits`
- 大文字小文字 / Letter case: `capitalize`（既定）, `upper`, `lower`

## Hindi words

```js
numToHindiDigits("0123"); // "शून्य एक दो तीन"
numToHindiDigits("1.500"); // "एक दशमलव पाँच शून्य शून्य"
numToHindiDigits(Infinity); // "अनंत"
numToWord("hi-digits", "0123"); // "शून्य एक दो तीन"
```

- ロケール / Locale: `hi-digits`, `hindi-digits`
- 大文字小文字 / Letter case: 非対応 / Not supported

## Indonesian words

```js
numToIndonesianDigits("0123"); // "Nol satu dua tiga"
numToIndonesianDigits("1.500"); // "Satu koma lima nol nol"
numToIndonesianDigits(Infinity); // "Tak hingga"
numToWord("id-digits", "0123"); // "Nol satu dua tiga"
```

- ロケール / Locale: `id-digits`, `indonesian-digits`
- 大文字小文字 / Letter case: `capitalize`（既定）, `upper`, `lower`

## Italian words

```js
numToItalianDigits("0123"); // "Zero uno due tre"
numToItalianDigits("1.500"); // "Uno virgola cinque zero zero"
numToItalianDigits(Infinity); // "Infinito"
numToWord("it-digits", "0123"); // "Zero uno due tre"
```

- ロケール / Locale: `it-digits`, `italian-digits`
- 大文字小文字 / Letter case: `capitalize`（既定）, `upper`, `lower`

## Japanese kanji

```js
numToJapaneseDigits("0123"); // "〇一二三"
numToJapaneseDigits("1.500"); // "一・五〇〇"
numToJapaneseDigits(Infinity); // "無限"
numToWord("jp-digits", "0123"); // "〇一二三"
```

- ロケール / Locale: `jp-digits`, `japanese-digits`, `kanji-digits`
- 大文字小文字 / Letter case: 非対応 / Not supported

## Japanese daiji (大字) numerals

```js
numToDaijiDigits("0123"); // "零壱弐参"
numToDaijiDigits("1.500"); // "壱・伍零零"
numToDaijiDigits(Infinity); // "無限"
numToWord("jpdaiji-digits", "0123"); // "零壱弐参"
```

- ロケール / Locale: `jpdaiji-digits`, `daiji-digits`
- 大文字小文字 / Letter case: 非対応 / Not supported

## Korean words

```js
numToKoreanDigits("0123"); // "영일이삼"
numToKoreanDigits("1.500"); // "일점오영영"
numToKoreanDigits(Infinity); // "무한"
numToWord("ko-digits", "0123"); // "영일이삼"
```

- ロケール / Locale: `ko-digits`, `korean-digits`
- 大文字小文字 / Letter case: 非対応 / Not supported

## Polish words

```js
numToPolishDigits("0123"); // "Zero jeden dwa trzy"
numToPolishDigits("1.500"); // "Jeden przecinek pięć zero zero"
numToPolishDigits(Infinity); // "Nieskończoność"
numToWord("pl-digits", "0123"); // "Zero jeden dwa trzy"
```

- ロケール / Locale: `pl-digits`, `polish-digits`
- 大文字小文字 / Letter case: `capitalize`（既定）, `upper`, `lower`

## Portuguese words

```js
numToPortugueseDigits("0123"); // "Zero um dois três"
numToPortugueseDigits("1.500"); // "Um vírgula cinco zero zero"
numToPortugueseDigits(Infinity); // "Infinito"
numToWord("pt-digits", "0123"); // "Zero um dois três"
```

- ロケール / Locale: `pt-digits`, `portuguese-digits`
- 大文字小文字 / Letter case: `capitalize`（既定）, `upper`, `lower`

## Roman numerals

```js
numToRomanDigits("0123"); // "N I II III"
numToRomanDigits("1.500"); // "I . V N N"
numToRomanDigits(Infinity); // "∞"
numToWord("roman-digits", "0123"); // "N I II III"
```

- ロケール / Locale: `roman-digits`
- 大文字小文字 / Letter case: `capitalize`, `upper`（既定）, `lower`

## Russian words

```js
numToRussianDigits("0123"); // "Ноль один два три"
numToRussianDigits("1.500"); // "Один запятая пять ноль ноль"
numToRussianDigits(Infinity); // "Бесконечность"
numToWord("ru-digits", "0123"); // "Ноль один два три"
```

- ロケール / Locale: `ru-digits`, `russian-digits`
- 大文字小文字 / Letter case: `capitalize`（既定）, `upper`, `lower`

## Spanish words

```js
numToSpanishDigits("0123"); // "Cero uno dos tres"
numToSpanishDigits("1.500"); // "Uno coma cinco cero cero"
numToSpanishDigits(Infinity); // "Infinito"
numToWord("es-digits", "0123"); // "Cero uno dos tres"
```

- ロケール / Locale: `es-digits`, `spanish-digits`
- 大文字小文字 / Letter case: `capitalize`（既定）, `upper`, `lower`

## Thai words

```js
numToThaiDigits("0123"); // "ศูนย์หนึ่งสองสาม"
numToThaiDigits("1.500"); // "หนึ่งจุดห้าศูนย์ศูนย์"
numToThaiDigits(Infinity); // "อนันต์"
numToWord("th-digits", "0123"); // "ศูนย์หนึ่งสองสาม"
```

- ロケール / Locale: `th-digits`, `thai-digits`
- 大文字小文字 / Letter case: 非対応 / Not supported

## Turkish words

```js
numToTurkishDigits("0123"); // "Sıfır bir iki üç"
numToTurkishDigits("1.500"); // "Bir virgül beş sıfır sıfır"
numToTurkishDigits(Infinity); // "Sonsuz"
numToWord("tr-digits", "0123"); // "Sıfır bir iki üç"
```

- ロケール / Locale: `tr-digits`, `turkish-digits`
- 大文字小文字 / Letter case: `capitalize`（既定）, `upper`, `lower`

## Vietnamese words

```js
numToVietnameseDigits("0123"); // "Không một hai ba"
numToVietnameseDigits("1.500"); // "Một phẩy năm không không"
numToVietnameseDigits(Infinity); // "Vô cực"
numToWord("vi-digits", "0123"); // "Không một hai ba"
```

- ロケール / Locale: `vi-digits`, `vietnamese-digits`
- 大文字小文字 / Letter case: `capitalize`（既定）, `upper`, `lower`
