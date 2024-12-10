import { toaster } from '@/components/ui/toaster-placement';
import { useAuthStore } from '@/store/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { templateSchema, TemplateSchema } from '../schemas/templateSchema';
import { createTemplateMessage } from '../services/store';

export const useAddTemplateMessage = () => {
  const queryClient = useQueryClient();

  const { user } = useAuthStore();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TemplateSchema>({
    resolver: zodResolver(templateSchema),
    values: {
      storeId: user?.store?.id ?? 0,
      message: '',
      title: '',
    },
  });

  const {
    mutateAsync: createTemplateMessageAsync,
    isPending: isCreatingTemplateMessage,
  } = useMutation({
    mutationKey: ['createTemplateMessage'],
    mutationFn: async (data: TemplateSchema) => {
      return await createTemplateMessage(data);
    },
    onSuccess: async () => {
      await queryClient.refetchQueries({
        queryKey: ['templateMessage', user?.store?.id],
        exact: true,
      });

      toaster.create({
        title: 'Template Message created',
        type: 'success',
        duration: 3000,
        description: 'Your template message has been created successfully.',
      });

      reset();
    },
    onError: (error: Error) => {
      toaster.create({
        title: 'Error creating Template Message',
        type: 'error',
        duration: 3000,
        description: error.message || 'An error occurred, please try again',
      });
    },
  });

  const onSubmit = handleSubmit((data) => {
    console.log('data', data);
    createTemplateMessageAsync(data as TemplateSchema);
  });

  return {
    isCreatingTemplateMessage,
    errors,
    control,
    onSubmit,
  };
};
