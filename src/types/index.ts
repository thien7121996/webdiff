export const INPUT_TYPE = {
  INPUT_A: 'INPUT_A',
  INPUT_B: 'INPUT_B',
} as const;

export type INPUT_TYPE = keyof typeof INPUT_TYPE;
