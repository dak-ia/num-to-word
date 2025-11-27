"use strict";

import { siSymbol } from "./dictionaries/si.js";
import { enOnesPlace, enTens, enTensPlace, enHundredsPlace, enOthersPlace } from "./dictionaries/en.js";
import { jpOnesPlace, jpTHT, jpOthersPlace, jpDaijiBefore, jpDaijiAfter } from "./dictionaries/jp.js";

const convertToStrNum = (num) => {
  num = num
    .toString()
    .replace(/[０-９]/g, function (s) {
      return String.fromCharCode(s.charCodeAt(0) - 0xfee0);
    })
    .replace(/．/g, ".")
    .replace(/，/g, "")
    .replace(/\,/g, "")
    .replace(/\s/g, "")
    .trim();
  // 小数点のみの入力をチェック
  if (/^\.+$/.test(num)) {
    throw new Error("NaN");
  }
  if (!RegExp(/[^0-9\.]/).test(num) && (num.match(/\./g) || []).length <= 1) {
    if (num.slice(0, 1) == ".") {
      num = "0" + num;
    }
    if (num.slice(-1) == ".") {
      num = num + "0";
    }
    return num;
  } else {
    throw new Error("NaN");
  }
};

const splitNum = (num) => {
  if (num == null || num == undefined || num == "") {
    throw new TypeError("Invalid argument: expected a number or string");
  }
  num = convertToStrNum(num);
  try {
    let numArray = { integer: "", decimal: "" };
    numArray.integer = num.split(".")[0] || "";
    numArray.decimal = num.split(".")[1] || "";
    return numArray;
  } catch (e) {
    if (e instanceof TypeError) {
      throw new TypeError("Invalid argument: Expected a string");
    } else {
      throw new Error("Unknown error");
    }
  }
};

const sliceTo1digitNum = (num) => {
  return num.split("");
};

const sliceTo3digitNum = (num) => {
  let result = [];
  let len = num.length;
  for (let i = 0; i < len; i = i + 3) {
    result.unshift(num.slice(-3));
    num = num.slice(0, -3);
  }
  return result;
};

const sliceTo4digitNum = (num) => {
  let result = [];
  let len = num.length;
  for (let i = 0; i < len; i = i + 4) {
    result.unshift(num.slice(-4));
    num = num.slice(0, -4);
  }
  return result;
};

const replaceIntUnitEn = (num) => {
  let numArray = num.split("");
  if (numArray.length > 3) {
    throw new Error("Overflow");
  }
  let result = "";
  if (numArray.length == 1) {
    result = enOnesPlace[numArray[0]];
  } else {
    if (numArray.length == 2) {
      numArray.unshift("0");
    }
    if (numArray[1] == "0") {
      result = enOnesPlace[numArray[2]];
    } else if (numArray[1] == "1") {
      result = enTens[numArray[2]];
    } else {
      if (numArray[2] == "0") {
        result = enTensPlace[numArray[1]];
      } else {
        result = enTensPlace[numArray[1]] + "-" + enOnesPlace[numArray[2]];
      }
    }
    if (numArray[0] != "0") {
      if (result == enOnesPlace[0]) {
        result = "";
      }
      result = enOnesPlace[numArray[0]] + " " + enHundredsPlace + " " + result;
    }
  }
  return result.trim();
};

const replaceIntUnitJp = (num) => {
  let numArray = num.split("").reverse();
  if (numArray.length > 4) {
    throw new Error("Overflow");
  }
  let result = "";
  for (let i = 0; i < numArray.length; i++) {
    if ((i > 0 && numArray[i] == "0") || (i == 0 && numArray.length > 1 && numArray[i] == "0")) {
    } else if (i > 0 && numArray[i] == "1") {
      result = jpTHT[i] + result;
    } else {
      result = jpOnesPlace[numArray[i]] + jpTHT[i] + result;
    }
  }
  return result;
};

const toLocaleString = (locale, num) => {
  if (locale == null || locale == undefined || locale == "" || num == null || num == undefined || num == "") {
    throw new TypeError("Invalid argument: expected a number or string");
  }

  const localeLower = locale.toLowerCase();

  if (localeLower == "si") {
    return toSi(num);
  } else if (localeLower == "en" || localeLower == "english") {
    return toEn(num);
  } else if (localeLower == "jp" || localeLower == "japanese") {
    return toJp(num);
  } else if (localeLower == "jpdaiji" || localeLower == "daiji") {
    return toJpDaiji(num);
  } else {
    throw new Error("Invalid locale");
  }
};

