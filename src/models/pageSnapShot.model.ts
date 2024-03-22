import { PageVisualSnapShot } from './pageVisualSnapshot.model';

export type PageSnapShotType = {
  id?: string;
  url: string;
  path?: string;
  createAt?: string;
  updateAt?: string;
  isPagePrivate?: boolean;
  pageVisualSnapShot?: PageVisualSnapShot[];
};
