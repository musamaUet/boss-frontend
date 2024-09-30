import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
// layouts
import MainLayout from 'src/layouts/main';
import CompactLayout from 'src/layouts/compact';
// components
import { LoadingScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

const Page404 = lazy(() => import('src/pages/404'));
const OrganizationSignupPage = lazy(() =>
  import('src/pages/organization/organization/organization-signup-page')
);
const OrganizationUserLoginPage = lazy(() =>
  import('src/pages/organization/organization/organization-user-login-page')
);
const UsersPage = lazy(() => import('src/pages/organization/organization/users-page'));
const RolesPage = lazy(() => import('src/pages/organization/organization/roles-page'));
const PermissionsPage = lazy(() => import('src/pages/organization/organization/permissions-page'));
const RelationshipPage = lazy(() =>
  import('src/pages/organization/organization/relationship-page')
);
const OrganizationSettingsPage = lazy(() =>
  import('src/pages/organization/organization/organization-settings-page')
);
const MyProfilePage = lazy(() => import('src/pages/organization/organization/my-profile-page'));
const DashboardPage = lazy(() => import('src/pages/organization/organization/dashboard-page'));
const SettingsPage = lazy(() => import('src/pages/organization/organization/settings-page'));

// ----------------------------------------------------------------------

export const mainRoutes = [
  {
    path: 'organization',
    element: (
      <CompactLayout>
        <Suspense fallback={<LoadingScreen />}>
          <Outlet />
        </Suspense>
      </CompactLayout>
    ),
    children: [
      {
        path: 'user-register',
        element: <OrganizationSignupPage />,
      },
      {
        path: 'user-login',
        element: <OrganizationUserLoginPage />,
      },
    ],
  },
  {
    path: 'organization',
    element: (
      <MainLayout>
        <Outlet />
      </MainLayout>
    ),
    children: [
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
      {
        path: 'dashboard',
        element: <DashboardPage />,
      },
      {
        path: 'system-settings',
        element: <SettingsPage />,
      },
      { path: '404', element: <Page404 /> },
    ],
  },
];
