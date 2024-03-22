import { PageSnapShotType } from '@/models/pageSnapShot.model';
import { FC, useState } from 'react';
import { TabButtons } from './TabButtons';
import { tabObject } from './TabButtons/TabButtons';
import { TabContent } from './TabContent';

type Props = { pageSnapshot: PageSnapShotType[]; reloadProject: () => void };

export const Tabs: FC<Props> = ({ pageSnapshot, reloadProject }) => {
  const [tabSelectedId, setTabSelectedId] = useState(
    tabObject.pageSnapshotsTabId
  );

  const handleClickTab = (id: number) => {
    setTabSelectedId(id);
  };

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
