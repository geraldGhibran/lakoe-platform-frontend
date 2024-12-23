import { z } from 'zod';

export const ratesSchema = z.object({
  origin_area_id: z.string(),
  destination_area_id: z.string(),
  couriers: z.string(),
  items: z.array(
    z.object({
      name: z.string(),
      description: z.string(),
      value: z.number(),
      length: z.number(),
      width: z.number(),
      height: z.number(),
      weight: z.number(),
      quantity: z.number(),
    })
  ),
});

export type RatesSchema = z.infer<typeof ratesSchema>;
