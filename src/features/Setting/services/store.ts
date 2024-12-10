import API from '@/libs/axios';
import { Store } from '@/types/store';

export const getDetailStore = async (userId: number): Promise<Store> => {
  try {
    const response = await API.get(`/store/${userId}`);
    return response.data as Store;
  } catch (error) {
    console.error('Error in getDetailUser:', error);
    throw error;
  }
};

export const updateStoreData = async (formData: FormData, userId: number) => {
  const response = await API.put<Store>(`/store/edit/${userId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  if (response.status === 200) {
    return await getDetailStore(userId);
  }

  return response.data;
};
