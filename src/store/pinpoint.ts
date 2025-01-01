import { create } from 'zustand';
interface PinpointState {
  pinpoint: boolean;
  setPinpoint: (pinpoint: boolean) => void;
}

export const usePinpoint = create<PinpointState>((set) => ({
  pinpoint: false,
  setPinpoint: (pinpoint) => set({ pinpoint }),
}));
