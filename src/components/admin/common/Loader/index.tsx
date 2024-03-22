import { FC } from 'react';

type Props = {
  height?: string;
  weight?: string;
};

const Loader: FC<Props> = ({ height, weight }) => {
  const heightDiv = height ?? '10';
  const weightDiv = weight ?? '10';
  return (
    <div className='flex items-center justify-center'>
      <div
        className={`h-${heightDiv} w-${weightDiv} animate-spin rounded-full border-4 border-solid border-primary border-t-transparent`}
      ></div>
    </div>
  );
};

export default Loader;
