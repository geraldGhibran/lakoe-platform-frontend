import { z } from 'zod';

export const editTemplateMessageSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  message: z.string().min(1, { message: 'Message is required' }),
  id: z.number().min(1, { message: 'ID is required' }),
});

export type EditTemplateMessageSchema = z.infer<
  typeof editTemplateMessageSchema
>;
