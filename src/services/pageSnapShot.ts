import { ProjectType } from '@/models/project.model';
import { httpClient } from '@/utils/httpClient';

type InforBaseUrl = {
	index: number;
	urlBase: string;
	isPagePrivate: boolean;
};
type pageSnapShotData = {
	projectId: string;
	baseInfo: InforBaseUrl[];
};

export const addPageSnapShot = (data: pageSnapShotData): Promise<any> => {
	return httpClient.post(`/pagesnapshot/create`, data);
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
