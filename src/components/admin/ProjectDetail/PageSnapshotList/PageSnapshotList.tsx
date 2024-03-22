import { useBooleanState } from '@/hooks/useBooleanState';
import { useRouterQuery } from '@/hooks/useRouterQuery';
import { PageSnapShotType } from '@/models/pageSnapShot.model';
import { find } from 'lodash';
import { useParams } from 'next/navigation';
import { FC, useCallback, useState } from 'react';
import { VisualSnapshotsModel } from './VisualSnapshotsModel';

type Props = { pageSnapshots: Omit<PageSnapShotType, 'pageVisualSnapShot'>[] };

export const PageSnapshotList: FC<Props> = ({ pageSnapshots }) => {
  const [selectedPageSnapshot, setSelectedPageSnapshot] =
    useState<Omit<PageSnapShotType, 'pageVisualSnapShot'>>();

  const {
    boolean: isVisualsModelOpen,
    setFalse: setIsVisualsModelClose,
    setTrue: setIsVisualsModelOpen,
  } = useBooleanState(false);

  const params = useParams();
  const { navigate } = useRouterQuery();

  const handleSelectPageSnapshot = useCallback(
    (pageSnapshotId: string) => {
      return find(
        pageSnapshots,
        (pageSnapshot) => pageSnapshot.id === pageSnapshotId
      );
    },
    [pageSnapshots]
  );

  const handleClickHistoryCheck = useCallback(
    (pageSnapshotId: string) => {
      setIsVisualsModelOpen();
      setSelectedPageSnapshot(handleSelectPageSnapshot(pageSnapshotId));
    },
    [handleSelectPageSnapshot, setIsVisualsModelOpen]
  );

  const handleCloseVisualsModal = useCallback(() => {
    setIsVisualsModelClose();
  }, [setIsVisualsModelClose]);

  return (
    <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
      <VisualSnapshotsModel
        selectedPageSnapshot={selectedPageSnapshot}
        onClose={handleCloseVisualsModal}
        isOpen={isVisualsModelOpen}
      />
      <table className='w-full text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right'>
        <thead className='bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400'>
          <tr>
            <th scope='col' className='p-4'>
              <div className='flex items-center'>
                <input
                  id='checkbox-all'
                  type='checkbox'
                  className='h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800'
                />
                <label htmlFor='checkbox-all' className='sr-only'>
                  checkbox
                </label>
              </div>
            </th>
            <th scope='col' className='px-6 py-3'>
              Snapshot name
            </th>
            <th scope='col' className='px-6 py-3'>
              Status
            </th>
            <th scope='col' className='px-6 py-3'>
              ID
            </th>
            <th scope='col' className='px-6 py-3'>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {pageSnapshots.map((pageSnapshot, index) => (
            <tr
              key={index}
              className='border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600'
            >
              <td className='w-4 p-4'>
                <div className='flex items-center'>
                  <input
                    id='checkbox-table-1'
                    type='checkbox'
                    className='h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800'
                  />
                  <label htmlFor='checkbox-table-1' className='sr-only'>
                    checkbox
                  </label>
                </div>
              </td>
              <th
                scope='row'
                className='whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white'
              >
                URL PAGE #{index + 1}: {pageSnapshot.url}
              </th>
              <td className='px-6 py-4'>
                {pageSnapshot.path ? 'ScreenShot' : 'Not ScreenShot'}
              </td>
              <td className='px-6 py-4'>{pageSnapshot.id}</td>
              <td className='flex gap-2 px-6 py-4'>
                {pageSnapshot.id && (
                  <button
                    onClick={() =>
                      handleClickHistoryCheck(pageSnapshot.id as string)
                    }
                    className='rounded-full bg-fuchsia-500 px-4 py-2 font-bold text-white hover:bg-blue-700'
                  >
                    History Check
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
