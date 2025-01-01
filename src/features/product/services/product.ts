import API from '@/libs/axios';

export const getProductService = async () => {
  const response = await API.get(`/product`);
  return response.data;
};
