import { toaster } from '@/components/ui/toaster-placement';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
// import { ratesSchema, RatesSchema } from '../schemas/RatesSchema';
import { useCartStore } from '@/store/cart-store';
import { useCostRateStore } from '@/store/cost-rate';
import { useCustomerDetailStore } from '@/store/customer-detail';
import { checkoutSchema, CheckoutSchema } from '../schemas/CheckoutSchema';
import { paymentCheckout } from '../services/midtrans';

export const useCheckout = () => {
  const {
    height,
    length,
    width,
    products,
    description,
    storeId,
    doneCheckout,
  } = useCartStore();
  const { customer_details } = useCustomerDetailStore();
  const { cost } = useCostRateStore();

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
      id: product.variant.id,
      quantity: product.quantity,
    },
  }));

  const itemsProducts = removeUnusedProducts.map((product) => ({
    id: product.variant.id,
    quantity: product.quantity,
  }));

  // Transformed customer details object to match the expected format
  const transformed_customer_details = {
    name: customer_details.name,
    phone: customer_details.phone,
    address: customer_details.address,
    postal_code: customer_details.postal_code,
    receiver_longitude: customer_details.longitude ?? 0,
    receiver_latitude: customer_details.latitude ?? 0,
    receiver_district: `${customer_details.city_district}, ${customer_details.subdistrict}`,
    store_id: storeId,
    email: String(customer_details.email),
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutSchema>({
    resolver: zodResolver(checkoutSchema),
    values: {
      customer_details: transformed_customer_details,
      items: itemsProducts,
      courierPrice: cost,
    },
  });

  const { mutateAsync: getCheckoutAsync, isPending: isGettingCheckout } =
    useMutation({
      mutationKey: ['paymentCheckout'],
      mutationFn: async (data: CheckoutSchema) => {
        return await paymentCheckout(data);
      },
      onSuccess: async () => {
        toaster.create({
          title: 'Checkout fetched',
          type: 'success',
          duration: 3000,
          description: 'Your Checkout has been fetched successfully.',
        });
      },
      onError: (error: Error) => {
        toaster.create({
          title: 'Error Checkout',
          type: 'error',
          duration: 3000,
          description: error.message || 'An error occurred, please try again',
        });
      },
    });

  const onSubmit = handleSubmit(async (data) => {
    try {
      const rates = await getCheckoutAsync(data as CheckoutSchema);
      console.log(rates);
      doneCheckout();
      return (window.location.href = `${rates.redirect_url}`);
    } catch (error) {
      console.error(error);
    }
  });

  return {
    isGettingCheckout,
    errors,
    control,
    onSubmit,
  };
};
