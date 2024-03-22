import { httpClient } from '@/utils/httpClient';
/**
 * Login
 * @param data
 */
export const addUserMeta = (data: {
	userId: string;
	rule: number;
}): Promise<any> => {
	return httpClient.post(`/user/create`, data);
};

export const getUser = (): Promise<any> => {
	return httpClient.get(`/user/get`);
};

export const getUserInfo = (token?: string): Promise<any> => {
	return httpClient.post(`/user/get/info`, { token });
};
