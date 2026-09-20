export const DecimalSeparator = {
  period: "period",
  comma: "comma",
} as const;

export type DecimalSeparator = (typeof DecimalSeparator)[keyof typeof DecimalSeparator];

export const GroupSeparator = {
  ...DecimalSeparator,
  space: "space",
} as const;

export type GroupSeparator = (typeof GroupSeparator)[keyof typeof GroupSeparator];
