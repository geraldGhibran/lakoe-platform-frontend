import { createBrowserRouter } from 'react-router-dom';
import DetailProductPage from '@/features/marketplace/home/pages/home';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <DetailProductPage />,
  },
  {
    path: '/detail-product/:id',
    element: <DetailProductPage />,
  },
]);
