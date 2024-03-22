import { PageSnapShotType } from '@/models/pageSnapShot.model';
import { useParams } from 'next/navigation';
import { FC, useEffect, useState } from 'react';
import { BarStats } from './BarStats';
import { Tabs } from './Tabs';
import { useCommits } from './Tabs/TabContent/CommitsTabContent/commits.hooks';

type Props = {
  pageSnapshot: PageSnapShotType[];
  infoProjectDetailName?: string;
  infoProjectDetailId?: string;
  pageSnapCount: number;
  urlList: string[];
  setNewPageModalOpen: () => void;
  reloadProject: () => void;
};

export const ProjectDetail: FC<Props> = ({
  infoProjectDetailName,
  infoProjectDetailId,
  pageSnapCount,
  pageSnapshot,
  urlList,
  setNewPageModalOpen,
  reloadProject,
}) => {
  const { projectId } = useParams();
  const { isError, isLoading, commits } = useCommits(projectId as string);
  const [isProccessing, setIsProccessing] = useState(false);

  useEffect(() => {
    const check = commits?.some((commit) => commit.screenshotingUrl !== null);
    if (check) {
      setIsProccessing(true);
    }
  }, [commits]);
  return (
    <div>
      <div className='ga mb-5 grid grid-cols-3 gap-4'>
        <div className='col-span-2'>
          <h3 className='text-3xl font-medium'>
            Project name: {infoProjectDetailName}
          </h3>
        </div>

        <div className='text-right'>
          <button
            onClick={setNewPageModalOpen}
            className='ml-auto rounded-full bg-emerald-400 px-4 py-2 text-base font-bold text-white hover:bg-blue-700'
          >
            Add page snapshot
          </button>
        </div>
      </div>
      <BarStats
        countPages={pageSnapCount}
        urlList={urlList}
        infoProjectDetailId={infoProjectDetailId}
        isProccessing={isProccessing}
      />
      <Tabs pageSnapshot={pageSnapshot} reloadProject={reloadProject} />

      {/* {infoProjectDetailId && <TablePageSnapshot />} */}
    </div>
  );
};

ProjectDetail.displayName = 'ProjectDetail';
