import { useQuery } from '@tanstack/react-query';
import { getInvoices } from '../services/invoices';

export const useGetInvoices = () => {
  return useQuery({
    queryKey: ['getInvoices'],
    queryFn: () => getInvoices(),
    throwOnError: true,
    refetchOnWindowFocus: true,
  });
};
