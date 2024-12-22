import { z } from 'zod';

export const addLocationSchema = z.object({
  name: z.string().min(1, { message: 'Masukan nama lokasi' }),
  address: z.string().min(1, { message: 'Masukan alamat lengkap' }),
  province: z.string().min(1, { message: 'provinsi tidak boleh kosong' }),
  province_code: z
    .number()
    .min(1, { message: 'kota/kabupaten tidak boleh kosong' }),
  city_district: z
    .string()
    .min(1, { message: 'kota/kabupaten tidak boleh kosong' }),
  city_district_code: z
    .number()
    .min(1, { message: 'kota/kabupaten tidak boleh kosong' }),
  subdistrict: z.string().min(1, { message: 'kecamatan tidak boleh kosong' }),
  subdistrict_code: z
    .number()
    .min(1, { message: 'kecamatan tidak boleh kosong' }),
  village: z.string().min(1, { message: 'kelurahan tidak boleh kosong' }),
  postal_code: z.number().min(1, { message: 'Kode pos tidak boleh kosong' }),
  latitude: z
    .number()
    .min(-90)
    .max(90, 'Latitude harus berada antara -90 dan 90'),
  longitude: z
    .number()
    .min(-180)
    .max(180, 'Longitude harus berada antara -180 dan 180'),
  store_id: z.number().min(1, { message: 'Store ID tidak boleh kosong' }),
  user_id: z.number().min(1, { message: 'User ID tidak boleh kosong' }),
  is_main_location: z.any().optional(),
});

export type AddLocationSchema = z.infer<typeof addLocationSchema>;
