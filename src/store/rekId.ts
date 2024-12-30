import { create } from 'zustand';

interface AccountState {
  accountId: number | undefined;
  setAccountId: (id: number | undefined) => void;
}

export const useAccountStore = create<AccountState>((set) => ({
  accountId: undefined,
  setAccountId: (id) => set({ accountId: id }),
}));
