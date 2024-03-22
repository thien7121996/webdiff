// import { useScreenshot } from '@/components/pages/ProjectDetail/ListPageSnapShot/ProjectDetail/screenshot.hooks';
import { FC } from 'react';
import { useProjectDetail } from './projectDetail.hooks';

type Props = {
  projectId: string;
  snapShotId: string;
};

export const CompareImagePage: FC<Props> = ({ projectId, snapShotId }) => {
  // const { handleScreenShot } = useScreenshot();

  const { isLoading, pageSnapShotObject } = useProjectDetail(projectId);
  return <div></div>;
  // return isLoading ? (
  //   <Loader />
  // ) : (
  //   <CompareImageDetail
  //     projectId={projectId}
  //     snapShotId={snapShotId}
  //     snapShotObject={pageSnapShotObject[snapShotId]}
  //     snapShotUrl={pageSnapShotObject[snapShotId].url}
  //     snapShotItemPath={pageSnapShotObject[snapShotId].path}
  //     newestPageVisualSnapshot={first(
  //       pageSnapShotObject[snapShotId].pageVisualSnapShot
  //     )}
  //   />
  // );
};
