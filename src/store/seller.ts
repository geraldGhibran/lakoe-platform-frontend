import API from '@/libs/axios';
import { Withdraw } from '@/types/admin';
import { Store } from '@/types/seller';

export const fetchSellerData = async (): Promise<Store> => {
  const response = await API.get('/seller');
  return response.data;
};

export const postWithdrawRequest = async (amount: number): Promise<void> => {
  const response = await API.post('/withdraw', { amount });
  return response.data;
};

export const fetchWithdraws = async (): Promise<Withdraw[]> => {
  const response = await API.get('/withdraw/check');
  return response.data;
};
