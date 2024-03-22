export type GetCommitsRequestType = {
  projectId: string;
};

export type GetCommitResponseType = {
  message: string;
  data: CommitType[];
};

export type CommitType = {
  id: string;
  success: number;
  userId: string;
  projectId: string;
  progress: number;
  screenshotingUrl: string | null;
  fail: number;
  pageSnapshots: CommitPageSnapshotType[];
};

export type CommitPageSnapshotType = {
  id: string;
  diff: number;
  match: number;
  url: string;
  path: string;
  createdAt: string;
};
