import { Modal } from '@/components/ui/Modal';
import { PageSnapShotType } from '@/models/pageSnapShot.model';
import { FC } from 'react';
import { ListHistoryCheckPage } from './ListHistoryCheckPage';

type Props = {
  activeModal: boolean;
  setCloseModal: () => void;
  pageSnapshotCurrent?: PageSnapShotType;
  handleGetDetailProject: () => Promise<void>;
};

export const HistoryCheckModal: FC<Props> = ({
  handleGetDetailProject,
  pageSnapshotCurrent,
  setCloseModal,
  activeModal,
}) => {
  return (
    <Modal
      open={activeModal}
      onClose={setCloseModal}
      isAllowClickOutsideToClose={true}
      widthModal={'90%'}
    >
      <div
        className='shadow-three mb-12 rounded-sm rounded-xl bg-white px-8 py-11 shadow-2xl sm:p-[55px] lg:mb-0 lg:px-8 xl:p-[25px]'
        data-wow-delay='.15s
  '
      >
        <h2 className='mb-3 text-2xl font-bold text-black dark:text-black sm:text-3xl lg:text-2xl xl:text-3xl'>
          List Visual Check
        </h2>
        <p className='mb-12 text-base font-medium text-body-color'>
          Our support team will get back to you ASAP via email.
        </p>
        <div className='max-h-400 h-500 mx-4 flex h-80 flex-wrap overflow-y-scroll'>
          <ListHistoryCheckPage
            handleGetDetailProject={handleGetDetailProject}
            pageSnapShot={pageSnapshotCurrent}
          />
        </div>
      </div>
    </Modal>
  );
};

HistoryCheckModal.displayName = 'HistoryCheckModal';
