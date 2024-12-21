import API from '@/libs/axios';
import { ShipmentDetails } from '@/types/pricing';

export const getRates = async (data: ShipmentDetails) => {
  try {
    const response = await API.post('/biteship/rates', data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
