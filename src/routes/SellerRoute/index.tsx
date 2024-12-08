import { PrivateRoute } from '@/components/PrivateRoute';
import { useAuthStore } from '@/store/auth';
import { Outlet } from 'react-router-dom';

export function SellerRoute() {
  const { user } = useAuthStore();
  return (
    <PrivateRoute role={user?.role || ''} allowedRoles={['SELLER']}>
      <Outlet />
    </PrivateRoute>
  );
}
