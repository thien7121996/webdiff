import { getImageFileFromFirebase } from '@/utils/previewImageFirebase';
import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';

export const useImageFile = (
  newestPageVisualSnapshotPath?: string,
  snapShotPath?: string
) => {
  const handleConvertImageFile = useCallback(async () => {
    if (!snapShotPath || !newestPageVisualSnapshotPath) {
      return;
    }

    try {
      const apiList = [
        getImageFileFromFirebase(snapShotPath),
        getImageFileFromFirebase(newestPageVisualSnapshotPath),
      ];

      const [baseImage, compareImage] = await Promise.all(apiList);

      return { baseImage, compareImage };
    } catch (error) {
      throw error;
    }
  }, [newestPageVisualSnapshotPath, snapShotPath]);

  const { data, isLoading } = useQuery({
    queryKey: ['compareImages'],
    queryFn: handleConvertImageFile,
  });

  return { data, isLoading };
};
