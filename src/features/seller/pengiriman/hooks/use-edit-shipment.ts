import { toaster } from '@/components/ui/toaster-placement';
import { updateStoreCourierData } from '@/features/Setting/services/store';
import { useAuthStore } from '@/store/auth';
import { CourierDto } from '@/types/courier';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import {
  editShipmentSchema,
  EditShipmentSchema,
} from '../schemas/edit-shipment-schema';

export const useEditShipmentStoreById = () => {
  const { user } = useAuthStore();

  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<EditShipmentSchema>({
    resolver: zodResolver(editShipmentSchema),
    values: {
      id: 0,
      is_active: false,
    },
  });

  const {
    mutateAsync: editTemplateMessageByIdAsync,
    isPending: isEditingShipment,
  } = useMutation({
    mutationKey: ['editCourierById'],
    mutationFn: async (data: CourierDto) => {
      return await updateStoreCourierData(data);
    },
    onSuccess: async () => {
      await queryClient.refetchQueries({
        queryKey: ['storeDetail', user?.store?.id],
        exact: true,
      });

      toaster.create({
        title: 'courier store updated',
        type: 'success',
        duration: 3000,
        description: 'Your courier store has been created successfully.',
      });
    },
    onError: (error: Error) => {
      toaster.create({
        title: 'Error updating Courier',
        type: 'error',
        duration: 3000,
        description: error.message || 'An error occurred, please try again',
      });
    },
  });

  const onSubmit = handleSubmit((data) => {
    editTemplateMessageByIdAsync(data as CourierDto);
  });

  return {
    isEditingShipment,
    errors,
    register,
    onSubmit,
    setValue,
  };
};
