import { Navigate, useRoutes } from 'react-router-dom';
import { AuthRoute } from '@components';
import { authRoutes } from './auth';

export function Router() {
console.log('authRoutes', authRoutes);
  return useRoutes([
    {
      path: '/',
      element: <AuthRoute />,
      children: [
        {
          path: '/',
          element: <h1>Home</h1>
        }
      ]
    },
    ...authRoutes,
    {
      path: '*',
      element: <Navigate to="/" />
    }
  ]);
}
