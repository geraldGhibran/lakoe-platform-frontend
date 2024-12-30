import { useQuery } from '@tanstack/react-query';
import { GetInvoicesId } from '../services/invoices-id';
import { useLocation } from 'react-router-dom';

export const useGetInvoicesId = () => {
  const location = useLocation();

  const id = location.state?.id;

  const query = useQuery({
    queryKey: ['getInvoicesById', id],
    queryFn: () => GetInvoicesId(id),
    enabled: !!id,
    refetchOnWindowFocus: true,
    retry: false,
  });

  return query;
};
