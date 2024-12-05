import { z } from 'zod';

export const StoreSchema = z.object({
  StoreName: z.string().min(1, { message: 'Nama toko wajib diisi' }),
  StoreSlogan: z.string().min(1, { message: 'Slogan toko wajib diisi' }),
  StoreDescription: z
    .string()
    .min(1, { message: 'Deskripsi toko wajib diisi' }),
});
