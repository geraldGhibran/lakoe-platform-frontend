import { z } from 'zod';

export const addLocationSchema = z.object({
  name: z.string().min(1, { message: 'Masukan nama lokasi' }),
  address: z.string().min(1, { message: 'Masukan alamat lengkap' }),
  cityDistrict: z
    .string()
    .min(1, { message: 'Cari kota/kecamatan tidak boleh kosong' }),
  postalCode: z.number().min(1, { message: 'Kode pos tidak boleh kosong' }),
  latitude: z
    .number()
    .min(-90)
    .max(90, 'Latitude harus berada antara -90 dan 90'),
  longitude: z
    .number()
    .min(-180)
    .max(180, 'Longitude harus berada antara -180 dan 180'),
  storeId: z.number().min(1, { message: 'Store ID tidak boleh kosong' }),
  userId: z.number().min(1, { message: 'User ID tidak boleh kosong' }),
  isMainLocation: z.boolean(),
});

export type AddLocationSchema = z.infer<typeof addLocationSchema>;
