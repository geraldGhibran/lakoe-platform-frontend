import { z } from 'zod';

export const StoreSchema = z.object({
  name: z.string().min(1, { message: 'Nama toko wajib diisi' }),
  slogan: z.string().min(1, { message: 'Slogan toko wajib diisi' }),
  description: z.string().min(1, { message: 'Deskripsi toko wajib diisi' }),
  logo_img: z.any().optional(),
});
