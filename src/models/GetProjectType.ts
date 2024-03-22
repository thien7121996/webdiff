import { PageSnapShotType } from './pageSnapShot.model';

export type GetProjectResponseType = {
  message: string;
  data?: any;
};

export type GetProjectRequestType = {
  projectId: string;
};

export type ProjectType = {
  id: string;
  name: string;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
  urlLogin?: string;
  hasBasicAuth?: boolean;
  passwordLogin?: string;
  userNameLogin?: string;
  hasPageLogin?: boolean;
  passwordBasicAuth?: string;
  userNameBasicAuth?: string;
  pageSnapShot: PageSnapShotType[];
};
