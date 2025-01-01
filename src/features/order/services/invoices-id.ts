import API from '@/libs/axios';

export const GetInvoicesId = async (id: number) => {
  try {
    const response = await API.get(`/invoices/${id}`);
    console.log('Invoice data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching invoice:', error);
    throw error;
  }
};
