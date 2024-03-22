import { useRevalidate } from '@/hooks/useRevalidate';
import { deleteCommit } from '@/services/commit';
import { useMutation } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useCallback } from 'react';

export const useCommit = () => {
  const params = useParams();
  const projectId = params?.projectId as string;
  const revalidate = useRevalidate();

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
  };
};
