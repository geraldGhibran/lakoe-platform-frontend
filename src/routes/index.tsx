import AdminHomePage from '@/features/admin/home/home';
import Withdraw from '@/features/admin/withdraw/withdraw';
import { LoginForm } from '@/features/auth/components/login-form';
import { RegisterForm } from '@/features/auth/components/register-form';
import DetailProductPage from '@/features/marketplace/home/pages/home';
import AddProductPage from '@/features/marketplace/pages/add-product';
import ProductList from '@/features/product/components';
import { createBrowserRouter } from 'react-router-dom';

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
    path: '/addproduk',
    element: <AddProductPage />,
  },

  {
    path: '/login',
    element: <LoginForm />,
  },
  {
    path: '/register',
    element: <RegisterForm />,
  },
]);
