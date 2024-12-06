import StoreSetting from '@/features/Setting/pages/storeSetting';
import AdminHomePage from '@/features/admin/home/home';
import { AdminLayout } from '@/features/admin/layout/admin-layout';
import Withdraw from '@/features/admin/withdraw/withdraw';
import { LoginForm } from '@/features/auth/components/login-form';
import { RegisterForm } from '@/features/auth/components/register-form';
import CartPage from '@/features/marketplace/home/pages/Cart';
import CheckoutPage from '@/features/marketplace/home/pages/Checkout';
import DetailProductPage from '@/features/marketplace/home/pages/DetailProductPage';
import OrderPage from '@/features/order/orderPage';
import ProductList from '@/features/product/components';
import AddProductPage from '@/features/product/components/addProduct';
import { createBrowserRouter } from 'react-router-dom';
import { SellerRoute } from './SellerRoute';

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
    path: '/login',
    element: <LoginForm />,
  },
  {
    path: '/register',
    element: <RegisterForm />,
  },
  {
    path: 'admin',
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <AdminHomePage />,
      },
      {
        path: 'withdraw',
        element: <Withdraw />,
      },
    ],
  },
  // {
  //   path: 'products',
  //   element: <SellerLayout />,
  //   children: [
  //     {
  //       index: true,
  //       element: <ProductList />,
  //     },
  //     {
  //       path: 'add-product',
  //       element: <AddProductPage />,
  //     },
  //     {
  //       path: 'order',
  //       element: <OrderPage />,
  //     },
  //     {
  //       path: 'settings',
  //       element: <StoreSetting />,
  //     },
  //   ],
  // },
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
      {
        path: '/order',
        element: <OrderPage />,
      },
      {
        path: '/settings',
        element: <StoreSetting />,
      },
    ],
  },
]);
