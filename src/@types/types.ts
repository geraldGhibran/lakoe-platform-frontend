export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: Category;
  image: string;
  rating: Rating;
  weight: number;
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
