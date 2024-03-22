import { useCompareImage } from '@/hooks/compareImage.hooks';
import { PageSnapShotType } from '@/models/pageSnapShot.model';
import { PageVisualSnapShot } from '@/models/pageVisualSnapshot.model';
import { FC } from 'react';
import { BarStatus } from './BarStatus';
import { DiffImages } from './DiffImages';

type Props = {
  projectId?: string;
  snapShotId?: string;
  snapShotUrl?: string;
  snapShotItemPath?: string;
  newestPageVisualSnapshot?: PageVisualSnapShot;
  snapShotObject?: PageSnapShotType;
};

export const CompareImageDetail: FC<Props> = ({
  projectId,
  snapShotId,
  snapShotObject,
  snapShotUrl,
  snapShotItemPath,
  newestPageVisualSnapshot,
}) => {
  const {
    diffRef,
    isLoading,
    comparePercent,
    imageWrapperRef,
    imageACanvasRef,
    imageBCanvasRef,
  } = useCompareImage(newestPageVisualSnapshot?.path, snapShotItemPath);

  return (
    <div className='block'>
      <BarStatus
        projectId={projectId}
        snapShotId={snapShotId}
        snapShotObject={snapShotObject}
        comparePercent={comparePercent}
      />
      <DiffImages
        imageACanvasRef={imageACanvasRef}
        imageBCanvasRef={imageBCanvasRef}
        imageWrapperRef={imageWrapperRef}
        isLoading={isLoading}
        diffRef={diffRef}
      />
    </div>
  );
};

CompareImageDetail.displayName = 'CompareImageDetail';
