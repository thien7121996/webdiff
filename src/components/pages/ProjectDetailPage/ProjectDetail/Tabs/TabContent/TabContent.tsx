import { tabObject } from '@/components/pages/ProjectDetailPage/ProjectDetail/Tabs/TabButtons';
import { FC } from 'react';
import { CommitsTabContent } from './CommitsTabContent';
import { PageSnapshotsTabContent } from './PageSnapshotsTabContent';

type Props = {
  tabSelectedId: number;
};

const renderTab = (tabSelectedId: number) => {
  switch (tabSelectedId) {
    case tabObject.pageSnapshotsTabId:
      return <PageSnapshotsTabContent />;

    case tabObject.commitsTabId:
      return <CommitsTabContent />;

    default:
      return null;
  }
};

export const TabContent: FC<Props> = ({ tabSelectedId }) => {
  return renderTab(tabSelectedId);
};
