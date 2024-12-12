import L from 'leaflet';
import { create } from 'zustand';
interface locationState {
  position: L.LatLngLiteral;
  setPosition: (position: L.LatLngLiteral) => void;
}

export const useLocationStore = create<locationState>((set) => ({
  position: { lat: -6.390110076310068, lng: 106.8498086885969 },
  setPosition: (position) => set({ position }),
}));
