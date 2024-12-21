import { toaster } from '@/components/ui/toaster-placement';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { ratesSchema, RatesSchema } from '../schemas/RatesSchema';
import { getRates } from '../services/rates';
import { useState } from 'react';

export const useGetRates = () => {
  const queryClient = useQueryClient();

  const [rates, setRates] = useState([]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RatesSchema>({
    resolver: zodResolver(ratesSchema),
    values: {
      origin_postal_code: 12440,
      destination_postal_code: 12240,
      couriers: 'jne,jnt,sicepat,gojek,tiki,anteraja,grabexpress',
      items: [
        {
          name: 'Shoes',
          description: 'Black colored size 45',
          value: 199000,
          length: 30,
          width: 15,
          height: 20,
          weight: 200,
          quantity: 2,
        },
      ],
    },
  });

  const { mutateAsync: getRatesAsync, isPending: isGettingRates } = useMutation(
    {
      mutationKey: ['getRates'],
      mutationFn: async (data: RatesSchema) => {
        return await getRates(data);
      },
      onSuccess: async () => {
        await queryClient.refetchQueries({
          queryKey: ['getRates'],
          exact: true,
        });

        toaster.create({
          title: 'Rates Message fetched',
          type: 'success',
          duration: 3000,
          description: 'Your rates message has been fetched successfully.',
        });
      },
      onError: (error: Error) => {
        toaster.create({
          title: 'Error Rates Message',
          type: 'error',
          duration: 3000,
          description: error.message || 'An error occurred, please try again',
        });
      },
    }
  );

  const onSubmit = handleSubmit(async (data) => {
    try {
      // getRatesAsync(data as RatesSchema);
      const rates = await getRatesAsync(data as RatesSchema);
      return setRates(rates);
    } catch (error) {
      console.error(error);
    }
  });

  return {
    isGettingRates,
    errors,
    control,
    onSubmit,
    rates,
  };
};
