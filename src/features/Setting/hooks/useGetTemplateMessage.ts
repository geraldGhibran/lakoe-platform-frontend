import { useQuery } from '@tanstack/react-query';
import { getTemplateMessageByStoreId } from '../services/store';

export const useGetTemplateMessage = (storeId: number) => {
  return useQuery({
    queryKey: ['templateMessage', storeId],
    queryFn: () => getTemplateMessageByStoreId(storeId),
    enabled: !!storeId,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    throwOnError: true,
  });
};
