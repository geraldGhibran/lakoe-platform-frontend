import { useQuery } from '@tanstack/react-query';
import API from '@/libs/axios';
import { useEffect } from 'react';
import { useRatesStore } from '@/store/rates';
import { Product } from '@/@types/types';

export const useGetProductDetail = (name: string) => {
  return useQuery({
    queryKey: ['productDetail', name],
    queryFn: async () => {
      const response = await API.post('/product/getByName', { name });
      return response.data;
    },
    enabled: !!name,
  });
};

export function useSetCourierAndAreaId(productDetail: Product[]) {
  const { setCouriers, setOriginAreaId } = useRatesStore();

  useEffect(() => {
    if (
      productDetail?.[0]?.Store?.courier &&
      productDetail?.[0]?.Store?.Locations?.[0]?.area_id
    ) {
      setCouriers(productDetail[0].Store.courier);
      setOriginAreaId(productDetail[0].Store.Locations[0].area_id);
    }
  }, [productDetail, setCouriers, setOriginAreaId]);
}
