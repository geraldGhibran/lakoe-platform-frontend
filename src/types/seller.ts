interface User {
  id: number;
  name: string;
  email: string;
  phone: number;
  password: string;
  role: 'SELLER' | 'BUYER' | string;
  locationsId: number | null;
}

interface Invoice {
  id: number;
  amount: number;
  total_amount: number;
  service_charge: number;
  status: 'UNPAID' | 'PAID' | 'PROCESS' | 'DELIVERED' | 'DELIVERING' | string;
  courier_price: number;
  receiver_longitude: number;
  receiver_latitude: number;
  receiver_district: string;
  receiver_phone: number;
  receiver_address: string;
  receiver_name: string;
  receiver_email: string;
  receiver_postal_code: number;
  invoice_id: string;
  payment_id: string | null;
  courier_id: number | null;
  store_id: number;
}

interface Product {
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
  Invoices: Invoice;
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
  courier: string;
  user: User;
  invoices: Invoice[];
  products: Product[];
}
