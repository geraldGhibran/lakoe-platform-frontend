import API from '@/libs/axios';
import { MidtransCheckout } from '@/types/checkout';

export const paymentCheckout = async (data: MidtransCheckout) => {
  try {
    const response = await API.post('/midtrans', data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
