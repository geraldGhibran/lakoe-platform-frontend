import { toaster } from '@/components/ui/toaster-placement';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { getTracking, TrackingType } from '../services/tracking';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

export const useGetTracking = (data: TrackingType) => {
  const [tracking, setTracking] = useState();
  const queryClient = useQueryClient();

  const location = useLocation();

  const id = location.state?.id;

  const {
    formState: { errors },
  } = useForm();

  const { mutateAsync: getTrackingAsync, isPending: isGettingTracking } =
    useMutation({
      mutationKey: ['getInvoicesById', id],
      mutationFn: async () => {
        return await getTracking(data);
      },
      onSuccess: async () => {
        await queryClient.refetchQueries({
          queryKey: ['getTracking'],
          exact: true,
        });

        toaster.create({
          title: 'tracking Message fetched',
          type: 'success',
          duration: 3000,
          description: 'Your tracking message has been fetched successfully.',
        });
      },
      onError: (error: Error) => {
        toaster.create({
          title: 'Error tracking Message',
          type: 'error',
          duration: 3000,
          description: error.message || 'An error occurred, please try again',
        });
      },
    });

  // const fetchTracking = async (data:TrackingType) => {
  //   try {
  //     const rates = await getTrackingAsync(data);
  //     return setTracking(rates);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return {
    isGettingTracking,
    errors,
    getTrackingAsync,
    tracking,
    setTracking,
  };
};
