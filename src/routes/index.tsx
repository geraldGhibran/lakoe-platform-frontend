import { createBrowserRouter } from 'react-router-dom';
import MarketplaceHomePage from '@/features/marketplace/home/pages/home';
import AdminHomePage from '@/features/admin/home/home';
import Withdraw from '@/features/admin/withdraw/withdraw';

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
    path: '/admin',
    element: <AdminHomePage />,
  },
  {
    path: '/admin/withdraw',
    element: <Withdraw />,
  },
]);
