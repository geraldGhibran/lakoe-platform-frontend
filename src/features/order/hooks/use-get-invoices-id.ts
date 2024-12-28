import { useQuery } from '@tanstack/react-query';
import { GetInvoicesId } from '../services/invoices-id';
import { useLocation } from 'react-router-dom';

export const useGetInvoicesId = () => {
  const location = useLocation();
  const id = location.state?.id;

  const query = useQuery({
    queryKey: ['getInvoices', id],
    queryFn: () => GetInvoicesId(Number(id)), // Pastikan `id` dikonversi ke number jika perlu
    enabled: !!id, // Hanya panggil jika `id` ada
    refetchOnWindowFocus: false,
  });

  return query;
};
