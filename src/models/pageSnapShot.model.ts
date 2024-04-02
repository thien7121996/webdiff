import { SCREENSHOT_STATUS_TYPE } from '@/types';

export type PageSnapShotType = {
  id: string;
  url: string;
  path?: string;
  createAt?: string;
  updateAt?: string;
  isPagePrivate?: boolean;
  screenshotStatus?: SCREENSHOT_STATUS_TYPE;
};
