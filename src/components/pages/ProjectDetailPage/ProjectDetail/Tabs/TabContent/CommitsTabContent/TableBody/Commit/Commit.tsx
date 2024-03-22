import Loader from '@/components/admin/common/Loader';
import { useCommit } from '@/components/pages/ProjectDetailPage/ProjectDetail/Tabs/TabContent/CommitsTabContent/TableBody/useCommit.hooks';
import { useBooleanState } from '@/hooks/useBooleanState';
import { CommitType } from '@/models/GetCommitsType';
import dayjs from 'dayjs';
import { first } from 'lodash';
import { FC, useEffect, useState } from 'react';
import { ItemCommit } from './ItemCommit';

type Props = {
  commit: CommitType;
};

export const Commit: FC<Props> = ({ commit }) => {
  const { boolean: isOpen, toggle } = useBooleanState(false);
  const [progressShorting, setProgressShorting] = useState(0);
  const [shortingUrl, setShortingUrl] = useState<string>('');
  const pageSnapshots = commit.pageSnapshots;

  const { handleDeleteCommit, isPending } = useCommit();

  useEffect(() => {
    const interval = setInterval(() => {
      setProgressShorting((prevProgress) => {
        if (prevProgress >= 100 || commit.screenshotingUrl !== shortingUrl) {
          clearInterval(interval);
          return 100;
        }
        return prevProgress + 1;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [commit.screenshotingUrl, shortingUrl]);

  useEffect(() => {
    setShortingUrl(commit.screenshotingUrl ?? '');
  }, [commit.screenshotingUrl]);

  return (
    <>
      <tr className='relative flex flex-wrap border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600'>
        <td
          colSpan={1}
          className='w-1/6 max-w-80 truncate whitespace-nowrap text-wrap break-normal px-6 py-4 text-center font-medium text-gray-900 dark:text-white'
        >
          {commit.id}
        </td>
        <td
          colSpan={1}
          className='w-1/6 max-w-80 truncate whitespace-nowrap text-wrap break-normal px-6 py-4 text-center font-medium text-gray-900 dark:text-white'
        >
          {commit.success}
        </td>
        <td
          colSpan={1}
          className='w-1/6 max-w-80 truncate whitespace-nowrap text-wrap break-normal px-6 py-4 text-center font-medium text-gray-900 dark:text-white'
        >
          {commit.fail}
        </td>
        <td
          colSpan={1}
          className='w-1/6 max-w-80 truncate whitespace-nowrap text-wrap break-normal px-6 py-4 font-medium text-gray-900 dark:text-white'
        >
          {commit.screenshotingUrl && (
            <p className='flex items-center justify-center gap-5 text-center align-bottom font-bold'>
              <span>Proccessing</span>
              <Loader />
            </p>
          )}
        </td>

        <td
          colSpan={1}
          className='w-1/6 max-w-80 truncate whitespace-nowrap text-wrap break-normal px-6 py-4 text-center font-medium text-gray-900 dark:text-white'
        >
          {pageSnapshots &&
            pageSnapshots.length > 0 &&
            dayjs(first(pageSnapshots)?.createdAt).format(
              'DD/MM/YYYY HH:mm:ss'
            )}
        </td>
        <td
          colSpan={1}
          className='flex w-1/6 max-w-80 truncate whitespace-nowrap text-wrap break-normal px-2 py-4 text-center font-medium text-gray-900 dark:text-white'
        >
          <button
            className='rounded-full bg-emerald-400 px-4 py-2 text-small font-bold text-white hover:bg-blue-700'
            onClick={toggle}
          >
            View Detail
          </button>
          {!commit.screenshotingUrl && (
            <button
              className='ml-5 rounded-full bg-blue-400 px-2 py-2 text-small font-bold text-white hover:bg-blue-700'
              onClick={() => handleDeleteCommit(commit.id)}
            >
              {!isPending && (
                <svg
                  className='h-[20px] w-[20px] fill-[#fff]'
                  viewBox='0 0 448 512'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z'></path>
                </svg>
              )}
              {isPending && (
                <svg
                  className='h-[20px] w-[20px] fill-[#fff]'
                  viewBox='0 0 512 512'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm192-96H320c17.7 0 32 14.3 32 32V320c0 17.7-14.3 32-32 32H192c-17.7 0-32-14.3-32-32V192c0-17.7 14.3-32 32-32z'></path>
                </svg>
              )}
            </button>
          )}
          {commit.screenshotingUrl && (
            <button
              className='ml-5 rounded-full bg-purple-400 px-3 py-3 text-small font-bold text-white hover:bg-blue-700'
              onClick={toggle}
            >
              <svg
                className='h-[20px] w-[20px] fill-[#fff]'
                viewBox='0 0 512 512'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path d='M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm192-96H320c17.7 0 32 14.3 32 32V320c0 17.7-14.3 32-32 32H192c-17.7 0-32-14.3-32-32V192c0-17.7 14.3-32 32-32z'></path>
              </svg>
            </button>
          )}
        </td>
        {pageSnapshots && isOpen && (
          <td className='flex basis-full'>
            <div className='w-full'>
              {pageSnapshots.map((pageSnapshot, index) => (
                <ItemCommit
                  key={index}
                  urlShorting={commit.screenshotingUrl ?? ''}
                  commit={pageSnapshot}
                />
              ))}
            </div>
          </td>
        )}
      </tr>
    </>
  );
};
