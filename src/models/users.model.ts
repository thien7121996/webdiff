export type User = {
	id?: string;
	userName: string;
	email: string;
	password: string;
	type: number;
	status: number;
};

export type UserInfo = {
	email: string;
	createdAt: string;
	emailVerified: boolean;
	lastLoginAt: string;
	lastRefreshAt: string;
	localId: string;
};
