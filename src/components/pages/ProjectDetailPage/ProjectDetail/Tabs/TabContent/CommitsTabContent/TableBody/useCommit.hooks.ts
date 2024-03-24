import { useRevalidate } from '@/hooks/useRevalidate';
import { deleteCommit } from '@/services/commit';
import {
  cancelVisualRuning,
  checkVisualRuning,
} from '@/services/runVisualSnapshot';
import { Cookie, getCookie } from '@/utils/cookie';
import { useMutation } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useCallback, useState } from 'react';

export const useCommit = () => {
  const params = useParams();
  const projectId = params?.projectId as string;
  const revalidate = useRevalidate();
  const [isRuning, setIsRuning] = useState(false);
  const cancelJobVisual = useCallback(async (visualCheckId: string) => {
    try {
      const check = await cancelVisualRuning({ visualCheckId });
      if (check.data) {
        setIsRuning(false);
        return;
      } else {
        setIsRuning(true);
        return check.data;
      }
    } catch (error) {
      setIsRuning(false);
    }
  }, []);
  const checkJobVisualRunning = useCallback(
    async (visualCheckId: string) => {
      const uuid = getCookie(Cookie.UUID);
      if (!uuid) {
        return;
      }

      try {
        const check = await checkVisualRuning({ visualCheckId });
        if (!check.data) {
          setIsRuning(false);
          cancelJobVisual(visualCheckId);
          return;
        } else {
          setIsRuning(true);
          return check.data;
        }
      } catch (error) {
        setIsRuning(false);
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
    isRuning,
    cancelJobVisual,
  };
};
