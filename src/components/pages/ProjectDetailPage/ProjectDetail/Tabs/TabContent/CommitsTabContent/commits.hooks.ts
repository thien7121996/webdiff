import { useRevalidate } from '@/hooks/useRevalidate';
import { useSocket } from '@/hooks/useSocket';
import { getCommits } from '@/services/commits';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect } from 'react';

export const useCommits = (projectId?: string) => {
  const socket = useSocket();
  const revalidate = useRevalidate();

  useEffect(() => {
    socket?.on('updated-page-snapshot-data', () => {
      if (!projectId) {
        return;
      }

      revalidate([projectId, 'commits']);
    });
  }, [projectId, revalidate, socket]);

  const get = useCallback(async (projectId?: string) => {
    if (!projectId) {
      return;
    }

    try {
      const response = await getCommits({ projectId: projectId });
      return response.data;
    } catch (error) {
      return;
    }
  }, []);

  const {
    isError,
    isLoading,
    data: commits,
  } = useQuery({
    queryKey: [projectId, 'commits'],
    queryFn: () => get(projectId),
    refetchOnWindowFocus: false,
    enabled: !!projectId,
  });

  return {
    commits,
    isError,
    isLoading,
  };
};
