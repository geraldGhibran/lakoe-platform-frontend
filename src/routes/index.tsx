import AdminHomePage from '@/features/admin/home/home';
import Withdraw from '@/features/admin/withdraw/withdraw';
import DetailProductPage from '@/features/marketplace/home/pages/home';
import AddProductPage from '@/features/product/components/addProduct';
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
    path: '/add-product',
    element: <AddProductPage />,
  },
]);
