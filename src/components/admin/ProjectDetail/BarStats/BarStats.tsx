import { FC } from 'react';

type Props = {
  userId: string;
  urlLogin?: string;
  projectId: string;
  projectName: string;
  hasBasicAuth?: boolean;
  passwordLogin?: string;
  userNameLogin?: string;
  hasPageLogin?: boolean;
  pageSnapshotCount: number;
  passwordBasicAuth?: string;
  userNameBasicAuth?: string;
};

export const BarStats: FC<Props> = ({
  passwordBasicAuth,
  userNameBasicAuth,
  pageSnapshotCount,
  passwordLogin,
  userNameLogin,
  hasBasicAuth,
  hasPageLogin,
  projectName,
  projectId,
  urlLogin,
  userId,
}) => {
  return (
    <div className='mb-10 flex justify-between gap-x-6 rounded-2xl bg-white p-4 px-4 py-16 py-5 ring-1 ring-gray-200  drop-shadow-md focus:outline-none dark:ring-gray-700'>
      <div className='flex min-w-0 basis-1/2 gap-x-4'>
        <div className='min-w-0 flex-auto'>
          <p className='title-xxl mb-2 mt-1 truncate font-bold leading-5 text-emerald-950 text-gray-500 text-gray-900'>
            PROJECT ID: {projectId}
          </p>
          <p className='title-xxl mb-2 mt-1 truncate font-bold leading-5 text-emerald-950 text-gray-500 text-gray-900'>
            PROJECT NAME: {projectName}
          </p>
          {hasBasicAuth && (
            <>
              <p className='title-xxl mb-1 mt-1 truncate font-bold leading-5 text-emerald-950 text-gray-500 text-gray-900'>
                BASIC AUTH USERNAME: {userNameBasicAuth}
              </p>
              <p className='title-xxl mb-1 mt-1 truncate font-bold leading-5 text-emerald-950 text-gray-500 text-gray-900'>
                BASIC AUTH PASSWORD: {passwordBasicAuth}
              </p>
            </>
          )}
          {hasPageLogin && (
            <>
              <p className='title-xxl mb-1 mt-1 truncate font-bold leading-5 text-emerald-950 text-gray-500 text-gray-900'>
                LOGIN PASSWORD: {passwordLogin}
              </p>
              <p className='title-xxl mb-1 mt-1 truncate font-bold leading-5 text-emerald-950 text-gray-500 text-gray-900'>
                LOGIN USERNAME: {userNameLogin}
              </p>
            </>
          )}
          <p className='title-xxl mb-1 mt-1 truncate font-bold leading-5 text-emerald-950 text-gray-500 text-gray-900'>
            LOGIN URL: {urlLogin}
          </p>
        </div>
      </div>
      <div className='flex basis-1/2 flex-nowrap justify-between text-slate-950'>
        <div className='flex flex-col justify-center text-center'>
          <h6 className='text-deep-purple-accent-400 text-3xl font-bold text-slate-950'>
            {pageSnapshotCount}
          </h6>
          <p className='font-bold'>Pages</p>
        </div>
        <div className='flex flex-col justify-center text-center'>
          <h6 className='text-deep-purple-accent-400 text-3xl font-bold text-slate-950'>
            0
          </h6>
          <p className='font-bold'>Success</p>
        </div>
        <div className='flex flex-col justify-center text-center'>
          <h6 className='text-deep-purple-accent-400 text-3xl font-bold'>0</h6>
          <p className='font-bold'>Failed</p>
        </div>
        <div className='flex flex-col justify-center text-center'>
          <h6 className='text-deep-purple-accent-400 text-3xl font-bold'>0</h6>
          <p className='font-bold'>Finished at</p>
        </div>
      </div>
    </div>
  );
};
