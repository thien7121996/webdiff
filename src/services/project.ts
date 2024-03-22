import { GetProjectResponseType } from '@/models/GetProjectType';
import { ProjectType } from '@/models/project.model';
import { httpClient } from '@/utils/httpClient';
/**
 * Login
 * @param data
 */
export const addProject = (data: ProjectType): Promise<any> => {
  return httpClient.post(`/project/create`, data);
};

export const getProject = (userId: string): Promise<any> => {
  return httpClient.get(`/project/get?userid=${userId}`);
};

export const deleteProject = (projectId: string): Promise<any> => {
  return httpClient.post(`/project/delete`, { projectId });
};

export const getDetailProject = (
  projectId: string
): Promise<GetProjectResponseType> => {
  return httpClient.get(`/project/detail?projectid=${projectId}`);
};
