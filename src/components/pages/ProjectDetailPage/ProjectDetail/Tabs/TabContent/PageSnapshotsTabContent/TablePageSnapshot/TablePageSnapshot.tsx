import { FC } from 'react';
import { TabBody } from './TabBody';
import { TableHead } from './TableHead';

export const TablePageSnapshot: FC = () => {
  return (
    <table className='relative w-full text-left text-sm text-gray-500 shadow-md dark:text-gray-400 rtl:text-right'>
      <TableHead />
      <TabBody />
    </table>
  );
};

TablePageSnapshot.displayName = 'TablePageSnapshot';
