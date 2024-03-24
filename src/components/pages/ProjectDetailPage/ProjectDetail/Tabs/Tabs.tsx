import { PageSnapShotType } from '@/models/pageSnapShot.model';
import { FC, useEffect, useState } from 'react';
import { TabButtons } from './TabButtons';
import { tabObject } from './TabButtons/TabButtons';
import { TabContent } from './TabContent';

type Props = {
  pageSnapshot: PageSnapShotType[];
  reloadProject: () => void;
  isTabVisualCheck: boolean;
};

export const Tabs: FC<Props> = ({
  pageSnapshot,
  reloadProject,
  isTabVisualCheck,
}) => {
  const [tabSelectedId, setTabSelectedId] = useState(
    tabObject.pageSnapshotsTabId
  );

  const handleClickTab = (id: number) => {
    setTabSelectedId(id);
  };

  useEffect(() => {
    if (isTabVisualCheck) {
      setTabSelectedId(tabObject.commitsTabId);
    }
  }, [isTabVisualCheck]);

  return (
    <div>
      <TabButtons activeTabId={tabSelectedId} onClickTab={handleClickTab} />
      <TabContent
        tabSelectedId={tabSelectedId}
        pageSnapshot={pageSnapshot}
        reloadProject={reloadProject}
      />
    </div>
  );
};

Tabs.displayName = 'Tabs';
