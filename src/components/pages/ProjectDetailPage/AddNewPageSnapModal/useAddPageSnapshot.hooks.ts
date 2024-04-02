import { useNotification } from '@/hooks/useNotification';
import { useUpdateDataQuery } from '@/hooks/useUpdateDataQuery';
import { ProjectType } from '@/models/GetProjectType';
import { PageSnapShotType } from '@/models/pageSnapShot.model';
import { addPageSnapShot } from '@/services/pageSnapShot';
import { useMutation } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useCallback } from 'react';
import { InfoBaseUrl } from './AddNewPageSnapModal';
import { useScreenshotPage } from './useScreenshotPage';

export const useAddPageSnapshot = (onClose: () => void) => {
  const params = useParams();
  const updateDataQuery = useUpdateDataQuery();
  const { setNotification } = useNotification();
  const projectId = params?.projectId as string;

  const { screenshot } = useScreenshotPage();

  const handleAddPageSnapshot = useCallback(
    async (newUrl: InfoBaseUrl) => {
      if (!projectId) {
        return;
      }

      const response = await addPageSnapShot({
        projectId,
        baseInfo: [newUrl],
      });

      return response.data;
    },
    [projectId]
  );

  const handleUpdateProjectData = useCallback(
    (responsePageSnapShots: PageSnapShotType[]) => {
      updateDataQuery([projectId], (prev: ProjectType) => {
        const newProjectDetail = { ...prev };
        const [newResponsePageSnapShots] = [...responsePageSnapShots];

        // newResponsePageSnapShots.screenshotStatus =
        //   SCREENSHOT_STATUS_TYPE.doing;

        const pageSnapshots = [
          ...newProjectDetail.pageSnapShot,
          ...[newResponsePageSnapShots],
        ];

        newProjectDetail.pageSnapShot = pageSnapshots;
        return newProjectDetail;
      });
    },
    [projectId, updateDataQuery]
  );

  const handleError = useCallback(() => {
    setNotification({ type: 'error', message: 'Add pageSnapshot failure' });
  }, [setNotification]);

  const handleSuccess = (responsePageSnapShots: PageSnapShotType[]) => {
    onClose();
    handleUpdateProjectData(responsePageSnapShots);
    handleUpdateScreenshotData(responsePageSnapShots);
    setNotification({
      type: 'success',
      message: 'Add pagesnapshot successfuly',
    });
  };

  const handleUpdateScreenshotData = useCallback(
    (responsePageSnapShots: PageSnapShotType[]) => {
      const pageSnapId = handleGetPageSnapId(responsePageSnapShots);
      screenshot(pageSnapId);
    },
    [screenshot]
  );

  const { mutate, isPending } = useMutation({
    mutationFn: handleAddPageSnapshot,
    onSuccess: handleSuccess,
    onError: handleError,
  });

  return {
    mutate,
    isPending,
  };
};

const handleGetPageSnapId = (responsePageSnapShots: PageSnapShotType[]) => {
  const [responsePageSnap] = responsePageSnapShots;
  return responsePageSnap.id;
};
