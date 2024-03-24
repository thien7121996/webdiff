import { Modal } from '@/components/ui/Modal';
import { InputBaseUrl } from '@/components/ui/Project/InputBaseUrl';
import { useNotification } from '@/hooks/useNotification';
import { addPageSnapShot } from '@/services/pageSnapShot';
import { AxiosError } from 'axios';
import { useParams } from 'next/navigation';
import { FC, useState } from 'react';

type Props = {
  open: boolean;
  onClose: () => void;
  handleGetDetailProject: () => Promise<void>;
};
type InforBaseUrl = {
  index: number;
  urlBase: string;
  isPagePrivate: boolean;
};
const InfoDefault: InforBaseUrl = {
  index: 0,
  urlBase: '',
  isPagePrivate: false,
};
export const AddNewPageSnapModal: FC<Props> = ({
  open,
  onClose,
  handleGetDetailProject,
}) => {
  const [text, setText] = useState('');
  const [listUrlBase, setListUrlBase] = useState<InforBaseUrl[]>([InfoDefault]);
  const params = useParams();
  const { setNotification } = useNotification();

  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const handleAddPageSnapshot = async () => {
    if (handleErrorInputBaseUrl()) {
      setNotification({
        type: 'error',
        message: 'Please fill in the required fields',
      });
      return;
    }

    try {
      await addPageSnapShot({
        projectId: params.projectId as string,
        baseInfo: listUrlBase,
      });

      setNotification({
        type: 'success',
        message: 'Add page snapshot successfully',
      });
      handleGetDetailProject();
      onClose();
    } catch (error) {
      const errorMessage = (error as AxiosError).response?.data as string;
      setNotification({ type: 'error', message: errorMessage });
    }
  };

  const handleAddUrlBase = () => {
    setListUrlBase((prev) => [
      ...prev,
      { ...InfoDefault, index: prev.length + 1 },
    ]);
  };

  const handleErrorInputBaseUrl = () => {
    const check = listUrlBase.some((item) => item.urlBase === '');
    return check;
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      isModalNotAlignCenter
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
          <div className='mb-8 max-h-60 overflow-y-scroll px-4'>
            {listUrlBase.map((item, index) => (
              <InputBaseUrl
                key={index}
                setListUrlBase={setListUrlBase}
                dataUrlBase={item}
                listUrlBase={listUrlBase}
              />
            ))}

            <button
              onClick={handleAddUrlBase}
              className='shadow-submit mb-2 hidden rounded-2xl bg-primary px-4  py-2 text-base font-medium text-white duration-300 hover:bg-primary/90'
            >
              Add Url
            </button>
          </div>
        </div>
        <div className='w-full px-4'>
          <button
            onClick={handleAddPageSnapshot}
            className='shadow-submit w-full rounded-2xl bg-emerald-400 px-4  py-2 text-base font-medium text-white duration-300 hover:bg-primary/90'
          >
            Add new pages
          </button>
        </div>
      </div>
    </Modal>
  );
};

AddNewPageSnapModal.displayName = 'AddNewPageSnapModal';
