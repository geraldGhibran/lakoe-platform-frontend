import API from '@/libs/axios';

export const deleteProduct = async (id: number | undefined) => {
  try {
    const response = await API.delete('/product/deleteMany', {
      data: [id],
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching invoices:', error);
    throw error;
  }
};
