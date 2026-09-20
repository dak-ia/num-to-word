import { DecimalSeparator, GroupSeparator, LetterCase } from "../constants";
import type { DigitWords } from "../types";

export const ptDigitWords: DigitWords = {
  name: "Portuguese",
  locales: ["pt-digits", "portuguese-digits"],
  separators: { decimal: DecimalSeparator.comma, group: GroupSeparator.space },
  digits: ["zero", "um", "dois", "três", "quatro", "cinco", "seis", "sete", "oito", "nove"],
  join: " ",
  decimalPoint: " vírgula ",
  minus: "menos ",
  infinity: "infinito",
  letterCase: LetterCase.capitalize,
};

export const ptBrDigitWords: DigitWords = {
  ...ptDigitWords,
  name: "BrazilianPortuguese",
  label: "Portuguese words (Brazil)",
  locales: ["pt-br-digits", "brazilian-portuguese-digits"],
  separators: { decimal: DecimalSeparator.comma, group: GroupSeparator.period },
};
