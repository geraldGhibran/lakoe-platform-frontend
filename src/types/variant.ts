import { VariantItem } from './variant-item';

export interface Variant {
  id: number;
  stock: number;
  weight: number;
  name: string;
  variantItem: VariantItem[];
  isActive: string;
  price: string;
  productId: number;
}
