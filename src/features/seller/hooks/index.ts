import { useQuery } from '@tanstack/react-query';
import { fetchSellerData } from '@/store/seller';
import { Store } from '@/types/seller';

export const useSellerData = () => {
  return useQuery<Store, Error>({
    queryKey: ['sellerData'],
    queryFn: fetchSellerData,
    staleTime: 1000 * 60 * 5,
  });
};
