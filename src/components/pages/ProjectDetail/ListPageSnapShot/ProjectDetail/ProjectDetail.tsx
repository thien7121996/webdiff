import { PageSnapShotType } from '@/models/pageSnapShot.model';
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { BarStats } from './BarStats';
import { TablePageSnapshot } from './TablePageSnapshot';
import { useScreenshot } from './screenshot.hooks';

type Props = {
  toggleActiveModal: () => void;
  pageSnapShots?: PageSnapShotType[];
  infoProjectDetailId?: string;
  infoProjectDetailName?: string;
  setNewPageModalOpen: () => void;
  setPageSnapshotCurrent: Dispatch<
    SetStateAction<PageSnapShotType | undefined>
  >;
  handleGetDetailProject: () => Promise<void>;
};

export const ProjectDetail: FC<Props> = ({
  pageSnapShots,
  infoProjectDetailName,
  infoProjectDetailId,
  toggleActiveModal,
  setPageSnapshotCurrent,
  handleGetDetailProject,
  setNewPageModalOpen,
}) => {
  const [listUrlScan, setListUrlScan] = useState<PageSnapShotType[]>();

  useEffect(() => {
    setListUrlScan(pageSnapShots);
  }, [pageSnapShots]);

  const [idJobProgressing, setIdJobProgressing] = useState<string>();

  const {
    isLoading,
    handleScreenShot,
    progress,
    handleScreenShotJobQueue,
    jobQueueProcess,
    isQueueRunning,
  } = useScreenshot();

  const handleGetListHistoryCheck = (pageSnapShot: PageSnapShotType) => {
    setPageSnapshotCurrent(pageSnapShot);
  };

  const handleJobProgressing = (id?: string) => {
    if (!id) {
      return;
    }
    setIdJobProgressing(id);
  };

  useEffect(() => {
    handleJobProgressing(jobQueueProcess[0]?.id);
  }, [jobQueueProcess]);

  useEffect(() => {
    if (!isQueueRunning) {
      handleGetDetailProject();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isQueueRunning]);

  return (
    <div>
      <div className='mb-5 grid grid-cols-3 gap-4'>
        <div className='col-span-2'>
          <h3 className='text-3xl font-medium'>
            Project: {infoProjectDetailName}
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
        countPages={listUrlScan?.length ?? 0}
        listUrlScan={listUrlScan}
        infoProjectDetailId={infoProjectDetailId}
        handleScreenShotJobQueue={handleScreenShotJobQueue}
      />
      {infoProjectDetailId && (
        <TablePageSnapshot
          dataPageSnapShot={listUrlScan}
          isLoading={isLoading}
          idJobProgressing={idJobProgressing}
          jobQueueProcess={jobQueueProcess}
          toggleActiveModal={toggleActiveModal}
          infoProjectDetailId={infoProjectDetailId}
          progress={progress}
          handleJobProgressing={handleJobProgressing}
          handleScreenShot={handleScreenShot}
          handleGetListHistoryCheck={handleGetListHistoryCheck}
          handleGetDetailProject={handleGetDetailProject}
        />
      )}
    </div>
  );
};

ProjectDetail.displayName = 'ProjectDetail';
