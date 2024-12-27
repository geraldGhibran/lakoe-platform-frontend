import { Location } from './locations';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  isActive: boolean;
  minimum_order: number;
  categories_id: number;
  store_id: number;
  url: string;
  createdAt: string;
  updatedAt: string;
  invoicesId: number;
  length: number;
  width: number;
  Height: number;
  image: Image[];
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: 'SELLER' | 'ADMIN';
  locationsId: number | null;
}

export interface Store {
  id: number;
  name: string;
  slogan: string | null;
  description: string | null;
  logo_img: string | null;
  banner_img: string | null;
  user_id: number;
  amount: number;
  courier: string | null;
  Locations: Location[];
  bankAccount: BankAccount;
  products: Product[];
  user: User;
  Withdraw: Withdraw[];
  totalPendingWithdrawAmount: number;
}

export interface BankAccount {
  id: number;
  bank: string;
  acc_number: number;
  acc_name: string;
  store_id: number;
}

export interface Withdraw {
  id: number;
  amount: number;
  storeId: number;
  status: 'PENDING' | 'SUCCESS' | 'FAILED';
  createAt: string;
  updateAt: string;
  store: Store;
}

export interface Image {
  url: string;
}

export interface AmountData {
  totalStoreAmount: number;
  totalPendingAmount: number;
  totalSuccessAmount: number;
  totalFeeAmount: number;
}
