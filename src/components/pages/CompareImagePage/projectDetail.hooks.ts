import { getDetailProject } from '@/services/project';
import { useQuery } from '@tanstack/react-query';
import { keyBy } from 'lodash';
import { useMemo } from 'react';

export const useProjectDetail = (projectId: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ['pageSnapShot'],
    queryFn: () => getDetailProject(projectId),
    staleTime: 6000,
  });

  const projectData = useMemo(() => data?.data, [data?.data]);

  const pageSnapShotObject = keyBy(projectData?.pageSnapShot, 'id');

  return { pageSnapShotObject, isLoading };
};
