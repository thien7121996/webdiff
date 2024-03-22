import { ComparePercentType, TOTAL_PERCENT } from '@/hooks/compareImage.hooks';
import { FC } from 'react';

type Props = {
  comparePercent: ComparePercentType;
};

export const ProcessBar: FC<Props> = ({ comparePercent }) => {
  const { diff, match } = comparePercent;

  return (
    <div className='px-10'>
      <div className='flex h-8 w-full items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700'>
        {diff || match ? (
          <>
            <div
              className={`${TOTAL_PERCENT === match ? 'rounded-full' : 'rounded-l-lg'} flex h-4 h-8 items-center justify-center overflow-hidden bg-blue-600`}
              style={{ width: `${match}%` }}
            >
              {match < 4 ? null : `${match}%`}
            </div>
            <div
              className={`${TOTAL_PERCENT === diff ? 'rounded-full' : 'rounded-r-lg'} bg-red-600 flex h-4 h-8 items-center justify-center overflow-hidden`}
              style={{ width: `${diff}%` }}
            >
              {diff < 4 ? null : `${diff}%`}
            </div>
          </>
        ) : (
          <div>0%</div>
        )}
      </div>
    </div>
  );
};
