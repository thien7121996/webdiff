import Loader from '@/components/admin/common/Loader';
import dayjs from 'dayjs';
import { FC, useEffect, useState } from 'react';

type Props = { urlShorting: string; commit: any };

export const ItemCommit: FC<Props> = ({ urlShorting, commit }) => {
  const [progressShorting, setProgressShorting] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgressShorting((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prevProgress + 1;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [commit.screenshotingUrl]);

  useEffect(() => {
    if (commit.path) {
      setProgressShorting(100);
    }
  }, [commit.path]);

  return (
    <div className='border-blue-gray-50 text-blue-gray-500 font-normalfocus:outline-none relative whitespace-normal break-words border bg-white p-4 font-sans text-sm'>
      <div className='mb-2 flex items-center gap-3 text-gray-800'>
        <strong>Page Snapshot ID:</strong> {commit.id}
        <div className='center relative inline-block select-none whitespace-nowrap rounded-full align-baseline font-sans text-xs font-medium capitalize leading-none tracking-wide text-white'>
          <div className='mt-px'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='currentColor'
              aria-hidden='true'
              className='-mt-px h-4 w-4 text-green-300'
            >
              <path
                fillRule='evenodd'
                d='M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z'
                clipRule='evenodd'
              ></path>
            </svg>
          </div>
        </div>
        <strong>URL:</strong> {commit.url}
        <div className='center relative inline-block select-none whitespace-nowrap rounded-full align-baseline font-sans text-xs font-medium capitalize leading-none tracking-wide text-white'>
          <div className='mt-px'>
            {' '}
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='currentColor'
              aria-hidden='true'
              className='-mt-px h-4 w-4 text-green-300'
            >
              <path
                fillRule='evenodd'
                d='M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z'
                clipRule='evenodd'
              ></path>
            </svg>
          </div>
        </div>
        <div className='absolute right-5 top-5'>
          {urlShorting === commit.url && (
            <p className='flex items-center gap-5 align-bottom text-xl font-bold'>
              <span>Processing </span>
              <Loader />
            </p>
          )}
          {commit.path && (
            <p className='flex items-center gap-5 align-bottom text-2xl font-bold'>
              <span>100 %</span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='currentColor'
                aria-hidden='true'
                className='-mt-px h-4 w-4 text-green-300'
              >
                <path
                  fillRule='evenodd'
                  d='M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z'
                  clip-rule='evenodd'
                ></path>
              </svg>
            </p>
          )}
        </div>
      </div>

      {commit.path && (
        <div className='mb-2 block'>
          <strong>Path screenshot:</strong>
          <a
            href={commit.diffImage}
            target='_blank'
            className='text-blue-500 underline'
          >
            Download Image
          </a>
        </div>
      )}
      <p className='flex gap-5 font-sans text-sm font-normal leading-normal text-gray-700 antialiased'>
        <strong>Diff: </strong>
        {commit.diff}% <strong>Match:</strong> {commit.match}%
      </p>
      <div className='mt-4 flex items-center gap-5'>
        <div className='flex items-center gap-1'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='currentColor'
            aria-hidden='true'
            className='-mt-px h-4 w-4 text-green-300'
          >
            <path
              fillRule='evenodd'
              d='M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z'
              clipRule='evenodd'
            ></path>
          </svg>
          <p className='block font-sans text-xs font-normal text-gray-700 antialiased'>
            {dayjs(commit.createdAt).format('DD/MM/YYYY')}
          </p>
        </div>
        <div className='flex items-center gap-1'>
          <p className='block font-sans text-xs font-normal text-gray-700 antialiased'>
            {urlShorting === commit.url && (
              <div>
                <span className='h-3 w-3 rounded-full bg-blue-400'></span>
                <strong>Loading</strong>
              </div>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};
