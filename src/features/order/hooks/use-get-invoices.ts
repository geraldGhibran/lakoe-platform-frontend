import { useMutation, useQuery } from '@tanstack/react-query';
import { acceptPaid, getInvoices } from '../services/invoices';

export const useGetInvoices = () => {
  return useQuery({
    queryKey: ['getInvoices'],
    queryFn: () => getInvoices(),
    throwOnError: true,
    refetchOnWindowFocus: true,
  });
};

export const useAcceptPaid = () => {
  return useMutation({
    mutationKey: ['getInvoices'],
    mutationFn: (id: number | undefined) => acceptPaid(id),
    throwOnError: true,
  });
};
