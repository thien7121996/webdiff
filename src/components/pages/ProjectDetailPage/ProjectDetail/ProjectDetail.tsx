import { useParams } from 'next/navigation';
import { FC, useEffect, useState } from 'react';
import { BarStats } from './BarStats';
import { Tabs } from './Tabs';
import { useCommits } from './Tabs/TabContent/CommitsTabContent/commits.hooks';
import { useProjectDetailSocket } from './useProjectDetailSocket.hooks';

type Props = {
  setNewPageModalOpen: () => void;
  infoProjectDetailName?: string;
  infoProjectDetailId?: string;
  pageSnapCount: number;
  urlList: string[];
};

export const ProjectDetail: FC<Props> = ({
  infoProjectDetailName,
  setNewPageModalOpen,
  infoProjectDetailId,
  pageSnapCount,
  urlList,
}) => {
  useProjectDetailSocket();
  const { projectId } = useParams();
  const { commits } = useCommits(projectId as string);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isTabVisualCheck, setIsTabVisualCheck] = useState<boolean>(false);

  useEffect(() => {
    const check = commits?.some((commit) => commit.screenshotingUrl !== null);
    if (check) {
      setIsProcessing(true);
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
        isProcessing={isProcessing}
        setIsTabVisualCheck={setIsTabVisualCheck}
      />
      <Tabs isTabVisualCheck={isTabVisualCheck} />
    </div>
  );
};

ProjectDetail.displayName = 'ProjectDetail';
