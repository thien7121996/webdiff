import { pageScreenshot } from '@/services/pageScreenshot';
import { useMutation } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useCallback } from 'react';

export const useScreenshotPage = () => {
  const params = useParams();
  const projectId = params?.projectId as string;

  const handleScreenshotPage = useCallback(
    async (pageSnapshotId: string) => {
      if (!projectId) {
        return;
      }

      try {
        await pageScreenshot({ projectId, pageSnapshotId });
      } catch (error) {
        // do nothing
      }
    },
    [projectId]
  );

  const {
    mutate: screenshot,
    isError: isScreenshotError,
    isPending: isScreenshotPending,
  } = useMutation({
    mutationFn: handleScreenshotPage,
  });

  return { screenshot, isScreenshotError, isScreenshotPending };
};
