import { useQuery } from '@tanstack/react-query';
import { getTemplateMessageById } from '../services/store';

export const useGetTemplateMessageById = (id: number) => {
  return useQuery({
    queryKey: ['templateMessageById', id],
    queryFn: () => getTemplateMessageById(id),
    enabled: !!id,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    throwOnError: true,
  });
};
