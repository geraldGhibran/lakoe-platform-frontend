import API from '@/libs/axios';
import { Store } from '@/types/seller';

export const fetchSellerData = async (): Promise<Store> => {
  const response = await API.get('/seller');
  return response.data;
};
