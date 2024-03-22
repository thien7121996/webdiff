import { useNotification } from '@/hooks/useNotification';
import { PageSnapShotType } from '@/models/pageSnapShot.model';
import { changeVisualReference } from '@/services/visualSnapshot';
import { FC } from 'react';

type Props = {
  projectId?: string;
  snapShotId?: string;
  snapShotObject?: PageSnapShotType;
  comparePercent: {
    match: number;
    diff: number;
  };
};

export const BarStatus: FC<Props> = ({
  projectId,
  snapShotId,
  snapShotObject,
  comparePercent,
}) => {
  const { setNotification } = useNotification();

  const handleChangeReference = async (
    projectId: string,
    pageSnapShotId: string,
    pageVisualSnapShotId: string
  ) => {
    try {
      await changeVisualReference({
        projectId,
        pageSnapShotId,
        pageVisualSnapShotId,
      });
      setNotification({
        type: 'success',
        message: 'Change reference successfully',
      });
    } catch (error) {
      setNotification({
        type: 'error',
        message: 'Change reference failed',
      });
    }
  };

  return (
    <div className='mb-10 flex justify-between gap-x-6 rounded-xl bg-white p-4 px-4 py-16 py-5 ring-1 ring-gray-200  drop-shadow-lg focus:outline-none dark:ring-gray-700'>
      <div className='flex min-w-0 basis-1/2 gap-x-4'>
        <div className='min-w-0 flex-auto'>
          <p className='title-xxl mb-5 mt-1 truncate font-bold leading-5 text-gray-500 text-gray-900'>
            URL PAGE: {snapShotObject?.url}
          </p>
          <span className='mr-5'>ID: {snapShotObject?.id}</span>
          <button
            onClick={() =>
              snapShotId &&
              snapShotObject?.id &&
              handleChangeReference(
                projectId as string,
                snapShotId,
                snapShotObject.id
              )
            }
            className='ml-auto mr-2 rounded-full bg-purple-500 px-4 py-2 text-small font-bold text-white hover:bg-blue-700'
          >
            Change Reference
          </button>
        </div>
      </div>
      <div className='flex basis-1/2 flex-nowrap justify-between text-slate-950'>
        <div className='text-center'>
          <h6 className='text-deep-purple-accent-400 text-3xl font-bold text-slate-950'>
            {comparePercent.match}%{' '}
          </h6>
          <p className='font-bold'>Match</p>
        </div>
        <div className='text-center'>
          <h6 className='text-deep-purple-accent-400 text-3xl font-bold text-slate-950'>
            {comparePercent.diff}%{' '}
          </h6>
          <p className='font-bold'>Diff</p>
        </div>
        <div className='text-center'>
          <h6 className='text-deep-purple-accent-400 text-3xl font-bold'>0</h6>
          <p className='font-bold'>Fnished at</p>
        </div>
      </div>
    </div>
  );
};
BarStatus.displayName = 'BarStatus';
