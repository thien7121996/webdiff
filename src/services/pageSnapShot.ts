import { InfoBaseUrl } from '@/components/pages/ProjectDetailPage/AddNewPageSnapModal/AddNewPageSnapModal';
import { ProjectType } from '@/models/project.model';
import { SCREENSHOT_STATUS_TYPE } from '@/types';
import { httpClient } from '@/utils/httpClient';

type pageSnapShotData = {
  projectId: string;
  baseInfo: InfoBaseUrl[];
  screenshotStatus?: SCREENSHOT_STATUS_TYPE;
};

export const addPageSnapShot = (request: pageSnapShotData): Promise<any> => {
  return httpClient.post(`/pagesnapshot/create`, request);
};

export const getPageSnapShot = (projectId: string): Promise<ProjectType> => {
  return httpClient.get(`/pagesnapshot/get?projectid=${projectId}`);
};

export const deletePageSnapShot = (
  projectId: string,
  pageSnapShotId: string
): Promise<ProjectType> => {
  return httpClient.get(
    `/pagesnapshot/delete?projectid=${projectId}&pagesnapshotid=${pageSnapShotId}`
  );
};
