import AdminHomePage from '@/features/admin/home/home';
import Withdraw from '@/features/admin/withdraw/withdraw';
import { LoginForm } from '@/features/auth/components/login-form';
import { RegisterForm } from '@/features/auth/components/register-form';
import CartPage from '@/features/marketplace/home/pages/Cart';
import CheckoutPage from '@/features/marketplace/home/pages/Checkout';
import DetailProductPage from '@/features/marketplace/home/pages/DetailProductPage';
import ProductList from '@/features/product/components';
import AddProductPage from '@/features/product/components/addProduct';
import { createBrowserRouter } from 'react-router-dom';
import { AdminRoute } from './AdminRoute';
import { SellerRoute } from './SellerRoute';

export const router = createBrowserRouter([
  // {
  //   path: '/test',
  //   element: <Test />,
  // },

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
    path: '/login',
    element: <LoginForm />,
  },
  {
    path: '/register',
    element: <RegisterForm />,
  },
  {
    element: <AdminRoute />,
    children: [
      {
        path: '/admin',
        element: <AdminHomePage />,
      },
      {
        path: '/admin/withdraw',
        element: <Withdraw />,
      },
    ],
  },
  {
    element: <SellerRoute />,
    children: [
      {
        path: '/products',
        element: <ProductList />,
      },
      {
        path: '/add-product',
        element: <AddProductPage />,
      },
    ],
  },
]);
