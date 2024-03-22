import { DeleteCommitRequest } from '@/models/DeleteCommitType';
import { httpClient } from '@/utils/httpClient';

export const deleteCommit = async (request: DeleteCommitRequest) => {
  return await httpClient.delete(`/commit/${request.commitId}`, {
    projectId: request.projectId,
  });
};
