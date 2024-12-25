import { create } from 'zustand';
interface ratesState {
  originAreaId: string;
  setOriginAreaId: (originAreaId: string) => void;
  destinationAreaId: string;
  setDestinationAreaId: (originAreaId: string) => void;
  couriers: string;
  setCouriers: (couriers: string) => void;
}

export const useRatesStore = create<ratesState>((set) => ({
  originAreaId: '',
  setOriginAreaId: (originAreaId) => set({ originAreaId }),
  destinationAreaId: '',
  setDestinationAreaId: (destinationAreaId) => set({ destinationAreaId }),
  couriers: '',
  setCouriers: (couriers) => set({ couriers }),
}));
