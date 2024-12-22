import { create } from 'zustand';
import { fetchCategories } from '@/features/product/service/store';

interface Category {
  id: number;
  name: string;
  parentId: number | null;
  subcategories: Category[];
}

interface CategoryStore {
  categories: Category[];
  loading: boolean;
  error: string | null;
  fetchCategories: () => Promise<void>;
}

const useCategoryStore = create<CategoryStore>((set) => ({
  categories: [],
  loading: false,
  error: null,

  fetchCategories: async () => {
    set({ loading: true, error: null });
    try {
      const data = await fetchCategories();
      set({ categories: data, loading: false });
    } catch (error) {
      console.error('Error fetching categories:', error);
      set({ error: 'Failed to fetch categories', loading: false });
    }
  },
}));

export default useCategoryStore;
