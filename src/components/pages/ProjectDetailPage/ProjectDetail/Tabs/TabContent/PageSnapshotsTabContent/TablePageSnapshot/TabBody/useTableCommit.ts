import { useGetFetchQuery } from '@/hooks/useGetFetchQuery';
import { useNotification } from '@/hooks/useNotification';
import { useUpdateDataQuery } from '@/hooks/useUpdateDataQuery';
import { ProjectType } from '@/models/GetProjectType';
import { deletePageSnapShot } from '@/services/pageSnapShot';
import { useMutation } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useCallback, useState } from 'react';

export const useTableCommit = () => {
  const [pageSnapId, setPageSnapId] = useState('');

  const params = useParams();
  const projectId = params?.projectId as string;
  const { setNotification } = useNotification();

  const updateDataQuery = useUpdateDataQuery();
  const projectDetail: ProjectType = useGetFetchQuery([projectId]);

  const updateQuery = useCallback(() => {
    updateDataQuery([projectId], (prev: ProjectType) => {
      const newProjectDetail = { ...prev };
      const pageSnapshots = [...prev.pageSnapShot];
      newProjectDetail.pageSnapShot = pageSnapshots.filter(
        (pageSnap) => pageSnap.id !== pageSnapId
      );

      return newProjectDetail;
    });
  }, [pageSnapId, projectId, updateDataQuery]);

  const handleSuccess = useCallback(() => {
    updateQuery();
    setNotification({ type: 'success', message: 'Delete success' });
  }, [setNotification, updateQuery]);

  const handleError = useCallback(() => {
    setNotification({ type: 'error', message: 'Delete error' });
  }, [setNotification]);

  const handleDeletePageSnap = useCallback(
    async (pageSnapShotId?: string) => {
      if (!projectId || !pageSnapShotId) {
        handleError();
        return;
      }

      setPageSnapId(pageSnapShotId);
      await deletePageSnapShot(projectId, pageSnapShotId);
    },
    [handleError, projectId]
  );

  const { mutate, isPending } = useMutation({
    mutationFn: handleDeletePageSnap,
    onSuccess: handleSuccess,
    onError: handleError,
  });

  return { pageSnapShots: projectDetail.pageSnapShot, mutate, isPending };
};
