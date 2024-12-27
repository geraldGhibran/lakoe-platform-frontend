import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().min(1, { message: 'Nama produk wajib diisi' }),
  url: z.string().min(1, { message: 'URL checkout wajib diisi' }),
  categories_id: z
    .number()
    .min(1, { message: 'pilih kategori terlebih dahulu' }),
  description: z.string().min(1, { message: 'Deskripsi produk wajib diisi' }),
  minimum_order: z
    .string({ required_error: 'Harga produk wajib diisi' })
    .transform((val) => parseFloat(val))
    .refine((val) => !isNaN(val), {
      message: 'Harga produk harus berupa angka',
    })
    .refine((val) => val > 0, {
      message: 'Harga produk harus lebih dari 0',
    }),
  image: z.any().optional(),
  price: z
    .string({ required_error: 'Harga produk wajib diisi' })
    .transform((val) => parseFloat(val))
    .refine((val) => !isNaN(val), {
      message: 'Harga produk harus berupa angka',
    })
    .refine((val) => val > 0, {
      message: 'Harga produk harus lebih dari 0',
    }),
  length: z
    .string({ required_error: 'Panjang produk wajib diisi' })
    .transform((val) => parseFloat(val))
    .refine((val) => !isNaN(val), {
      message: 'Panjang produk harus berupa angka',
    })
    .refine((val) => val > 0, {
      message: 'Panjang produk harus lebih dari 0',
    }),

  width: z
    .string({ required_error: 'Lebar produk wajib diisi' })
    .transform((val) => parseFloat(val))
    .refine((val) => !isNaN(val), {
      message: 'Lebar produk harus berupa angka',
    })
    .refine((val) => val > 0, {
      message: 'Lebar produk harus lebih dari 0',
    }),

  height: z
    .string({ required_error: 'Tinggi produk wajib diisi' })
    .transform((val) => parseFloat(val))
    .refine((val) => !isNaN(val), {
      message: 'Tinggi produk harus berupa angka',
    })
    .refine((val) => val > 0, {
      message: 'Tinggi produk harus lebih dari 0',
    }),
});
