import { z } from 'zod';

export const AddLocationSchema = z.object({
  name: z.string().min(1, { message: 'Masukan nama lokasi' }),
  address: z.string().min(1, { message: 'Masukan alamat lengkap' }),
  city_district: z
    .number()
    .min(1, { message: 'Cari kota/kecamatan tidak boleh kosong' }),
  postal_code: z.number().min(1, { message: 'Kode pos tidak boleh kosong' }),
  latitude: z
    .number()
    .min(-90)
    .max(90, 'Latitude harus berada antara -90 dan 90'),
  longitude: z
    .number()
    .min(-180)
    .max(180, 'Longitude harus berada antara -180 dan 180'),
});
