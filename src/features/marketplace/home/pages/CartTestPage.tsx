import AddToCartButton from '../components/AddToCartButton';
import CartTest from '../components/CartTest';

export default function CartPage() {
  const exampleItem = {
    id: '1',
    name: 'Sample Item',
    price: 2999,
    quantity: 1,
  };
  return (
    <>
      <h1>My Store</h1>
      <AddToCartButton item={exampleItem} />
      <CartTest />
    </>
  );
}
