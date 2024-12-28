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
  phone: number;
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
  invoices: Invoice[];
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

export interface Invoice {
  id: number;
  amount: number;
  total_amount: number;
  service_charge: number;
  status: 'UNPAID' | 'PAID' | 'CANCELLED';
  courier_price: number;
  receiver_longitude: number;
  receiver_latitude: number;
  receiver_district: string;
  receiver_phone: number | string;
  receiver_address: string;
  receiver_name: string;
  receiver_email: string;
  receiver_postal_code: number;
  invoice_id: string;
  payment_id: string | null;
  courier_id: number | null;
  store_id: number;
}

export interface Location {
  id: number;
  name: string;
  address: string;
  postal_code: number;
  city_district: string;
  city_district_code: number;
  subdistrict: string;
  subdistrict_code: number;
  village: string;
  area_id: number | null;
  province_code: number;
  province: string;
  latitude: number;
  longitude: number;
  store_id: number;
  is_main_location: boolean;
}
