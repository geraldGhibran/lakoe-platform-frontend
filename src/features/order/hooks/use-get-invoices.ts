import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { acceptPaid, getInvoices } from '../services/invoices';
import { toaster } from '@/components/ui/toaster-placement';

export const useGetInvoices = () => {
  return useQuery({
    queryKey: ['getInvoices'],
    queryFn: () => getInvoices(),
    throwOnError: true,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
};

export const useAcceptPaid = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['acceptOrder'],
    mutationFn: (id: number | undefined) => acceptPaid(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getInvoices'] });
      toaster.create({
        title: 'Pesanan berhasil di terima',
        type: 'success',
        duration: 3000,
        description: 'Your Pesanan berhasil di terima',
      });
    },
    onMutate: () => {
      toaster.create({
        title: 'Loading...',
        description: 'Were working on it...',
        type: 'info',
        duration: 3000,
      });
    },

    onError: (error: Error) => {
      toaster.create({
        title: 'Error Accept Order',
        type: 'error',
        duration: 3000,
        description: error.message || 'An error occurred, please try again',
      });
    },
    throwOnError: true,
  });
};
