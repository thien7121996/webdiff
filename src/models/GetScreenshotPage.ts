export type ScreenshotPageRequest = {
  projectId: string;
  pageSnapshotId: string;
};

export type ScreenshotPageResponse = {
  message: string;
  url?: string;
};
