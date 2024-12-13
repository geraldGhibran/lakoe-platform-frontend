import API from '@/libs/axios';
import { Store } from '@/types/store';
import { TemplateSchema } from '../schemas/templateSchema';
import { DeleteTemplateMessageSchema } from '../schemas/deleteTemplateMessageSchema';
import { AddLocationSchema } from '../schemas/addLocationSchema';
import { EditLocationSchema } from '../schemas/editLocationSchema';

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

export const getTemplateMessageByStoreId = async (storeId: number) => {
  const response = await API.get(`/templatemessage/${storeId}`);
  return response.data;
};

export const getLocationByStoreId = async (storeId: number) => {
  const response = await API.get(`/location/${storeId}`);
  return response.data;
};

export const getLocationById = async (id: number) => {
  const response = await API.get(`/location/byId/${id}`);
  return response.data;
};

export const addLocationStore = async (data: AddLocationSchema) => {
  const response = await API.post(`/location`, data);
  return response.data;
};

export const getTemplateMessageById = async (id: number) => {
  const response = await API.get(`/templatemessage/byId/${id}`);
  return response.data;
};

export const updateTemplateMessage = async (data: TemplateSchema) => {
  const response = await API.put(`/templatemessage/edit/`, data);
  return response.data;
};

export const deleteLocation = async (id: number) => {
  const response = await API.delete(`/location/${id}`);
  return response.data;
};

export const updateLocation = async (id: number, data: EditLocationSchema) => {
  const response = await API.put(`/location/${id}`, data);
  return response.data;
};

export const deleteTemplateMessage = async (
  data: DeleteTemplateMessageSchema
) => {
  const response = await API.delete(`/templatemessage/delete`, { data });
  return response.data;
};

export const createTemplateMessage = async (data: TemplateSchema) => {
  const response = await API.post(`/templatemessage/create`, data);
  return response.data;
};
