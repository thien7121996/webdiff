import Loader from '@/components/admin/common/Loader';
import { Modal } from '@/components/ui/Modal';
import { InputBaseUrl } from '@/components/ui/Project/InputBaseUrl';
import { SCREENSHOT_STATUS_TYPE } from '@/types';
import { FC, useState } from 'react';
import { useAddPageSnapshot } from './useAddPageSnapshot.hooks';

type Props = {
  open: boolean;
  onClose: () => void;
};

export type InfoBaseUrl = {
  urlBase: string;
  isPagePrivate: boolean;
  screenshotStatus?: SCREENSHOT_STATUS_TYPE;
};

const infoDefault: InfoBaseUrl = {
  urlBase: '',
  isPagePrivate: false,
  screenshotStatus: SCREENSHOT_STATUS_TYPE.doing,
};

export const AddNewPageSnapModal: FC<Props> = ({ open, onClose }) => {
  const [newUrl, setNewUrl] = useState<InfoBaseUrl>(infoDefault);

  const { mutate, isPending } = useAddPageSnapshot(onClose);

  const handleAddPageSnapshot = async () => {
    mutate(newUrl);
  };

  const handleGetTextUrl = (url: InfoBaseUrl) => {
    setNewUrl(url);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      $isModalNotAlignCenter
      isAllowClickOutsideToClose={true}
      widthModal={'600px'}
    >
      <div
        className='shadow-three mb-12 rounded-3xl bg-white px-8 py-11 shadow-2xl sm:p-[25px] lg:mb-0 lg:px-8 xl:p-[25px]'
        data-wow-delay='.15s
              '
      >
        <h2 className='mb-3 text-left text-2xl font-bold text-black sm:text-3xl lg:text-2xl xl:text-3xl'>
          Add url page new
        </h2>
        <p className='mb-12 text-left text-base font-medium text-body-color'>
          Our support team will get back to you ASAP via email.
        </p>
        <div className='w-full'>
          <InputBaseUrl onGetTextUrl={handleGetTextUrl} />
        </div>
        <div className='w-full px-4'>
          <button
            onClick={handleAddPageSnapshot}
            className='shadow-submit flex w-full items-center justify-center gap-x-6 rounded-2xl bg-emerald-400 p-5  py-2 text-base font-medium text-white duration-300 hover:bg-primary/90'
          >
            {isPending && <Loader />}
            Add new pages
          </button>
        </div>
      </div>
    </Modal>
  );
};

AddNewPageSnapModal.displayName = 'AddNewPageSnapModal';
