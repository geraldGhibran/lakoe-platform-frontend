import { CustomerDetails } from '@/types/checkout';
import { create } from 'zustand';

interface customerDetailState {
  customer_details: CustomerDetails;
  setCustomerDetails: (customer_details: CustomerDetails) => void;
}

export const useCustomerDetailStore = create<customerDetailState>((set) => ({
  customer_details: {} as CustomerDetails,
  setCustomerDetails: (customer_details) => set({ customer_details }),
}));
