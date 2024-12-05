import { PrivateRoute } from '@/components/PrivateRoute';
import { useAuthStore } from '@/store/auth';
import Cookies from 'js-cookie';
import { Outlet } from 'react-router-dom';

export function AdminRoute() {
  const { user, token } = useAuthStore();
  const cookieToken = Cookies.get('token') || '';
  const cookieUser = Cookies.get('user') || '';

  if (!user || !token || !cookieToken || !cookieUser) {
    return (
      <PrivateRoute role={user?.role || ''} allowedRoles={['ADMIN']}>
        <Outlet />
      </PrivateRoute>
    );
  }

  return <Outlet />;
}
