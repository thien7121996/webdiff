import { PageSnapShotType } from '@/models/pageSnapShot.model';
import { ProjectType } from '@/models/project.model';
import { httpClient } from '@/utils/httpClient';
/**
 * Login
 * @param data
 */
type dataScreen = {
  url: string;
  project: ProjectType;
  pageSnapShot: PageSnapShotType;
  isCheckVisual: boolean;
};
export const screenShotUrl = (data: dataScreen): Promise<any> => {
  return httpClient.post(`/screenshot`, data);
};

export const screenShotWorker = (data: { url: string }): Promise<any> => {
  return httpClient.post(`/screenshotvisual/screenshotserver`, data);
};
