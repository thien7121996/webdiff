import Loader from '@/components/admin/common/Loader';
import { useParams } from 'next/navigation';
import { TableBody } from './TableBody';
import { TableHead } from './TableHead';
import { useCommits } from './commits.hooks';

export const CommitsTabContent = () => {
  const params = useParams();

  const { isError, isLoading, commits } = useCommits(
    params?.projectId as string
  );

  if (isError) {
    return <div>Error</div>;
  }

  if (isLoading) {
    return (
      <div className='flex h-96 w-full items-center justify-center gap-10 font-bold'>
        <p>Loading List Check</p>
        <Loader />
      </div>
    );
  }

  if (!commits) {
    return <div>Empty</div>;
  }

  return (
    <>
      <table className='w-full'>
        <TableHead />
        <TableBody commits={commits} />
      </table>
    </>
  );
};
