import { z } from 'zod';

export const shipmentAddressSchema = z.object({
  name: z.string().min(1, { message: 'Masukan nama lokasi' }),
  address: z.string().min(1, { message: 'Masukan alamat lengkap' }),
  province: z.string().min(1, { message: 'provinsi tidak boleh kosong' }),
  city_district: z
    .string()
    .min(1, { message: 'kota/kabupaten tidak boleh kosong' }),
  subdistrict: z.string().min(1, { message: 'kecamatan tidak boleh kosong' }),
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
});

export type ShipmentAddressSchema = z.infer<typeof shipmentAddressSchema>;
