import { UrlType } from './RunVisualSnapshotsType';

export type CreateCommitDocsRequest = {
  projectId: string;
  urlList: string[];
};

export type CreateCommitDocsResponse = {
  message: string;
  data: {
    urlList: UrlType[];
    visualCheckId: string;
  };
};
