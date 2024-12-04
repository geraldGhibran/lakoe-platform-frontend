import AdminHomePage from '@/features/admin/home/home';
import Withdraw from '@/features/admin/withdraw/withdraw';
import DetailProductPage from '@/features/marketplace/home/pages/DetailProductPage';
import AddProductPage from '@/features/product/components/addProduct';
import ProductList from '@/features/product/components';
import { createBrowserRouter } from 'react-router-dom';
import CartPage from '@/features/marketplace/home/pages/Cart';
import CheckoutPage from '@/features/marketplace/home/pages/Checkout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <DetailProductPage />,
  },
  {
    path: '/detail-product/:id',
    element: <DetailProductPage />,
  },
  {
    path: '/cart',
    element: <CartPage />,
  },
  {
    path: '/checkout',
    element: <CheckoutPage />,
  },
  {
    path: '/admin',
    element: <AdminHomePage />,
  },
  {
    path: '/admin/withdraw',
    element: <Withdraw />,
  },
  {
    path: '/products',
    element: <ProductList />,
  },
  {
    path: '/add-product',
    element: <AddProductPage />,
  },
]);
