import { useRevalidate } from '@/hooks/useRevalidate';
import { RunVisualSnapshotsRequest } from '@/models/RunVisualSnapshotsType';
import {
  createVisualSnapshotDocs,
  runVisualSnapshots,
} from '@/services/runVisualSnapshot';
import { useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';

export const useVisualSnaps = (projectId: string, urlList: string[]) => {
  const revalidate = useRevalidate();

  const revalidateCommits = useCallback(() => {
    revalidate([projectId, 'commits']);
  }, [projectId, revalidate]);

  const run = useCallback(
    async (projectId?: string, visualCheckId?: string) => {
      if (!projectId || !visualCheckId) {
        return;
      }

      try {
        await runVisualSnapshots({ projectId, visualCheckId });
      } catch (error) {
        // do nothing
      }
    },
    []
  );

  const {
    mutate: runVisualSnap,
    isError,
    isPending,
  } = useMutation({
    mutationKey: [new Date()],
    mutationFn: (request: RunVisualSnapshotsRequest) =>
      run(request.projectId, request.visualCheckId),
    onError: (error) => {
      // eslint-disable-next-line no-console
      console.log(error.message);
    },
  });

  const createDocs = useCallback(
    async (projectId?: string) => {
      try {
        if (!projectId || !urlList || !urlList.length) {
          return;
        }

        const response = await createVisualSnapshotDocs({ projectId, urlList });
        revalidateCommits();

        runVisualSnap({
          projectId,
          visualCheckId: response.data.visualCheckId,
        });
      } catch (error) {
        throw error;
      }
    },
    [revalidateCommits, runVisualSnap, urlList]
  );

  const { mutate: createCommitDocs } = useMutation({
    mutationFn: () => createDocs(projectId),
    onError: (error) => {
      // eslint-disable-next-line no-console
      console.log(error.message);
    },
    onSettled: () => {
      // do nothing
    },
  });

  return {
    isError,
    isPending,
    createCommitDocs,
  };
};
