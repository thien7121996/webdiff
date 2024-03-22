import Loader from '@/components/admin/common/Loader';
import { Modal } from '@/components/ui/Modal/Modal';
import { InputBaseUrl } from '@/components/ui/Project/InputBaseUrl';
import { useBooleanState } from '@/hooks/useBooleanState';
import { useHandleError } from '@/hooks/useHandleError';
import { useNotification } from '@/hooks/useNotification';
import useCurrentUser from '@/hooks/user.hook';
import { ProjectType } from '@/models/project.model';
import { addProject } from '@/services/project';
import { Cookie, getCookie } from '@/utils/cookie';
import { Dispatch, FC, SetStateAction, useState } from 'react';

type Props = {
  setReloadData: Dispatch<SetStateAction<boolean>>;
};

type InforBaseUrl = {
  index: number;
  urlBase: string;
  isPagePrivate: boolean;
};

const InfoUrlBaseDefault: InforBaseUrl = {
  index: 0,
  urlBase: '',
  isPagePrivate: false,
};

export type InfoProject = {
  userId: string;
  name: string;
  hasPageLogin: boolean;
  urlLogin: string;
  userNameLogin: string;
  passwordLogin: string;
  hasBasicAuth: boolean;
  userNameBasicAuth: string;
  passwordBasicAuth: string;
};

