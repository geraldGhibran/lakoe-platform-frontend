import API from '@/libs/axios';

export const getInvoices = async () => {
  try {
    const response = await API.get('/invoices');
    return response.data;
  } catch (error) {
    console.error('Error fetching invoices:', error);
    throw error;
  }
};
