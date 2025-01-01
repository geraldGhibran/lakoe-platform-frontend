import { z } from 'zod';

export const editShipmentSchema = z.object({
  is_active: z.boolean(),
  id: z.number().min(1, { message: 'ID is required' }),
});

export type EditShipmentSchema = z.infer<typeof editShipmentSchema>;
