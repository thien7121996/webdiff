export type RunVisualSnapshotsRequest = {
  visualCheckId: string;
  projectId: string;
  urlList: UrlType[];
};

export type UrlType = {
  pageSnapshotId: string;
  url: string;
};
