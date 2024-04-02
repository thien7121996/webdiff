import {
  CheckTaskRequest,
  CheckTaskResponse,
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

export const checkVisualRunning = async (
  request: CheckTaskRequest
): Promise<CheckTaskResponse> => {
  return await httpClient.post('/run-visual-snapshots/check-runing', request);
};

export const cancelVisualRunning = async (
  request: CheckTaskRequest
): Promise<CheckTaskResponse> => {
  return await httpClient.post(
    '/run-visual-snapshots/cancel-run-visual',
    request
  );
};
