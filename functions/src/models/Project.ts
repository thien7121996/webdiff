export type Project = {
  baseUrl: string;
  name: string;
  pageCount?: number;
  lastRunAt?: number;
  lastRunStatus?: 'success' | 'failed';
};

export type CreateProjectPayload = Pick<Project, 'baseUrl' | 'name'>;

export type Page = {
  path: string;
  projectId: string;
};

export type CreatePagePayload = Pick<Page, 'path' | 'projectId'>;

export type SnapshotQueueDoc = {
  userId: string;
  projectId: string;
  createdAt: number;
};

export type PageSnapshotQueueDoc = {
  userId: string;
  projectId: string;
  pageId: string;
  baseUrl: string;
  path: string;
  snapshotId: string;
  createdAt: number;
};

export type ProjectSnapshot = {
  createdAt: number;
  pageCount?: number;
  successCount?: number;
  failedCount?: number;
  finishedAt?: number;
  referenceSnapshotId?: string;
};
