import { toaster } from '@/components/ui/toaster-placement';
import { useAuthStore } from '@/store/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { updateLocation } from '../services/store';
import { useGetLocationById } from './useGetLocationById';
import {
  EditLocationSchema,
  editLocationSchema,
} from '../schemas/editLocationSchema';
import { useLocationStore } from '@/store/location';
import { useState } from 'react';

export const useEditLocation = (id: number) => {
  const { user } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);

  const { data: locationStore } = useGetLocationById(id);

  const queryClient = useQueryClient();
  const { position } = useLocationStore();

  const {
    register,
    handleSubmit,
    control,
    watch: watchEditLocation,
    setValue: setValueEditLocation,
    formState: { errors },
  } = useForm<EditLocationSchema>({
    resolver: zodResolver(editLocationSchema),
    values: {
      address: locationStore?.address || '',
      city_district: locationStore?.city_district || 0,
      province_code: locationStore?.province_code || 0,
      subdistrict: locationStore?.subdistrict || 0,
      village: locationStore?.village || '',
      postal_code: locationStore?.postal_code || 0,
      latitude: locationStore?.latitude || position.lat,
      longitude: locationStore?.longitude || position.lng,
      name: locationStore?.name || '',
      store_id: locationStore?.store_id || 0,
      is_main_location: locationStore?.is_main_location || false,
    },
  });

  const { mutateAsync: editLocationAsync, isPending: isEditingLocationStore } =
    useMutation({
      mutationKey: ['editLocation'],
      mutationFn: async (data: EditLocationSchema) => {
        return await updateLocation(id, data);
      },
      onSuccess: async () => {
        await queryClient.refetchQueries({
          queryKey: ['locationStore', user?.store?.id],
          exact: true,
        });

        toaster.create({
          title: 'Location Store updated',
          type: 'success',
          duration: 3000,
          description: 'Your Location Store has been created successfully.',
        });

        setIsOpen(false);
      },
      onError: (error: Error) => {
        toaster.create({
          title: 'Error updating Location Store',
          type: 'error',
          duration: 3000,
          description: error.message || 'An error occurred, please try again',
        });
      },
    });

  const onSubmit = handleSubmit((data) => {
    editLocationAsync(data as EditLocationSchema);
  });

  return {
    isEditingLocationStore,
    errors,
    register,
    onSubmit,
    locationStore,
    control,
    watchEditLocation,
    setValueEditLocation,
    isOpen,
    setIsOpen,
  };
};
