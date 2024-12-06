import { useQuery } from '@tanstack/react-query';
import { getDetailStore } from '../services/store';

export const useGetStoreDetail = (userId: number) => {
  return useQuery({
    queryKey: ['storeDetail', userId],
    queryFn: () => getDetailStore(userId),
    enabled: !!userId,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    throwOnError: true,
  });
};
