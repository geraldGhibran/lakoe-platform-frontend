import { Images } from './images';
import { Variant } from './variant';
export interface Product {
  id: number;
  name: string;
  description: string;
  images: Images[];
  price: number;
  isActive: boolean;
  variant?: Variant[];
  minimum_order: number;
  store_id: number;
  variant_Item_values: variant_Item_values[];
  categories_id?: number;
}

export interface variant_Item_values {
  id: number;
  sku: string;
  name: string;
  weight: number;
  stock: number;
  price: number;
  is_active: boolean;
  product_id: number;
  image?: string;
  invoiceId?: number;
  product: Product;
}
