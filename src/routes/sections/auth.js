import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
// auth
import { GuestGuard } from 'src/auth/guard';
// layouts
import AuthClassicLayout from 'src/layouts/auth/classic';
import AuthModernLayout from 'src/layouts/auth/modern';

// components
import { SplashScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

// JWT
const JwtLoginPage = lazy(() => import('src/pages/auth/jwt/login'));
const JwtRegisterPage = lazy(() => import('src/pages/auth/jwt/register'));
const JwtContactPage = lazy(() => import('src/pages/auth/jwt/contact'));
const JwtAboutPage = lazy(() => import('src/pages/auth/jwt/about'));
const JwtPortfolioPage = lazy(() => import('src/pages/auth/jwt/portfolio'));

// ----------------------------------------------------------------------

const authJwt = {
  path: 'jwt',
  element: (
    <GuestGuard>
      <Suspense fallback={<SplashScreen />}>
        <Outlet />
      </Suspense>
    </GuestGuard>
  ),
  children: [
    {
      path: 'login',
      element: (
        <AuthModernLayout>
          <JwtLoginPage />
        </AuthModernLayout>
      ),
    },
    {
      path: 'register',
      element: (
        <AuthModernLayout title="Manage the job more effectively with Minimal">
          <JwtRegisterPage />
        </AuthModernLayout>
      ),
    },
    {
      path: 'contact',
      element: (
        <AuthModernLayout>
          <JwtContactPage />
        </AuthModernLayout>
      ),
    },
    {
      path: 'about',
      element: (
        <AuthModernLayout>
          <JwtAboutPage />
        </AuthModernLayout>
      ),
    },
    {
      path: 'portfolio',
      element: (
        <AuthModernLayout>
          <JwtPortfolioPage />
        </AuthModernLayout>
      ),
    },
  ],
};

export const authRoutes = [
  {
    path: 'auth',
    children: [authJwt],
  },
];
