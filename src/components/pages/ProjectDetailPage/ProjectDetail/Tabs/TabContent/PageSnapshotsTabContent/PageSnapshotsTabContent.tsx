import { PageSnapShotType } from '@/models/pageSnapShot.model';
import { FC } from 'react';
import { TablePageSnapshot } from './TablePageSnapshot';
type Props = {
  pageSnapshot: PageSnapShotType[];
  reloadProject: () => void;
};
export const PageSnapshotsTabContent: FC<Props> = ({
  pageSnapshot,
  reloadProject,
}) => {
  return (
    <div>
      <TablePageSnapshot
        pageSnapshot={pageSnapshot}
        reloadProject={reloadProject}
      />
    </div>
  );
};
