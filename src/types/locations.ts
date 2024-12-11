export interface Location {
  id: number;
  name: string;
  address: string;
  postal_code: number;
  cityDistrict: number;
  latitude: number;
  longitude: number;
  storeId: number;
  userId: number;
  is_main_location: boolean;
}
