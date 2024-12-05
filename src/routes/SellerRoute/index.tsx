import { Outlet } from 'react-router-dom';
import { useAuthStore } from '@/store/auth';
import Cookies from 'js-cookie';
import { PrivateRoute } from '@/components/PrivateRoute';

export function SellerRoute() {
  const { user, token } = useAuthStore();
  const cookieToken = Cookies.get('token');
  const cookieUser = Cookies.get('user');

  if (!user || !token || !cookieToken || !cookieUser) {
    return (
      <PrivateRoute role={user?.role || ''} allowedRoles={['SELLER']}>
        <Outlet />
      </PrivateRoute>
    );
  }

  return <Outlet />;
}
