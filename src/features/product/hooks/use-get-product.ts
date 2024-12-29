import { useQuery } from '@tanstack/react-query';
import { getProductService } from '../services/product';

export const useGetProductSeller = () => {
  return useQuery({
    queryKey: ['getProductSeller'],
    queryFn: () => getProductService(),
  });
};
