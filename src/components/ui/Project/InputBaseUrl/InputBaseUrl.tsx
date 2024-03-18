import { FC, useEffect, useState } from 'react';

type InforBaseUrl = {
  index: number;
  urlBase: string;
  isPagePrivate: boolean;
};

type Props = {
  setListUrlBase: React.Dispatch<React.SetStateAction<InforBaseUrl[]>>;
  dataUrlBase: InforBaseUrl;
  listUrlBase: InforBaseUrl[];
};
export const InputBaseUrl: FC<Props> = ({
  setListUrlBase,
  dataUrlBase,
  listUrlBase,
}) => {
  const [displayAuth, setDisplayAuth] = useState(false);
  const [inforUrlBase, setInfoUrlBase] = useState<InforBaseUrl>(dataUrlBase);
  useEffect(() => {
    setListUrlBase((prev) => {
      const newList = [...prev];
      newList[dataUrlBase.index] = inforUrlBase;
      return newList;
    });
  }, [dataUrlBase.index, inforUrlBase, setListUrlBase]);

  const handleDeleteItemUrlBase = () => {
    setListUrlBase((prev) => {
      const newList = [...prev];
      newList.splice(dataUrlBase.index, 1);
      return newList;
    });
  };
  return (
    <div className='mb-8 border-b-2'>
      <label
        htmlFor='message'
        className='mb-3 block text-left text-sm font-medium text-dark'
      >
        Base Url #{dataUrlBase.index + 1}{' '}
        {dataUrlBase.index === listUrlBase.length - 1 &&
          dataUrlBase.index > 0 && (
            <a
              href='#'
              className='text-rose-500'
              onClick={handleDeleteItemUrlBase}
            >
              Remove
            </a>
          )}
      </label>
      <div className='mb-4'>
        <input
          type='text'
          name='urlbase'
          onChange={(e) =>
            setInfoUrlBase({ ...inforUrlBase, urlBase: e.target.value })
          }
          placeholder='exp: https://example.com'
          className='border-stroke dark:shadow-two w-full rounded-md border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:text-body-color-dark dark:focus:border-primary dark:focus:shadow-none'
        />
      </div>
      <div className='mb-4 flex hidden items-center'>
        <input
          id='link-checkbox'
          type='checkbox'
          value=''
          onChange={() => {
            setInfoUrlBase({ ...inforUrlBase, isPagePrivate: !displayAuth });
            setDisplayAuth(!displayAuth);
          }}
          className='h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500'
        />
        <label
          htmlFor='link-checkbox'
          className='ms-2 text-sm font-medium text-gray-900 dark:text-gray-300'
        >
          Is page need Login ?
        </label>
      </div>
    </div>
  );
};
InputBaseUrl.displayName = 'InputBaseUrl';
