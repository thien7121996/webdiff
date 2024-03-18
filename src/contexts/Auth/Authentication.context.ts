import React from 'react';

type AuthenticationContextType = {
	user: any;
	setUser: React.Dispatch<React.SetStateAction<any>>;
};

export const AuthenticationContext =
	React.createContext<AuthenticationContextType>({
		user: null,
		setUser: () => {},
	});
