import API from '@/libs/axios';

export const fetchCategories = async () => {
  try {
    const response = await API.get('/categories');
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};
