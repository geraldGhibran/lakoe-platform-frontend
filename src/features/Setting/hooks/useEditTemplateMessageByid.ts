import { toaster } from '@/components/ui/toaster-placement';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import {
  editTemplateMessageSchema,
  EditTemplateMessageSchema,
} from '../schemas/editTemplateMessage';
import { TemplateSchema } from '../schemas/templateSchema';
import { updateTemplateMessage } from '../services/store';
import { useGetTemplateMessageById } from './useGetTemplateMessageById';
import { useAuthStore } from '@/store/auth';
import { useState } from 'react';

export const useEditTemplateMessageById = (id: number) => {
  const { user } = useAuthStore();

  const { data: templateMessage } = useGetTemplateMessageById(id);

  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditTemplateMessageSchema>({
    resolver: zodResolver(editTemplateMessageSchema),
    values: {
      id: templateMessage?.id ?? 0,
      message: templateMessage?.message || '',
      title: templateMessage?.title || '',
    },
  });

  const {
    mutateAsync: editTemplateMessageByIdAsync,
    isPending: isEditingTemplateMessage,
  } = useMutation({
    mutationKey: ['editTemplateMessageById'],
    mutationFn: async (data: TemplateSchema) => {
      return await updateTemplateMessage(data);
    },
    onSuccess: async () => {
      await queryClient.refetchQueries({
        queryKey: ['templateMessage', user?.store?.id],
        exact: true,
      });

      toaster.create({
        title: 'Template Message updated',
        type: 'success',
        duration: 3000,
        description: 'Your template message has been created successfully.',
      });

      setIsOpen(false);
    },
    onError: (error: Error) => {
      toaster.create({
        title: 'Error updating Template Message',
        type: 'error',
        duration: 3000,
        description: error.message || 'An error occurred, please try again',
      });
    },
  });

  const onSubmit = handleSubmit((data) => {
    editTemplateMessageByIdAsync(data as TemplateSchema);
  });

  return {
    isEditingTemplateMessage,
    errors,
    register,
    onSubmit,
    isOpen,
    setIsOpen,
    templateMessage,
  };
};
