import { CustomerDetails } from '@/types/checkout';
import { create } from 'zustand';

export interface AllFields {
  name: string;
  phone: string;
  address: string;
  province: string;
  city_district: string;
  subdistrict: string;
  village: string;
  postal_code: number;
  latitude: number;
  longitude: number;
  [key: string]: string | number;
}

export interface customerDetailState {
  customer_details: CustomerDetails | AllFields;
  setCustomerDetails: (customer_details: CustomerDetails | AllFields) => void;
}

export const useCustomerDetailStore = create<customerDetailState>((set) => ({
  customer_details: {} as CustomerDetails,
  setCustomerDetails: (customer_details) => set({ customer_details }),
}));
