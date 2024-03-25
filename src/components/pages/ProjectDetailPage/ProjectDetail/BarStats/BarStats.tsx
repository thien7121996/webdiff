import Loader from '@/components/admin/common/Loader';
import { useParams } from 'next/navigation';
import { Dispatch, FC, SetStateAction, memo, useState } from 'react';
import { useVisualSnaps } from './runVisualSnaps.hooks';

type Props = {
  countPages: number;
  infoProjectDetailId?: string;
  urlList: string[];
  isProccessing: boolean;
  setIsTabVisualCheck: Dispatch<SetStateAction<boolean>>;
};

export const BarStats: FC<Props> = memo(
  ({
    countPages,
    infoProjectDetailId,
    urlList,
    isProccessing,
    setIsTabVisualCheck,
  }) => {
    const params = useParams();
    const [isScreenshoting, setIsScreenshoting] = useState(false);

    const { createCommitDocs, isError, isPending } = useVisualSnaps(
      params.projectId as string,
      urlList
    );

    return (
      <div className='mb-10 flex justify-between gap-x-6 rounded-2xl bg-white p-4 px-4 py-16 py-5 ring-1 ring-gray-200  drop-shadow-md focus:outline-none dark:ring-gray-700'>
        <div className='flex min-w-0 basis-1/2 gap-x-4'>
          <div className='min-w-0 flex-auto'>
            <p className='title-xxl mb-5 mt-1 truncate font-bold leading-5 text-gray-500 text-gray-900'>
              ID PROJECT : {infoProjectDetailId}
            </p>
            <button
              // onClick={() => {
              // 	infoProjectDetailId &&
              // 		listUrlScan &&
              // 		handleScreenShotJobQueue(
              // 			infoProjectDetailId,
              // 			listUrlScan,
              // 			false
              // 		);
              // }}
              className='ml-auto mr-2 hidden rounded-full bg-purple-500 px-4 py-2 text-small font-bold text-white hover:bg-blue-700'
            >
              Screenshot base
            </button>
            <button
              onClick={() => {
                createCommitDocs();
                setIsScreenshoting(true);
                setIsTabVisualCheck(true);
              }}
              disabled={isPending}
              className='mr-auto flex gap-5 rounded-full bg-purple-400 px-4 py-2 text-small font-bold text-white hover:bg-blue-700'
            >
              {isScreenshoting && <Loader width='5' height='5' />}
              Screenshot visual check
            </button>
          </div>
        </div>
        {isError && <div>Error</div>}
        <div className='flex basis-1/2 flex-nowrap justify-between text-slate-950'>
          <div className='text-center'>
            <h6 className='text-deep-purple-accent-400 font-500 text-3xl text-slate-950'>
              {countPages}
            </h6>
            <p className='font-bold'>Pages</p>
          </div>
          <div className='text-center'>
            <h6 className='text-deep-purple-accent-400 font-500 text-3xl text-slate-950'>
              0
            </h6>
            <p className='font-bold'>Success</p>
          </div>
          <div className='text-center'>
            <h6 className='text-deep-purple-accent-400 font-500 text-3xl'>0</h6>
            <p className='font-bold'>Failed</p>
          </div>
          <div className='text-center'>
            <h6 className='text-deep-purple-accent-400 font-500 text-3xl'>
              {isScreenshoting ? (
                <Loader width='5' height='5' />
              ) : (
                new Date().toLocaleTimeString()
              )}
            </h6>
            <p className='font-bold'>Fnished at</p>
          </div>
        </div>
      </div>
    );
  }
);

BarStats.displayName = 'BarStats';
