import {
	GetProjectRequestType,
	GetProjectResponseType,
} from '@/models/GetProjectType';
import { httpClient } from '@/utils/httpClient';

export const getProject = async (
	request: GetProjectRequestType
): Promise<GetProjectResponseType> => {
	return await httpClient.get(`/admin/project`, request);
};
