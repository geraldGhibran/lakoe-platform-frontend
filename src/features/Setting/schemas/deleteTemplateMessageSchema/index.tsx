import { z } from 'zod';

export const deleteTemplateMessageSchema = z.object({
  id: z.number().min(1).optional(),
});

export type DeleteTemplateMessageSchema = z.infer<
  typeof deleteTemplateMessageSchema
>;
