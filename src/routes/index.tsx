import { createBrowserRouter } from 'react-router-dom';
import MarketplaceHomePage from '@/features/marketplace/home/pages/home';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MarketplaceHomePage />,
  },
  {
    path: '/marketplace',
    element: <MarketplaceHomePage />,
  },
]);
