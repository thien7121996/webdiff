import { useRevalidate } from '@/hooks/useRevalidate';
import { deleteCommit } from '@/services/commit';
import {
  cancelVisualRunning,
  checkVisualRunning,
} from '@/services/runVisualSnapshot';
import { Cookie, getCookie } from '@/utils/cookie';
import { useMutation } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useCallback, useState } from 'react';

export const useCommit = () => {
  const [isRunning, setIsRunning] = useState(false);

  const params = useParams();
  const revalidate = useRevalidate();
  const projectId = params?.projectId as string;

  const cancelJobVisual = useCallback(async (visualCheckId: string) => {
    try {
      const check = await cancelVisualRunning({ visualCheckId });
      if (check.data) {
        setIsRunning(false);
      } else {
        setIsRunning(true);
        return check.data;
      }
    } catch (error) {
      setIsRunning(false);
    }
  }, []);

  const checkJobVisualRunning = useCallback(
    async (visualCheckId: string) => {
      const uuid = getCookie(Cookie.UUID);
      if (!uuid) {
        return;
      }

      try {
        const check = await checkVisualRunning({ visualCheckId });
        if (!check.data) {
          setIsRunning(false);
          cancelJobVisual(visualCheckId);
        } else {
          setIsRunning(true);
          return check.data;
        }
      } catch (error) {
        setIsRunning(false);
      }
    },
    [cancelJobVisual]
  );

  const deletePageSnapCommit = useCallback(
    async (commitId: string, projectId?: string) => {
      if (!projectId) {
        return;
      }

      try {
        await deleteCommit({ projectId, commitId });
        revalidate([projectId, 'commits']);
      } catch (error) {
        // do nothing
      }
    },
    [revalidate]
  );

  const { mutate: handleDeleteCommit, isPending } = useMutation({
    mutationFn: (commitId: string) => deletePageSnapCommit(commitId, projectId),
  });

  return {
    handleDeleteCommit,
    isPending,
    checkJobVisualRunning,
    isRunning,
    cancelJobVisual,
  };
};
