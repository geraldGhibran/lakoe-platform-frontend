import { useAuthStore } from '@/store/auth';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export const AuthLayout = () => {
  const { token } = useAuthStore();
  const location = useLocation();

  if (token) {
    return <Navigate to="/admin" state={{ from: location }} replace />;
  }

  return <Outlet />;
};
