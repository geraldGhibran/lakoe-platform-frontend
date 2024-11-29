import { createBrowserRouter } from 'react-router-dom';
import MarketplaceHomePage from '@/features/marketplace/pages/home';
import AddProductPage from '@/features/marketplace/pages/add-product';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MarketplaceHomePage />,
  },
  {
    path: '/marketplace',
    element: <MarketplaceHomePage />,
  },
  {
    path: '/addproduk',
    element: <AddProductPage />,
  },
]);
