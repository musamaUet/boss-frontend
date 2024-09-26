import { lazy } from 'react';
import { Outlet } from 'react-router-dom';
// layouts
import CompactLayout from 'src/layouts/compact';

// ----------------------------------------------------------------------

const Page404 = lazy(() => import('src/pages/404'));
const OrganizationLoginPage = lazy(() =>
  import('src/pages/organization/organization/organization-login-page')
);
const OrganizationUserLoginPage = lazy(() =>
  import('src/pages/organization/organization/organization-user-login-page')
);
const UsersPage = lazy(() => import('src/pages/organization/organization/users-page'));
const RolesPage = lazy(() => import('src/pages/organization/organization/roles-page'));
const PermissionsPage = lazy(() => import('src/pages/organization/organization/permissions-page'));
const RelationshipPage = lazy(() => import('src/pages/organization/organization/relationship-page'));
const OrganizationSettingsPage = lazy(() => import('src/pages/organization/organization/organization-settings-page'));
const MyProfilePage = lazy(() => import('src/pages/organization/organization/my-profile-page'));

// ----------------------------------------------------------------------

export const mainRoutes = [
  {
    path: 'organization',
    element: (
      <CompactLayout>
        <Outlet />
      </CompactLayout>
    ),
    children: [
      { path: '404', element: <Page404 /> },
      {
        path: 'login',
        element: <OrganizationLoginPage />,
      },
      {
        path: 'user-login',
        element: <OrganizationUserLoginPage />,
      },
      {
        path: 'users',
        element: <UsersPage />,
      },
      {
        path: 'roles',
        element: <RolesPage />,
      },
      {
        path: 'permissions',
        element: <PermissionsPage />,
      },
      {
        path: 'relationships',
        element: <RelationshipPage />,
      },
      {
        path: 'organization-settings',
        element: <OrganizationSettingsPage />,
      },
      {
        path: 'my-profile',
        element: <MyProfilePage />,
      },
    ],
  },
];
