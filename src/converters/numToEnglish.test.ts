import { numToEnglish } from "./numToEnglish";

describe("numToEnglish", () => {
  test("basic numerals", () => {
    expect(numToEnglish("0")).toBe("Zero");
    expect(numToEnglish("1")).toBe("One");
    expect(numToEnglish("2")).toBe("Two");
    expect(numToEnglish("3")).toBe("Three");
    expect(numToEnglish("4")).toBe("Four");
    expect(numToEnglish("5")).toBe("Five");
    expect(numToEnglish("6")).toBe("Six");
    expect(numToEnglish("7")).toBe("Seven");
    expect(numToEnglish("8")).toBe("Eight");
    expect(numToEnglish("9")).toBe("Nine");
    expect(numToEnglish("10")).toBe("Ten");
    expect(numToEnglish("11")).toBe("Eleven");
    expect(numToEnglish("12")).toBe("Twelve");
    expect(numToEnglish("13")).toBe("Thirteen");
    expect(numToEnglish("14")).toBe("Fourteen");
    expect(numToEnglish("15")).toBe("Fifteen");
    expect(numToEnglish("16")).toBe("Sixteen");
    expect(numToEnglish("17")).toBe("Seventeen");
    expect(numToEnglish("18")).toBe("Eighteen");
    expect(numToEnglish("19")).toBe("Nineteen");
  });

  test("simple tens", () => {
    expect(numToEnglish("20")).toBe("Twenty");
    expect(numToEnglish("30")).toBe("Thirty");
    expect(numToEnglish("40")).toBe("Forty");
    expect(numToEnglish("50")).toBe("Fifty");
    expect(numToEnglish("60")).toBe("Sixty");
    expect(numToEnglish("70")).toBe("Seventy");
    expect(numToEnglish("80")).toBe("Eighty");
    expect(numToEnglish("90")).toBe("Ninety");
  });

  test("complex tens", () => {
    expect(numToEnglish("21")).toBe("Twenty-one");
    expect(numToEnglish("22")).toBe("Twenty-two");
    expect(numToEnglish("35")).toBe("Thirty-five");
    expect(numToEnglish("47")).toBe("Forty-seven");
    expect(numToEnglish("59")).toBe("Fifty-nine");
    expect(numToEnglish("68")).toBe("Sixty-eight");
    expect(numToEnglish("76")).toBe("Seventy-six");
    expect(numToEnglish("84")).toBe("Eighty-four");
    expect(numToEnglish("99")).toBe("Ninety-nine");
  });

  test("simple hundreds", () => {
    expect(numToEnglish("100")).toBe("One hundred");
    expect(numToEnglish("200")).toBe("Two hundred");
    expect(numToEnglish("900")).toBe("Nine hundred");
  });

  test("complex hundreds", () => {
    expect(numToEnglish("101")).toBe("One hundred one");
    expect(numToEnglish("110")).toBe("One hundred ten");
    expect(numToEnglish("111")).toBe("One hundred eleven");
    expect(numToEnglish("119")).toBe("One hundred nineteen");
    expect(numToEnglish("120")).toBe("One hundred twenty");
    expect(numToEnglish("121")).toBe("One hundred twenty-one");
    expect(numToEnglish("202")).toBe("Two hundred two");
    expect(numToEnglish("220")).toBe("Two hundred twenty");
    expect(numToEnglish("222")).toBe("Two hundred twenty-two");
    expect(numToEnglish("123")).toBe("One hundred twenty-three");
    expect(numToEnglish("999")).toBe("Nine hundred ninety-nine");
  });

  test("simple thousands", () => {
    expect(numToEnglish("1000")).toBe("One thousand");
    expect(numToEnglish("2000")).toBe("Two thousand");
    expect(numToEnglish("9000")).toBe("Nine thousand");
  });

  test("complex thousands", () => {
    expect(numToEnglish("1001")).toBe("One thousand one");
    expect(numToEnglish("1010")).toBe("One thousand ten");
    expect(numToEnglish("1011")).toBe("One thousand eleven");
    expect(numToEnglish("1100")).toBe("One thousand one hundred");
    expect(numToEnglish("1101")).toBe("One thousand one hundred one");
    expect(numToEnglish("1110")).toBe("One thousand one hundred ten");
    expect(numToEnglish("1111")).toBe("One thousand one hundred eleven");
    expect(numToEnglish("1020")).toBe("One thousand twenty");
    expect(numToEnglish("1021")).toBe("One thousand twenty-one");
    expect(numToEnglish("1234")).toBe("One thousand two hundred thirty-four");
    expect(numToEnglish("2002")).toBe("Two thousand two");
    expect(numToEnglish("2020")).toBe("Two thousand twenty");
    expect(numToEnglish("2022")).toBe("Two thousand twenty-two");
    expect(numToEnglish("2200")).toBe("Two thousand two hundred");
    expect(numToEnglish("2202")).toBe("Two thousand two hundred two");
    expect(numToEnglish("2220")).toBe("Two thousand two hundred twenty");
    expect(numToEnglish("2222")).toBe("Two thousand two hundred twenty-two");
    expect(numToEnglish("9999")).toBe("Nine thousand nine hundred ninety-nine");
  });

  test("ten thousands", () => {
    expect(numToEnglish("10000")).toBe("Ten thousand");
    expect(numToEnglish("20000")).toBe("Twenty thousand");
    expect(numToEnglish("11000")).toBe("Eleven thousand");
    expect(numToEnglish("12345")).toBe("Twelve thousand three hundred forty-five");
    expect(numToEnglish("99999")).toBe("Ninety-nine thousand nine hundred ninety-nine");
  });

  test("hundred thousands", () => {
    expect(numToEnglish("100000")).toBe("One hundred thousand");
    expect(numToEnglish("200000")).toBe("Two hundred thousand");
    expect(numToEnglish("123456")).toBe("One hundred twenty-three thousand four hundred fifty-six");
    expect(numToEnglish("999999")).toBe("Nine hundred ninety-nine thousand nine hundred ninety-nine");
  });

  test("millions", () => {
    expect(numToEnglish("1000000")).toBe("One million");
    expect(numToEnglish("2000000")).toBe("Two million");
    expect(numToEnglish("10000000")).toBe("Ten million");
    expect(numToEnglish("100000000")).toBe("One hundred million");
  });

  test("large numbers patterns", () => {
    expect(numToEnglish("123456789")).toBe(
      "One hundred twenty-three million four hundred fifty-six thousand seven hundred eighty-nine"
    );
    expect(numToEnglish("987654321")).toBe(
      "Nine hundred eighty-seven million six hundred fifty-four thousand three hundred twenty-one"
    );
    expect(numToEnglish("1000000000")).toBe("One billion");
    expect(numToEnglish("1000000001")).toBe("One billion one");
  });

  test("decimal numbers", () => {
    expect(numToEnglish("0.1")).toBe("Zero point one");
    expect(numToEnglish("0.5")).toBe("Zero point five");
    expect(numToEnglish("1.1")).toBe("One point one");
    expect(numToEnglish("1.5")).toBe("One point five");
    expect(numToEnglish("1.23")).toBe("One point two three");
    expect(numToEnglish("12.34")).toBe("Twelve point three four");
    expect(numToEnglish("123.456")).toBe("One hundred twenty-three point four five six");
    expect(numToEnglish("99.99")).toBe("Ninety-nine point nine nine");
  });

  test("numbers with zeros", () => {
    expect(numToEnglish("0")).toBe("Zero");
    expect(numToEnglish("00")).toBe("Zero");
    expect(numToEnglish("0.0")).toBe("Zero point zero");
    expect(numToEnglish("0.00")).toBe("Zero point zero zero");
    expect(numToEnglish("00.0")).toBe("Zero point zero");
  });

  test("zeros in decimal part", () => {
    expect(numToEnglish("1.0")).toBe("One point zero");
    expect(numToEnglish("1.00")).toBe("One point zero zero");
    expect(numToEnglish("10.01")).toBe("Ten point zero one");
    expect(numToEnglish("1.0000")).toBe("One point zero zero zero zero");
    expect(numToEnglish("0.0001")).toBe("Zero point zero zero zero one");
    expect(numToEnglish("0.001")).toBe("Zero point zero zero one");
  });

  test("negative numbers", () => {
    expect(numToEnglish("-1")).toBe("Minus one");
    expect(numToEnglish("-123")).toBe("Minus one hundred twenty-three");
    expect(numToEnglish("-1234.56")).toBe("Minus one thousand two hundred thirty-four point five six");
    expect(numToEnglish(-999)).toBe("Minus nine hundred ninety-nine");
  });

  test("infinity", () => {
    expect(numToEnglish(Infinity)).toBe("Infinity");
    expect(numToEnglish(-Infinity)).toBe("Minus infinity");
    expect(numToEnglish("Infinity")).toBe("Infinity");
    expect(numToEnglish("-Infinity")).toBe("Minus infinity");
    expect(numToEnglish("infinity")).toBe("Infinity");
  });

  test("invalid input", () => {
    expect(() => numToEnglish("1" + "0".repeat(309))).toThrow("Number too large for conversion.");
    expect(() => numToEnglish("abc")).toThrow("Expected a valid number format.");
    expect(() => numToEnglish("")).toThrow("Expected a number or string.");
    // @ts-expect-error - Testing invalid input
    expect(() => numToEnglish(null)).toThrow("Expected a number or string.");
    // @ts-expect-error - Testing invalid input
    expect(() => numToEnglish(undefined)).toThrow("Expected a number or string.");
  });
});
