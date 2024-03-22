import { useNotification } from '@/hooks/useNotification';
import { convertMessageResponse } from '@/utils/messageResponse';
import { useCallback, useState } from 'react';

/** Catch error */
export const useHandleError = () => {
  const [errorRes, setErrorRes] = useState<any>();
  const { setNotification } = useNotification();

  const handleError = useCallback(
    (error: any) => {
      setNotification({
        type: 'error',
        message: convertMessageResponse('DEFAULT_MESSAGE'),
      });
      setErrorRes(convertMessageResponse('DEFAULT_MESSAGE'));
    },
    [setNotification]
  );

  return {
    errorRes,
    handleError,
    setErrorRes,
  };
};