const dataDefaultProject: InfoProject = {
  userId: '',
  name: '',
  hasPageLogin: false,
  urlLogin: '',
  userNameLogin: '',
  passwordLogin: '',
  hasBasicAuth: false,
  userNameBasicAuth: '',
  passwordBasicAuth: '',
};
export const BlockProjectAdd: FC<Props> = ({ setReloadData }) => {
  const [projectName, setProjectName] = useState<string>('');
  const [listBaseUrl, setListBaseUrl] = useState<InforBaseUrl[]>([
    InfoUrlBaseDefault,
  ]);
  const [hasPageLogin, setHasPageLogin] = useState(false);
  const [isBasicAuth, setIsBacsicAuth] = useState(false);
  const [isProccessing, setIsProccessing] = useState(false);
  const [dataProjectNew, setDataProjectNew] =
    useState<InfoProject>(dataDefaultProject);

  const { handleError } = useHandleError();
  const { user } = useCurrentUser();
  const { setNotification } = useNotification();

  const {
    boolean: activeModal,
    toggle: toggleActiveModal,
    setFalse: setCloseModal,
  } = useBooleanState(false);

  const handleSubmit = async () => {
    setIsProccessing(true);
    const uuid = getCookie(Cookie.UUID);
    if (!uuid) {
      return handleError(new Error('UUID not found'));
    }

    const checkErrorData = handleErrorProjectNewData();

    if (checkErrorData.error) {
      setNotification({
        type: 'error',
        message: checkErrorData.messages,
      });
      return;
    }

    try {
      const project: ProjectType = { ...dataProjectNew, userId: uuid };

      const projectRes = await addProject(project);
      // await addPageSnapShot({
      //   projectId: projectRes.id as string,
      //   baseInfo: listBaseUrl,
      // });
      setReloadData(true);
      setCloseModal();
      setNotification({
        type: 'success',
        message: 'Create Project success',
      });
    } catch (e) {
      handleError(e);
    } finally {
      setIsProccessing(false);
    }
  };

  const handleErrorInputBaseUrl = () => {
    const check = listBaseUrl.some((item) => item.urlBase === '');
    return check;
  };

  const handleErrorProjectNewData = () => {
    if (dataProjectNew.hasBasicAuth) {
      return {
        error:
          dataProjectNew.userNameBasicAuth === '' ||
          dataProjectNew.passwordBasicAuth === '',
        messages: 'Please fill in the required fields in basic auth',
      };
    }

    if (dataProjectNew.hasPageLogin) {
      return {
        error:
          dataProjectNew.urlLogin === '' ||
          dataProjectNew.userNameLogin === '' ||
          dataProjectNew.passwordLogin === '',
        messages: 'Please fill in the required fields in login auth',
      };
    }

    if (!dataProjectNew.name) {
      return {
        error: true,
        messages: 'Project name is required',
      };
    }

    return {
      error: false,
      messages: '',
    };
  };

  const handleAddUrlBase = () => {
    setListBaseUrl((prev) => [
      ...prev,
      { ...InfoUrlBaseDefault, index: prev.length },
    ]);
  };

  return (
    <div className='block h-full text-right'>
      <Modal
        open={activeModal}
        onClose={setCloseModal}
        isModalNotAlignCenter
        isAllowClickOutsideToClose={true}
        widthModal='600px'
      >
        <div
          className='shadow-three mb-12 rounded-3xl bg-white px-8 py-11 shadow-2xl sm:p-[25px] lg:mb-0 lg:px-8 xl:p-[25px]'
          data-wow-delay='.15s
              '
        >
          <h2 className='mb-3 text-left text-2xl font-bold text-black sm:text-3xl lg:text-2xl xl:text-3xl'>
            Add New Project
          </h2>
          <p className='mb-12 text-left text-base font-medium text-body-color'>
            Our support team will get back to you ASAP via email.
          </p>
          <div className='-mx-4 flex flex-wrap'>
            <div className='w-full px-4'>
              <div className='mb-4'>
                <label
                  htmlFor='name'
                  className='mb-3 block text-left text-sm font-medium text-dark'
                >
                  Project name
                </label>
                <input
                  type='text'
                  onChange={(e) =>
                    setDataProjectNew({
                      ...dataProjectNew,
                      name: e.target.value,
                    })
                  }
                  placeholder='Enter your name'
                  className='border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary'
                />
              </div>

              <div className='mb-4 flex hidden items-center'>
                <input
                  id='link-checkbox-basic-auth'
                  type='checkbox'
                  onChange={(e) => {
                    setIsBacsicAuth(!isBasicAuth);
                    setDataProjectNew({
                      ...dataProjectNew,
                      hasBasicAuth: !isBasicAuth,
                    });
                  }}
                  className='h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600'
                />
                <label
                  htmlFor='link-checkbox-basic-auth'
                  className='ms-2 text-sm font-medium text-gray-900 dark:text-gray-300'
                >
                  Has Basic Auth
                </label>
              </div>
              {isBasicAuth && (
                <div className='mb-8 grid grid-cols-2 gap-4'>
                  <div>
                    <label
                      htmlFor='userNameBasicAuth'
                      className='block text-left text-sm font-medium text-gray-700'
                    >
                      UserName
                    </label>
                    <input
                      type='text'
                      id='userNameBasicAuth'
                      name='userNameBasicAuth'
                      onChange={(e) =>
                        setDataProjectNew({
                          ...dataProjectNew,
                          userNameBasicAuth: e.target.value,
                        })
                      }
                      className='mt-1 w-full rounded-md border bg-[#f8f8f8] p-2'
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='passWordBasicAuth'
                      className='block text-left text-sm font-medium text-gray-700'
                    >
                      Password
                    </label>
                    <input
                      type='text'
                      id='passWordBasicAuth'
                      name='passWordBasicAuth'
                      onChange={(e) =>
                        setDataProjectNew({
                          ...dataProjectNew,
                          passwordBasicAuth: e.target.value,
                        })
                      }
                      className='mt-1 w-full rounded-md border bg-[#f8f8f8] p-2'
                    />
                  </div>
                </div>
              )}

              <div className='mb-4 flex hidden items-center'>
                <input
                  id='link-checkbox-basic-auth'
                  type='checkbox'
                  onChange={(e) => {
                    setHasPageLogin(!hasPageLogin);
                    setDataProjectNew({
                      ...dataProjectNew,
                      hasPageLogin: !hasPageLogin,
                    });
                  }}
                  className='h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600'
                />
                <label
                  htmlFor='link-checkbox-basic-auth'
                  className='ms-2 text-sm font-medium text-gray-900 dark:text-gray-300'
                >
                  Has Page Login
                </label>
              </div>
              {hasPageLogin && (
                <>
                  <div className='mb-4'>
                    <label
                      htmlFor='urlLogin'
                      className='mb-3 block text-left text-sm font-medium text-dark'
                    >
                      Url login page
                    </label>
                    <input
                      type='text'
                      onChange={(e) =>
                        setDataProjectNew({
                          ...dataProjectNew,
                          urlLogin: e.target.value,
                        })
                      }
                      placeholder='Url login page'
                      className='border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary'
                    />
                  </div>
                  <div className='mb-8 grid grid-cols-2 gap-4'>
                    <div>
                      <label
                        htmlFor='userNameLogin'
                        className='block text-left text-sm font-medium text-gray-700'
                      >
                        UserName
                      </label>
                      <input
                        type='text'
                        id='userNameLogin'
                        name='userNameLogin'
                        onChange={(e) =>
                          setDataProjectNew({
                            ...dataProjectNew,
                            userNameLogin: e.target.value,
                          })
                        }
                        className='mt-1 w-full rounded-md border bg-[#f8f8f8] p-2'
                      />
                    </div>
                    <div>
                      <label
                        htmlFor='passWordLogin'
                        className='block text-left text-sm font-medium text-gray-700'
                      >
                        Password
                      </label>
                      <input
                        type='text'
                        id='passWordLogin'
                        name='passWordLogin'
                        onChange={(e) =>
                          setDataProjectNew({
                            ...dataProjectNew,
                            passwordLogin: e.target.value,
                          })
                        }
                        className='mt-1 w-full rounded-md border bg-[#f8f8f8] p-2'
                      />
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className='hidden max-h-60 w-full overflow-y-scroll px-4 px-4'>
              {listBaseUrl.map((item, index) => (
                <InputBaseUrl
                  key={index}
                  setListUrlBase={setListBaseUrl}
                  dataUrlBase={item}
                  listUrlBase={listBaseUrl}
                />
              ))}
            </div>
            <div className='hidden w-full px-4'>
              <button
                onClick={handleAddUrlBase}
                className='shadow-submit mb-8 rounded-2xl bg-primary px-4  py-2 text-base font-medium text-white duration-300 hover:bg-primary/90'
              >
                Add Url
              </button>
            </div>
            <div className='flex w-full justify-end gap-10 px-4'>
              {isProccessing && (
                <div className='flex items-center gap-5 align-bottom font-bold'>
                  <span>Processing...</span>
                  <Loader />
                </div>
              )}
              <button
                onClick={handleSubmit}
                className='shadow-submit rounded-2xl bg-primary px-4  py-2 text-base font-medium text-white duration-300 hover:bg-primary/90'
              >
                Create Project
              </button>
            </div>
          </div>
        </div>
      </Modal>
      <button
        onClick={toggleActiveModal}
        className='inline-flex items-center rounded rounded-2xl bg-primary px-4 py-2 font-bold text-white hover:bg-gray-400'
      >
        <span>New Project</span>
      </button>
    </div>
  );
};
