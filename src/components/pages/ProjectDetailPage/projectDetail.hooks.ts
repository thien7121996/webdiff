import { ProjectType } from '@/models/GetProjectType';
import { PageSnapShotType } from '@/models/pageSnapShot.model';
import { getDetailProject } from '@/services/project';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useState } from 'react';

export const useProjectDetail = (projectId: string) => {
  const [pageSnapshotUrls, setPageSnapshotUrls] = useState<string[]>([]);

  const get = useCallback(async (): Promise<ProjectType | undefined> => {
    try {
      const response = await getDetailProject(projectId);

      setPageSnapshotUrls(
        response.data?.pageSnapShot?.map(
          (page: PageSnapShotType) => page.url
        ) ?? []
      );

      return response.data;
    } catch (error) {
      return;
    }
  }, [projectId]);

  const {
    isError,
    isLoading,
    data: project,
  } = useQuery({
    queryFn: get,
    staleTime: 5000,
    enabled: !!projectId,
    queryKey: [projectId],
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return {
    isError,
    isLoading,
    pageSnapshotUrls,
    project: project,
  };
};
