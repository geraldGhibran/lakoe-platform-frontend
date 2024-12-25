import { toaster } from '@/components/ui/toaster-placement';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { ratesSchema, RatesSchema } from '../schemas/RatesSchema';
import { getRates } from '../services/rates';
import { useState } from 'react';
import { ShipmentDetails } from '@/types/pricing';

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
      origin_area_id: 'IDNP9IDNC111IDND264IDZ16413',
      destination_area_id: 'IDNP6IDNC148IDND843IDZ12250',
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
        const shipmentDetails: ShipmentDetails = {
          origin_area_id: data.origin_area_id,
          destination_area_id: data.destination_area_id,
          couriers: data.couriers,
          items: data.items,
        };
        return await getRates(shipmentDetails);
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
