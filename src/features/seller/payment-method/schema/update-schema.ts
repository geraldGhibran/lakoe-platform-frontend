import { z } from 'zod';

const UpdateformSchema = z.object({
  acc_name: z.string().min(1, 'Full Name is required'),
  bank: z.string().min(1, 'Bank Name is required'),
  acc_number: z
    .string()
    .min(1, 'Account Number is required')
    .refine((val) => /^\d+$/.test(val), {
      message: 'Account Number must be a valid integer',
    })
    .transform((val) => parseInt(val, 10)),
});

export default UpdateformSchema;
