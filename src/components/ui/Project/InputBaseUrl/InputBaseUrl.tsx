import { InfoBaseUrl } from '@/components/pages/ProjectDetailPage/AddNewPageSnapModal/AddNewPageSnapModal';
import { FC } from 'react';

type Props = {
  onGetTextUrl: (url: InfoBaseUrl) => void;
};

export const InputBaseUrl: FC<Props> = ({ onGetTextUrl }) => {
  return (
    <div className='mb-8 border-b-2'>
      <label
        htmlFor='message'
        className='mb-3 block text-left text-sm font-medium text-dark'
      >
        Base Url
      </label>
      <div className='mb-4'>
        <input
          type='text'
          name='urlbase'
          onChange={(e) =>
            onGetTextUrl({ isPagePrivate: false, urlBase: e.target.value })
          }
          placeholder='exp: https://example.com'
          className='border-stroke dark:shadow-two w-full rounded-md border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:text-body-color-dark dark:focus:border-primary dark:focus:shadow-none'
        />
      </div>
    </div>
  );
};
InputBaseUrl.displayName = 'InputBaseUrl';
