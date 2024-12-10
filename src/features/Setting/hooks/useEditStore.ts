import { useMutation, useQueryClient } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toaster } from '@/components/ui/toaster-placement';
import { useAuthStore } from '@/store/auth';
import { Store } from '@/types/store';
import { StoreSchema } from '../schemas/storeSchema';
import { updateStoreData } from '../services/store';
import { useGetStoreDetail } from './useGetStoreDetail';
import { useState } from 'react';

interface typeStoreSchemas {
  name: string;
  slogan: string;
  description: string;
  logo_img?: FileList | File[];
}

export const useHandleEditProfile = () => {
  const { user } = useAuthStore();
  const { data: storeDetail } = useGetStoreDetail(Number(user?.id));
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<typeStoreSchemas>({
    resolver: zodResolver(StoreSchema),
    values: {
      name: storeDetail?.name || '',
      slogan: storeDetail?.slogan || '',
      description: storeDetail?.description || '',
      logo_img: [],
    },
  });

  const { mutateAsync: updateStoreDataAsync, isPending: isUpdatingStore } =
    useMutation({
      mutationFn: async (data: Store) => {
        const formData = new FormData();

        console.log('data anjing nggak ketemu', data);

        formData.append('name', data.name);
        formData.append('slogan', data?.slogan || '');
        if (data.description) formData.append('description', data.description);

        if (data.logo_img?.[0]) formData.append('logo_img', data.logo_img[0]);

        return await updateStoreData(formData, Number(user?.id));
      },
      onSuccess: async () => {
        await queryClient.refetchQueries({
          queryKey: ['storeDetail'],
          exact: true,
        });

        toaster.create({
          title: 'Store updated',
          type: 'success',
          duration: 3000,
          description: 'Your store has been updated successfully.',
        });
      },
      onError: (error: Error) => {
        toaster.create({
          title: 'Error updating STORE',
          type: 'error',
          duration: 3000,
          description: error.message || 'An error occurred, please try again',
        });
      },
    });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // const handleFileChange = (file: File) => {
  //     if (file) {
  //         const reader = new FileReader();
  //         reader.onloadend = () => {
  //             setValue('logo_img', [file]);
  //             setImagePreview(reader.result as string);
  //         };
  //         reader.readAsDataURL(file);
  //     }
  // };

  const handleFileChange = (type: 'logo_img', file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (type === 'logo_img') {
        setValue('logo_img', [file]);
        setImagePreview(reader.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = handleSubmit((data) => {
    updateStoreDataAsync(data as Store);
  });

  return {
    isUpdatingStore,
    errors,
    register,
    handleFileChange,
    onSubmit,
    imagePreview,
    handleImageChange,
    setImagePreview,
  };
};