const toSi = (num) => {
  const numArray = splitNum(num);
  if (numArray.integer.length > (siSymbol.length + 1) * 3) {
    throw new Error("Overflow");
  }
  if (numArray.integer.length <= 3) {
    return numArray.integer + "." + numArray.decimal;
  } else {
    let integerArray = sliceTo3digitNum(numArray.integer);
    if (integerArray.length == 2) {
      return (
        (Math.round(Number(integerArray[0] + integerArray[1] + "." + numArray.decimal)) / 1000).toString() + siSymbol[0]
      );
    } else {
      return (
        (Math.round(Number(integerArray[0] + integerArray[1] + "." + integerArray[2])) / 1000).toString() +
        siSymbol[integerArray.length - 2]
      );
    }
  }
};

const toEn = (num) => {
  const numArray = splitNum(num);
  if (numArray.integer.length > (Object.values(enOthersPlace).length - 1) * 3) {
    throw new Error("Overflow");
  }
  // 連続ゼロを単一の0として扱う（小数部がない場合のみ）
  if (/^0+$/.test(numArray.integer) && numArray.decimal == "") {
    return "Zero";
  }
  let integerArray = sliceTo3digitNum(numArray.integer);
  let decimalArray = sliceTo1digitNum(numArray.decimal);
  integerArray = integerArray
    .reverse()
    .map((num, i) => {
      return replaceIntUnitEn(num) + " " + enOthersPlace[i * 3].toLowerCase();
    })
    .reverse();
  if (integerArray.length > 1) {
    integerArray = integerArray.map((num) => {
      if (RegExp(enOnesPlace[0]).test(num)) {
        return "";
      }
      return num;
    });
  }
  integerArray = integerArray.filter((num) => num != "");
  decimalArray = decimalArray.map((num) => {
    return enOnesPlace[num];
  });
  if (decimalArray.length > 0) {
    const result = (integerArray.join(" ").trim() + " point " + decimalArray.join(" ").trim()).trim();
    return result.slice(0, 1).toUpperCase() + result.slice(1);
  } else {
    const result = integerArray.join(" ").trim();
    return result.slice(0, 1).toUpperCase() + result.slice(1);
  }
};

const toJp = (num) => {
  const numArray = splitNum(num);
  if (numArray.integer.length > jpOthersPlace.length * 4) {
    throw new Error("Overflow");
  }
  // ゼロの特別処理（小数部がない場合のみ）
  if (numArray.integer == "0" && numArray.decimal == "") {
    return jpOnesPlace[0];
  }
  // 連続ゼロを単一の0として扱う
  if (/^0+$/.test(numArray.integer) && numArray.decimal == "") {
    return jpOnesPlace[0];
  }
  let integerArray = sliceTo4digitNum(numArray.integer);
  let decimalArray = sliceTo1digitNum(numArray.decimal);
  integerArray = integerArray
    .reverse()
    .map((num, i) => {
      if (num != "0" && num != "00" && num != "000" && num != "0000") {
        return replaceIntUnitJp(num) + jpOthersPlace[i];
      }
    })
    .reverse();
  decimalArray = decimalArray.map((num) => {
    return jpOnesPlace[num];
  });

  let integerPart = integerArray.join("");
  // 整数部が空（すべて0）で小数部がある場合は〇を表示
  if (integerPart === "" && decimalArray.length > 0) {
    integerPart = jpOnesPlace[0];
  }

  if (decimalArray.length > 0) {
    return integerPart + "・" + decimalArray.join("");
  } else {
    return integerPart;
  }
};

const toJpDaiji = (num) => {
  num = toJp(num);
  // 大字では百・千の前に「壱」を明記する（例: 百→壱百、千→壱千）
  num = num.replace(
    /(万|億|兆|京|垓|𥝱|穣|溝|澗|正|載|極|恒河沙|阿僧祇|那由他|不可思議|無量大数|^)(百|千)/gu,
    "$1一$2"
  );
  // 通常の大字変換
  for (let i = 0; i <= 13; i++) {
    let reg = new RegExp(jpDaijiBefore[i], "g");
    num = num.replace(reg, jpDaijiAfter[i]);
  }
  return num;
};

const version = __VERSION__;

export default {
  version,
  toEn,
  toJp,
  toJpDaiji,
  toSi,
  toLocaleString,
};
