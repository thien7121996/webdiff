import { useQueryClient } from '@tanstack/react-query';

export const useGetFetchQuery = (key: (string | string[])[]): any => {
  const queryClient = useQueryClient();
  return queryClient.getQueryData(key);
};
