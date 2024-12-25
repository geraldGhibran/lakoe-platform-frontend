import { Store } from '@/types/store';

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: Category;
  image: Image[];
  rating: Rating;
  Store: Store;
  weight: number;
}

export interface Image {
  id: number;
  product_id: number;
  url: string;
}

interface Rating {
  rate: number;
  count: number;
}

type Category =
  | "men's clothing"
  | 'jewelery'
  | 'electronics'
  | "women's clothing";

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  products: CartItem[];
}
