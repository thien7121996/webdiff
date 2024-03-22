import { GetProjectsResponseType } from '@/models/GetProjectsType';
import { httpClient } from '@/utils/httpClient';

export const getProjects = async (): Promise<GetProjectsResponseType> => {
  return await httpClient.get('/admin/projects');
};
