import { useQuery } from '@tanstack/react-query';
import { getLocationById } from '../services/store';

export const useGetLocationById = (id: number) => {
  return useQuery({
    queryKey: ['locationById', id],
    queryFn: () => getLocationById(id),
    enabled: !!id,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    throwOnError: true,
  });
};
