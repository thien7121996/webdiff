import {
  GetVisualSnapshotsRequest,
  GetVisualSnapshotsResponse,
} from '@/models/GetVisualSnapshotsType';
import { httpClient } from '@/utils/httpClient';

export const getVisualSnapshots = async (
  request: GetVisualSnapshotsRequest
): Promise<GetVisualSnapshotsResponse> => {
  return await httpClient.get('/admin/visual-snapshots', request);
};
