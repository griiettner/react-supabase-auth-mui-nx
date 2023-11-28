import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@hooks';
import { REDIRECT_LOGIN } from '@config';

export function AuthRoute() {
  const { data } = useAuth();
  const location = useLocation();
console.log({ data, location });
  return data?.session?.access_token ? (
    <Outlet />
  ) : (
    <Navigate to={REDIRECT_LOGIN} replace state={{ path: location.pathname }} />
  );
};
