import { useQuery } from '@tanstack/react-query';
import API from '@/libs/axios';

export const useGetProductDetail = (name: string) => {
  return useQuery({
    queryKey: ['productDetail', name],
    queryFn: async () => {
      const response = await API.post('/product/getByName', { name });
      console.log('API Response:', response.data);
      return response.data;
    },
    enabled: !!name,
  });
};
