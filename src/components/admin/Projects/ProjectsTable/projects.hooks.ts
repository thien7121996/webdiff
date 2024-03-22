import { useNotification } from '@/hooks/useNotification';
import { getProjects } from '@/services/admin/projects';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useAdminProjects = () => {
	const { setNotification } = useNotification();

	const handleGetProjects = async () => {
		try {
			const projectsData = await getProjects();
			return projectsData.data;
		} catch (error) {
			const errorMessage = (error as AxiosError).response?.data as string;
			setNotification({ type: 'error', message: errorMessage });
			return [];
		}
	};

	const { isLoading, data: projects } = useQuery({
		refetchOnWindowFocus: false,
		queryFn: handleGetProjects,
		queryKey: ['projects'],
		staleTime: 10000,
	});

	return { isLoading, projects };
};
