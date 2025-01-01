import { toaster } from '@/components/ui/toaster-placement';
import { useAuthStore } from '@/store/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  DeleteTemplateMessageSchema,
  deleteTemplateMessageSchema,
} from '../schemas/deleteTemplateMessageSchema';
import { deleteTemplateMessage } from '../services/store';
import { useGetTemplateMessageById } from './useGetTemplateMessageById';

export const useDeleteTemplateMessage = (id: number) => {
  const { user } = useAuthStore();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { data: templateMessage } = useGetTemplateMessageById(id);

  const queryClient = useQueryClient();

  const { control, handleSubmit } = useForm<DeleteTemplateMessageSchema>({
    resolver: zodResolver(deleteTemplateMessageSchema),
    values: {
      id: templateMessage?.id ?? 0,
    },
  });

  const {
    mutateAsync: deleteTemplateMessageByIdAsync,
    isPending: isDeletingTemplateMessage,
  } = useMutation({
    mutationKey: ['deleteTemplateMessage'],
    mutationFn: async (data: DeleteTemplateMessageSchema) => {
      return await deleteTemplateMessage(data);
    },
    onSuccess: async () => {
      await queryClient.refetchQueries({
        queryKey: ['templateMessage', user?.store?.id],
        exact: true,
      });

      toaster.create({
        title: 'Template Message deleted',
        type: 'success',
        duration: 3000,
        description: 'Your template message has been deleted successfully.',
      });
      setIsOpen(false);
    },
    onMutate: async () => {
      toaster.create({
        title: 'Template Message being deleted',
        type: 'Loading...',
        duration: 3000,
        description: 'Your template message is being deleted.',
      });
    },
    onError: (error: Error) => {
      toaster.create({
        title: 'Error deleting Template Message',
        type: 'error',
        duration: 3000,
        description: error.message || 'An error occurred, please try again',
      });
    },
  });

  const onSubmit = handleSubmit((data) => {
    deleteTemplateMessageByIdAsync(data as DeleteTemplateMessageSchema);
  });

  return {
    isDeletingTemplateMessage,
    control,
    onSubmit,
    templateMessage,
    isOpen,
    setIsOpen,
  };
};
