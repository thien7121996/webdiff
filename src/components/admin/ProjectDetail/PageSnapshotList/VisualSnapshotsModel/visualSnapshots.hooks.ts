import { getVisualSnapshots } from '@/services/admin/pageVisualSnapshots';
import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';

export const useVisualSnapshots = (
  projectId?: string,
  pageSnapshotId?: string
) => {
  const get = useCallback(async () => {
    if (!pageSnapshotId || !projectId) {
      return;
    }

    try {
      const response = await getVisualSnapshots({ pageSnapshotId, projectId });
      return response.data;
    } catch (error) {
      return;
    }
  }, [pageSnapshotId, projectId]);

  const {
    isError,
    isLoading,
    data: visualSnapshots,
  } = useQuery({
    enabled: !!projectId && !!pageSnapshotId,
    queryKey: [projectId, pageSnapshotId],
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: 10000,
    queryFn: get,
  });

  return { isError, isLoading, visualSnapshots };
};
