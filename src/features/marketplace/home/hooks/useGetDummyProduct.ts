import { useQuery } from '@tanstack/react-query';
import { getDummyProduct } from '../services/dummy-product';

export const useGetDummyProduct = () => {
  return useQuery({
    queryKey: ['dummyProduct'],
    queryFn: () => getDummyProduct(),
    throwOnError: true,
  });
};
