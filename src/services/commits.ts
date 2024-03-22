import {
  GetCommitResponseType,
  GetCommitsRequestType,
} from '@/models/GetCommitsType';
import { httpClient } from '@/utils/httpClient';

export const getCommits = async (
  request: GetCommitsRequestType
): Promise<GetCommitResponseType> => {
  return await httpClient.get('/commits', request);
};
