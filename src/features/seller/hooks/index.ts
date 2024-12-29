import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  fetchSellerData,
  fetchWithdraws,
  postWithdrawRequest,
} from '@/store/seller';
import { Store } from '@/types/seller';
import { Withdraw } from '@/types/admin';

export const useSellerData = () => {
  return useQuery<Store, Error>({
    queryKey: ['sellerData'],
    queryFn: fetchSellerData,
    staleTime: 1000 * 60 * 5,
  });
};

export const useWithdraw = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postWithdrawRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['withdraws'] });
    },
    onError: (error: Error | string) => {
      console.error('Withdraw failed:', error);
    },
  });
};

export const useWithdraws = () => {
  return useQuery<Withdraw[], Error>({
    queryKey: ['withdraws'],
    queryFn: fetchWithdraws,
    staleTime: 1000 * 60 * 5,
  });
};
