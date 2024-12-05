import { z } from 'zod';

export const productSchema = z.object({
  productName: z.string().min(1, { message: 'Nama produk wajib diisi' }),
  checkoutUrl: z.string().min(1, { message: 'URL checkout wajib diisi' }),
  category: z.enum(['Canada (CA)', 'United States (US)'], {
    errorMap: () => ({ message: 'Pilih salah satu kategori yang valid' }),
  }),
  description: z.string().min(1, { message: 'Deskripsi produk wajib diisi' }),
  image: z.string().min(1, { message: 'Gambar produk wajib diisi' }),
  price: z
    .string({ required_error: 'Harga produk wajib diisi' })
    .refine((val) => !isNaN(Number(val)), {
      message: 'Harga produk harus berupa angka',
    })
    .refine((val) => Number(val) > 0, {
      message: 'Harga produk harus lebih dari 0',
    }),

  stock: z
    .string({ required_error: 'Jumlah stok wajib diisi' })
    .refine((val) => !isNaN(Number(val)), {
      message: 'Jumlah stok harus berupa angka',
    })
    .refine((val) => Number(val) > 0, {
      message: 'Jumlah stok harus lebih dari 0',
    }),

  sku: z
    .string({ required_error: 'Jumlah stok wajib diisi' })
    .refine((val) => !isNaN(Number(val)), {
      message: 'Jumlah stok harus berupa angka',
    })
    .refine((val) => Number(val) > 0, {
      message: 'Jumlah stok harus lebih dari 0',
    }),

  weight: z
    .string({ required_error: 'Jumlah stok wajib diisi' })
    .refine((val) => !isNaN(Number(val)), {
      message: 'Jumlah stok harus berupa angka',
    })
    .refine((val) => Number(val) > 0, {
      message: 'Jumlah stok harus lebih dari 0',
    }),

  length: z
    .string({ required_error: 'Jumlah stok wajib diisi' })
    .refine((val) => !isNaN(Number(val)), {
      message: 'Jumlah stok harus berupa angka',
    })
    .refine((val) => Number(val) > 0, {
      message: 'Jumlah stok harus lebih dari 0',
    }),

  width: z
    .string({ required_error: 'Jumlah stok wajib diisi' })
    .refine((val) => !isNaN(Number(val)), {
      message: 'Jumlah stok harus berupa angka',
    })
    .refine((val) => Number(val) > 0, {
      message: 'Jumlah stok harus lebih dari 0',
    }),

  height: z
    .string({ required_error: 'Jumlah stok wajib diisi' })
    .refine((val) => !isNaN(Number(val)), {
      message: 'Jumlah stok harus berupa angka',
    })
    .refine((val) => Number(val) > 0, {
      message: 'Jumlah stok harus lebih dari 0',
    }),
});
