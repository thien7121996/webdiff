import { auth } from '@/configs/firebase';
import { useAuthenticated } from '@/hooks/auth.hook';
import { Cookie, removeCookie, setCookie } from '@/utils/cookie';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const useCurrentUser = () => {
	const { push } = useRouter();
	const { setUser, user } = useAuthenticated();
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user: any) => {
			if (user) {
				setUser(user.reloadUserInfo);
				localStorage.setItem('user', JSON.stringify(user));
				setCookie(
					Cookie.ACCESS_TOKEN,
					user.stsTokenManager.accessToken,
					user.stsTokenManager.expirationTime
				);
				setCookie(Cookie.UUID, user.uid, user.stsTokenManager.expirationTime);
			} else {
				setUser(null);
				localStorage.removeItem('user');
			}
		});

		return () => unsubscribe();
	}, [setUser]);

	const logout = async () => {
		try {
			await signOut(auth);
			push('/signin');
			localStorage.removeItem('user');
			removeCookie(Cookie.ACCESS_TOKEN);
			removeCookie(Cookie.UUID);
		} catch (error) {}
	};

	return { user, logout };
};

export default useCurrentUser;
