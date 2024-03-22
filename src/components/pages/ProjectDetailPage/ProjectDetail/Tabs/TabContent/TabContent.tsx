import { tabObject } from '@/components/pages/ProjectDetailPage/ProjectDetail/Tabs/TabButtons';
import { PageSnapShotType } from '@/models/pageSnapShot.model';
import { FC } from 'react';
import { CommitsTabContent } from './CommitsTabContent';
import { PageSnapshotsTabContent } from './PageSnapshotsTabContent';

type Props = {
  tabSelectedId: number;
  pageSnapshot?: PageSnapShotType[];
  reloadProject: () => void;
};

const renderTab = (
  tabSelectedId: number,
  pageSnapshot: PageSnapShotType[],
  reloadProject: () => void
) => {
  switch (tabSelectedId) {
    case tabObject.pageSnapshotsTabId:
      return (
        <PageSnapshotsTabContent
          pageSnapshot={pageSnapshot}
          reloadProject={reloadProject}
        />
      );

    case tabObject.commitsTabId:
      return <CommitsTabContent />;

    default:
      return null;
  }
};

export const TabContent: FC<Props> = ({
  tabSelectedId,
  pageSnapshot,
  reloadProject,
}) => {
  return renderTab(
    tabSelectedId,
    pageSnapshot || [],
    reloadProject || (() => {})
  );
};
