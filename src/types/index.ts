export const INPUT_TYPE = {
  INPUT_A: 'INPUT_A',
  INPUT_B: 'INPUT_B',
} as const;

export type INPUT_TYPE = keyof typeof INPUT_TYPE;

export const SCREENSHOT_STATUS_TYPE = {
  doing: 'doing',
  done: 'done',
  fail: 'fail',
} as const;

export type SCREENSHOT_STATUS_TYPE = keyof typeof SCREENSHOT_STATUS_TYPE;
