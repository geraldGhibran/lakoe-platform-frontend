import { toaster } from '@/components/ui/toaster-placement';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { ratesSchema, RatesSchema } from '../schemas/RatesSchema';
import { getRates } from '../services/rates';
import { useState } from 'react';
import { ShipmentDetails } from '@/types/pricing';
import { useRatesStore } from '@/store/rates';
import { useCartStore } from '@/store/cart-store';

export const useGetRates = () => {
  const queryClient = useQueryClient();

  const [rates, setRates] = useState();

  const { destinationAreaId, originAreaId, couriers } = useRatesStore();
  const { height, length, width, products, description } = useCartStore();

  const updatedProducts = products.map((product) => ({
    ...product,
    variant: {
      ...product.variant,
      height: height,
      length: length,
      width: width,
      value: product.variant.price,
      description: description,
      quantity: product.quantity,
    },
  }));

  const removeUnusedProducts = updatedProducts.map((product) => ({
    ...product,
    variant: {
      name: product.variant.name,
      description: product.variant.description,
      weight: product.variant.weight,
      height: product.variant.height,
      length: product.variant.length,
      width: product.variant.width,
      value: product.variant.value,
      quantity: product.quantity,
    },
  }));

  const itemsProducts = removeUnusedProducts.map((product) => ({
    length: product.variant.length,
    description: product.variant.description,
    width: product.variant.width,
    height: product.variant.height,
    value: product.variant.value,
    quantity: product.quantity,
    weight: product.variant.weight,
    name: product.variant.name,
  }));

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RatesSchema>({
    resolver: zodResolver(ratesSchema),
    values: {
      origin_area_id: originAreaId,
      destination_area_id: destinationAreaId,
      couriers: couriers,
      items: itemsProducts,
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
      return setRates(rates?.pricing);
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
