import { PageSnapShotType } from '@/models/pageSnapShot.model';
import { FC } from 'react';
import { TabBody } from './TabBody';
import { TableHead } from './TableHead';

type Props = {
  pageSnapshot: PageSnapShotType[];
  reloadProject: () => void;
};

export const TablePageSnapshot: FC<Props> = ({
  pageSnapshot,
  reloadProject,
}) => {
  return (
    <>
      <table className='relative w-full text-left text-sm text-gray-500 shadow-md dark:text-gray-400 rtl:text-right'>
        <TableHead />
        <TabBody
          dataPageSnapShot={pageSnapshot}
          reloadProject={reloadProject}
        />
      </table>
    </>
  );
};

TablePageSnapshot.displayName = 'TablePageSnapshot';
