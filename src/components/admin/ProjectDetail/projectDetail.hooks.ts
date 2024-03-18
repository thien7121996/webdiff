import { useNotification } from '@/hooks/useNotification';
import { getProject } from '@/services/admin/project';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useParams } from 'next/navigation';
import { useCallback } from 'react';

export const useProjectDetail = () => {
	const { projectId } = useParams();

	const { setNotification } = useNotification();

	const handleGetProjectDetail = useCallback(async () => {
		if (typeof projectId !== 'string') {
			return;
		}

		try {
			const pageSnapshotData = await getProject({
				projectId: projectId,
			});

			return pageSnapshotData.data;
		} catch (error) {
			const errorMessage = (error as AxiosError).response?.data as string;
			setNotification({ type: 'error', message: errorMessage });
			return;
		}
	}, [projectId, setNotification]);

	const {
		isError,
		isLoading,
		data: project,
	} = useQuery({
		queryKey: ['project', projectId],
		queryFn: handleGetProjectDetail,
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		enabled: !!projectId,
		staleTime: 10000,
	});

	return { isError, isLoading, project };
};
