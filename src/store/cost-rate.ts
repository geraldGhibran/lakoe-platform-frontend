import { create } from 'zustand';
import { Pricing } from '@/types/pricing';

interface rateState {
  ratesCourier: Pricing;
  setRatesCourier: (ratesCourier: Pricing) => void;
  cost: number;
  setCost: (cost: number) => void;
  isSelected: boolean;
  setIsSelected: (isSelected: boolean) => void;
}

export const useCostRateStore = create<rateState>((set) => ({
  ratesCourier: {} as Pricing,
  setRatesCourier: (ratesCourier) => set({ ratesCourier }),
  isSelected: false,
  setIsSelected: (isSelected) => set({ isSelected }),
  cost: 0,
  setCost: (cost) => set({ cost }),
}));
