import API from '@/libs/axios';
import { AmountData, Store, Withdraw } from '@/types/admin';

export const fetchAllStores = async (): Promise<Store[]> => {
  const response = await API.get('/admin/getAllStore');

  return response.data;
};

export const fetchStoreById = async (storeId: number): Promise<Store> => {
  const response = await API.get(`/admin/getStoreById/${storeId}`);

  return response.data;
};

export const fetchTopSeller = async (): Promise<Store> => {
  const response = await API.get('/admin/getTopSeller');

  return response.data;
};

export const fetchWithdrawRequests = async (): Promise<Withdraw[]> => {
  const response = await API.get('/admin/withdraw');
  return response.data;
};

export const processWithdrawRequest = async (
  withdrawId: number,
  action: 'accept' | 'reject'
): Promise<{ message: string }> => {
  const response = await API.post('/admin/withdraw/process', {
    withdrawId,
    action,
  });
  return response.data;
};

export const fetchStoreAndWithdrawsAmount = async (): Promise<AmountData> => {
  const response = await API.get('/admin/amount');
  return response.data;
};
