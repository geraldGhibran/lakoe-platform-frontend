import { z } from 'zod';

const customerDetailsSchema = z.object({
  name: z.string(),
  phone: z.string(),
  address: z.string(),
  postal_code: z.number(),
  receiver_longitude: z.number(),
  receiver_latitude: z.number(),
  receiver_district: z.string(),
  store_id: z.number(),
  email: z.string().email(),
});

const itemSchema = z.object({
  id: z.number(),
  quantity: z.number(),
});

export const checkoutSchema = z.object({
  customer_details: customerDetailsSchema,
  items: z.array(itemSchema),
  courierPrice: z.number(),
});

export type CheckoutSchema = z.infer<typeof checkoutSchema>;
