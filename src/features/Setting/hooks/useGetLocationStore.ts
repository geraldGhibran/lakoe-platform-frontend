import { useQuery } from '@tanstack/react-query';
import { getLocationByStoreId } from '../services/store';

export const useGetLocationStore = (storeId: number) => {
  return useQuery({
    queryKey: ['locationStore', storeId],
    queryFn: () => getLocationByStoreId(storeId),
    enabled: !!storeId,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    throwOnError: true,
  });
};
