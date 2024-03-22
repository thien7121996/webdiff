import { ProjectType } from './project.model';

export type GetProjectsResponseType = {
  message: string;
  data: ProjectType[];
};
