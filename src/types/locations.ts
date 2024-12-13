export interface Location {
  id: number;
  name: string;
  address: string;
  postal_code: number;
  city_district: string;
  latitude: number;
  longitude: number;
  store_id: number;
  user_id: number;
  is_main_location: boolean;
}
