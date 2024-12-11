import { useCartStore } from '@/store/cart';
import React from 'react';

interface Props {
  item: {
    id: string;
    name: string;
    price: number;
    quantity: number;
  };
}

const AddToCartButton: React.FC<Props> = ({ item }) => {
  const addItem = useCartStore((state) => state.addItem);

  return <button onClick={() => addItem(item)}>Add to Cart</button>;
};

export default AddToCartButton;
