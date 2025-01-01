import { z } from 'zod';

export const templateSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  message: z.string().min(1, { message: 'Message is required' }),
  storeId: z.number().min(1, { message: 'Store is required' }).optional(),
});

export type TemplateSchema = z.infer<typeof templateSchema>;
