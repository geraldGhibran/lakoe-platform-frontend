import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({
  role,
  allowedRoles,
  children,
}: {
  role: string | null;
  allowedRoles: string[];
  children: React.ReactNode;
}) => {
  return allowedRoles.includes(role || '') ? (
    children
  ) : (
    <Navigate to="/login" replace />
  );
};
