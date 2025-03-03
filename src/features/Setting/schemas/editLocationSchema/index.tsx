import { z } from 'zod';

export const editLocationSchema = z.object({
  name: z.string().min(1, { message: 'Masukan nama lokasi' }),
  address: z.string().min(1, { message: 'Masukan alamat lengkap' }),
  city_district: z
    .number()
    .min(1, { message: 'Cari kota/kabupaten tidak boleh kosong' }),
  subdistrict: z
    .number()
    .min(1, { message: 'Cari kecamatan tidak boleh kosong' }),
  province_code: z
    .number()
    .min(1, { message: 'Cari province tidak boleh kosong' }),
  village: z.string().min(1, { message: 'Cari kelurahan tidak boleh kosong' }),
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
  is_main_location: z.any().optional(),
});

export type EditLocationSchema = z.infer<typeof editLocationSchema>;
