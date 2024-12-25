import {
  fetchAllStores,
  fetchStoreAndWithdrawsAmount,
  fetchStoreById,
  fetchWithdrawRequests,
  processWithdrawRequest,
} from '@/store/admin';
import { AmountData, Store, Withdraw } from '@/types/admin';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useAllStores = () => {
  return useQuery<Store[], Error>({
    queryKey: ['stores'],
    queryFn: fetchAllStores,
    staleTime: 1000 * 60 * 5,
  });
};

export const useStoreById = (storeId: number) => {
  return useQuery<Store, Error>({
    queryKey: ['store', storeId],
    queryFn: () => fetchStoreById(storeId),
    staleTime: 1000 * 60 * 5,
  });
};

export const useTopSeller = () => {
  return useQuery<Store, Error>({
    queryKey: ['topSeller'],
    queryFn: () => fetchStoreById(1),
    staleTime: 1000 * 60 * 5,
  });
};

export const useWithdrawRequests = () => {
  return useQuery<Withdraw[], Error>({
    queryKey: ['withdrawRequests'],
    queryFn: fetchWithdrawRequests,
    staleTime: 1000 * 60 * 5,
  });
};

export const useProcessWithdrawRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      withdrawId,
      action,
    }: {
      withdrawId: number;
      action: 'accept' | 'reject';
    }) => processWithdrawRequest(withdrawId, action),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['withdrawRequests'] });
    },
  });
};

export const useStoreAndWithdrawsAmount = () => {
  return useQuery<AmountData, Error>({
    queryKey: ['storeAndWithdrawsAmount'],
    queryFn: fetchStoreAndWithdrawsAmount,
    staleTime: 1000 * 60 * 5,
  });
};
