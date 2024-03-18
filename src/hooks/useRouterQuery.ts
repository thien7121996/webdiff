import { useRouter } from 'next/router';
import { useCallback } from 'react';

export const useRouterQuery = () => {
	const router = useRouter();

	const navigate = useCallback(
		(pathname: string, query: Record<string, string>) => {
			router.push(
				{
					pathname,
					query,
				},
				undefined,
				{ shallow: true }
			);
		},
		[router]
	);

	return { navigate };
};
