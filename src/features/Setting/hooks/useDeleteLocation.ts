import { toaster } from '@/components/ui/toaster-placement';
import { useAuthStore } from '@/store/auth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { deleteLocation } from '../services/store';
import { useGetLocationById } from './useGetLocationById';
import { useState } from 'react';

interface IdType {
  id: number;
}

export const useDeleteLocationStore = (id: number) => {
  const { user } = useAuthStore();
  const { data: locationStore } = useGetLocationById(id);

  const queryClient = useQueryClient();

  const { register, handleSubmit } = useForm<IdType>();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { mutateAsync: deleteLocationAsync, isPending: isDeletingLocation } =
    useMutation({
      mutationKey: ['deleteLocation'],
      mutationFn: async () => {
        return await deleteLocation(id);
      },

      onSuccess: async () => {
        await queryClient.refetchQueries({
          queryKey: ['locationStore', user?.store?.id],
          exact: true,
        });

        toaster.create({
          title: 'Location deleted',
          type: 'success',
          duration: 3000,
          description: 'Your Location has been deleted successfully.',
        });
        setIsOpen(false);
      },
      onError: (error: Error) => {
        toaster.create({
          title: 'Error deleting Location',
          type: 'error',
          duration: 3000,
          description: error.message || 'An error occurred, please try again',
        });
      },
    });

  const onSubmit = handleSubmit(() => {
    deleteLocationAsync();
  });

  return {
    isDeletingLocation,
    register,
    onSubmit,
    isOpen,
    setIsOpen,
    locationStore,
  };
};
