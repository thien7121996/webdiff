import { FC } from 'react';

type Props = {
  visualId: string;
  pageSnapshotUrl: string;
  visualPath: string;
  ordinalNumber: number;
  visualReference: boolean;
};

export const PageVisualSnapshot: FC<Props> = ({
  visualReference,
  pageSnapshotUrl,
  ordinalNumber,
  visualPath,
  visualId,
}) => {
  return (
    <div>
      <table className='w-full'>
        <thead></thead>
        <tbody>
          <tr className='w-full border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600'>
            <td className='p-4'>
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
            <td
              scope='row'
              className='whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white'
            >
              {visualId}
            </td>
            <td className='px-6 py-4'>
              #{ordinalNumber}: {pageSnapshotUrl}
            </td>
            <td className='px-6 py-4'>
              {!!visualPath
                ? 'Screenshot available'
                : 'Screenshot not available'}
            </td>
            <td className='px-6 py-4'>
              {visualReference ? 'Reference' : 'No reference'}
            </td>
            <td className='flex gap-2 px-6 py-4'>
              <div className='relative right-0'>
                <button
                  id='dropdownInformationButton'
                  data-dropdown-toggle='dropdownInformation'
                  className='group inline-flex items-center rounded-lg px-5 py-2.5 text-left text-sm text-gray-900 focus:outline-none focus:ring-4 focus:ring-blue-300'
                  type='button'
                >
                  <svg
                    className='h-5 w-5'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='currentColor'
                    viewBox='0 0 16 3'
                  >
                    <path d='M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z' />
                  </svg>

                  <div className='z-104 absolute right-0 top-8 z-10 hidden w-44 divide-y divide-gray-100 rounded-lg bg-white shadow group-hover:block dark:divide-gray-600 dark:bg-gray-700'>
                    <div className='px-4 py-3 text-sm text-gray-900 dark:text-white'>
                      <div>History action</div>
                    </div>
                    <ul
                      className='py-2 text-sm text-gray-700 dark:text-gray-200'
                      aria-labelledby='dropdownInformationButton'
                    >
                      <li>
                        <a
                          href='#'
                          // onClick={() =>
                          // 	pageSnapShot.id &&
                          // 	visualId &&
                          // 	handleDeleteVisual(
                          // 		projectId as string,
                          // 		pageSnapShot.id,
                          // 		visualId
                          // 	)
                          // }
                          className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                        >
                          Delete
                        </a>
                      </li>
                      {/* <li>
													{pageSnapShot && (
														<Link
															href={`${pathname}/${pageSnapShot.id}`}
															rel="noopener noreferrer"
															target="_blank"
															className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
														>
															View Check Visual
														</Link>
													)}
												</li> */}
                    </ul>
                  </div>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
