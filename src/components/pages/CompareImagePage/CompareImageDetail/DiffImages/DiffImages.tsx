import Loader from '@/components/admin/common/Loader';
import { FC, RefObject } from 'react';

type Props = {
  imageWrapperRef: RefObject<HTMLTableCellElement>;
  imageACanvasRef: RefObject<HTMLCanvasElement>;
  imageBCanvasRef: RefObject<HTMLCanvasElement>;
  diffRef: RefObject<HTMLCanvasElement>;
  isLoading: boolean;
};

export const DiffImages: FC<Props> = ({
  imageACanvasRef,
  imageBCanvasRef,
  imageWrapperRef,
  isLoading,
  diffRef,
}) => {
  const LoadingComponent = isLoading && <Loader />;

  return (
    <div className='relative select-none overflow-hidden'>
      <table className='w-full text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right'>
        <thead className='bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400'>
          <tr>
            <th scope='col' className='px-6 py-3'>
              Base Web
            </th>
            <th scope='col' className='px-2 py-2'>
              Current Web
            </th>
            <th scope='col' className='px-6 py-3'>
              Diff
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className='h-full border-b bg-white dark:border-gray-700 dark:bg-gray-800'>
            <td className='w-1/3 px-6 py-4 align-top' ref={imageWrapperRef}>
              {LoadingComponent}
              {!isLoading && (
                <canvas ref={imageACanvasRef} className='w-full' />
              )}
            </td>
            <td className='w-1/3 px-6 py-4 align-top'>
              {LoadingComponent}
              {!isLoading && (
                <canvas ref={imageBCanvasRef} className='w-full' />
              )}
            </td>
            <td className='w-1/3 px-6 py-4 align-top'>
              {LoadingComponent}
              {!isLoading && <canvas ref={diffRef} className='w-full' />}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

DiffImages.displayName = 'DiffImages';
