import { useNotification } from '@/hooks/useNotification';
import { useRevalidate } from '@/hooks/useRevalidate';
import { useSocket } from '@/hooks/useSocket';
import { useUpdateDataQuery } from '@/hooks/useUpdateDataQuery';
import { ProjectType } from '@/models/GetProjectType';
import { SCREENSHOT_STATUS_TYPE } from '@/types';
import { keyBy } from 'lodash';
import { useParams } from 'next/navigation';
import { useCallback, useEffect } from 'react';

export const useProjectDetailSocket = () => {
  const params = useParams();
  const projectId = params.projectId as string;
  const updateDataQuery = useUpdateDataQuery();
  const { setNotification } = useNotification();
  const revalidate = useRevalidate();
  const socket = useSocket();

  const handleUpdateCommit = useCallback(() => {
    if (!projectId) {
      return;
    }

    socket?.on('updated-page-snapshot-data', () => {
      revalidate([projectId, 'commits']);
    });
  }, [projectId, revalidate, socket]);

  const handleUpdatePageSnap = useCallback(() => {
    if (!projectId || !socket) {
      return;
    }

    socket.on(
      `projectId-${projectId}-add-page-snapshot`,
      (pageVisualSnapResponse) => {
        updateDataQuery([projectId], (prev: ProjectType) => {
          const newProjects = { ...prev };
          const pageSnapObject = keyBy(newProjects.pageSnapShot, 'id');

          pageSnapObject[pageVisualSnapResponse.pageVisualSnapId].path =
            pageVisualSnapResponse.pageScreenshotPath;

          pageSnapObject[
            pageVisualSnapResponse.pageVisualSnapId
          ].screenshotStatus = pageVisualSnapResponse.status;

          const newPageSnapshots = Object.values(pageSnapObject);
          newProjects.pageSnapShot = newPageSnapshots;

          const isSuccess =
            pageVisualSnapResponse.status === SCREENSHOT_STATUS_TYPE.done;

          setNotification({
            type: isSuccess ? 'success' : 'error',
            message: pageVisualSnapResponse.message,
          });

          return newProjects;
        });
      }
    );
  }, [projectId, setNotification, socket, updateDataQuery]);

  useEffect(() => handleUpdateCommit(), [handleUpdateCommit]);
  useEffect(() => handleUpdatePageSnap(), [handleUpdatePageSnap]);
};
