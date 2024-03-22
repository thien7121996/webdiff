import { httpClient } from '@/utils/httpClient';

type ChangeVisualReferenceRequest = {
  projectId: string;
  pageSnapShotId: string;
  pageVisualSnapShotId: string;
};

type DeleteVisualSnapshotRequest = {
  projectId: string;
  pageSnapshotId: string;
  visualSnapshotId: string;
};

const baseRoute = '/page-visual-snapshot';

export const changeVisualReference = async (
  data: ChangeVisualReferenceRequest
) => {
  return await httpClient.post(
    `${baseRoute}/update-reference`,
    {},
    { params: { ...data } }
  );
};

export const deleteVisualSnapshot = async (
  body: DeleteVisualSnapshotRequest
) => {
  return await httpClient.delete(`${baseRoute}/delete`, body);
};
