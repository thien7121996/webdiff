import {
  CreateCommitDocsRequest,
  CreateCommitDocsResponse,
} from '@/models/CreateCommitDocsType';
import { RunVisualSnapshotsRequest } from '@/models/RunVisualSnapshotsType';
import { httpClient } from '@/utils/httpClient';

export const runVisualSnapshots = async (
  request: RunVisualSnapshotsRequest
) => {
  return await httpClient.post('/run-visual-snapshots', request);
};

export const createVisualSnapshotDocs = async (
  request: CreateCommitDocsRequest
): Promise<CreateCommitDocsResponse> => {
  return await httpClient.post('/run-visual-snapshots/create-commit', request);
};
