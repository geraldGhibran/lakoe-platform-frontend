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
  categories_id?: number;
}
