import { lazy } from 'react';
import { Outlet } from 'react-router-dom';
// layouts
import CompactLayout from 'src/layouts/compact';

// ----------------------------------------------------------------------

const Page404 = lazy(() => import('src/pages/404'));
const OrganizationLoginPage = lazy(() => import('src/pages/organization/organization/organization-login-page'));
const OrganizationUserLoginPage = lazy(() => import('src/pages/organization/organization/organization-user-login-page'));
const UsersPage = lazy(() => import('src/pages/organization/organization/users-page'));


// ----------------------------------------------------------------------

export const mainRoutes = [
  {
    element: (
      <CompactLayout>
        <Outlet />
      </CompactLayout>
    ),
    children: [{ path: '404', element: <Page404 /> },
    {
      path: 'organization-login',
      element: (
        <OrganizationLoginPage />
      ),
    },
    {
      path: 'organization-user-login',
      element: (
        <OrganizationUserLoginPage />
      ),
    },
    {
      path: 'users',
      element: (
        <UsersPage />
      ),
    },
    ],
  },
];
