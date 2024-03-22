import { auth } from '@/configs/firebase';

export const getAuthInfo = () => {
	if (auth.currentUser) {
		const authInfo = auth.currentUser as any;
		return authInfo.reloadUserInfo;
	}
	return null;
};
