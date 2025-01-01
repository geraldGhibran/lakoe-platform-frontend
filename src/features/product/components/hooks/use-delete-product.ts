import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toaster } from '@/components/ui/toaster-placement';
import { deleteProduct } from '../CardProduct/services/delete-product';

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['deleteProductById'],
    mutationFn: (id: number | undefined) => deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getProductSeller'] });
      toaster.create({
        title: 'Delete product successfully',
        type: 'success',
        duration: 3000,
        description: 'Delete product successfully',
      });
    },
    onMutate: () => {
      toaster.create({
        title: 'Loading...',
        description: 'Were working on it...',
        type: 'info',
        duration: 3000,
      });
    },

    onError: (error: Error) => {
      toaster.create({
        title: 'Error delete product',
        type: 'error',
        duration: 3000,
        description: error.message || 'An error occurred, please try again',
      });
    },
    throwOnError: true,
  });
};
