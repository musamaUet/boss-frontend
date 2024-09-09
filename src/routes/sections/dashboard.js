import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
// auth
import { AuthGuard } from 'src/auth/guard';
// layouts
import DashboardLayout from 'src/layouts/dashboard';
// components
import { LoadingScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

const IndexPage = lazy(() => import('src/pages/dashboard/one'));
// const PageTwo = lazy(() => import('src/pages/dashboard/two'));
const PageThree = lazy(() => import('src/pages/dashboard/three'));
const PageFour = lazy(() => import('src/pages/dashboard/four'));
const PageFive = lazy(() => import('src/pages/dashboard/five'));
const PageSix = lazy(() => import('src/pages/dashboard/six'));
const InvoicePage = lazy(() => import('src/pages/dashboard/invoice-page'));
const SchedulePage = lazy(() => import('src/pages/dashboard/sales/schedule-page'));
const SalesPage = lazy(() => import('src/pages/dashboard/sales/sales-page'));
const CommercialPage = lazy(() => import('src/pages/dashboard/sales/commercial-page'));
const ResidentialPage = lazy(() => import('src/pages/dashboard/sales/residential-view'));
const ServicesPage = lazy(() => import('src/pages/dashboard/sales/services-page'));
// const SchedulePage = lazy(() => import('src/pages/dashboard/schedule-page'));
const PaymentPage = lazy(() => import('src/pages/dashboard/payment-page'));

// ----------------------------------------------------------------------

export const dashboardRoutes = [
  {
    path: 'dashboard',
    element: (
      // <AuthGuard>
      <DashboardLayout>
        <Suspense fallback={<LoadingScreen />}>
          <Outlet />
        </Suspense>
      </DashboardLayout>
      // </AuthGuard>
    ),
    children: [
      { element: <IndexPage />, index: true },
      {
        path: 'sales',
        children: [
          { element: <SalesPage />, index: true },
          { path: 'home', element: <SalesPage /> },
          { path: 'schedule', element: <SchedulePage /> },
          { path: 'services', element: <ServicesPage /> },
          { path: 'residential', element: <ResidentialPage /> },
          { path: 'commercial', element: <CommercialPage /> },
        ],
      },
      {
        path: 'invoice',
        children: [
          { path: 'add', element: <InvoicePage />, index: true },
          { path: ':id', element: <InvoicePage /> },
        ],
      },
      // { path: 'two', element: <PageTwo /> },
      { path: 'three', element: <PageThree /> },
      { element: <PageFour />, index: true },
      { path: 'five', element: <PageFive /> },
      { path: 'six', element: <PageSix /> },
      // { path: 'invoice', element: <InvoicePage /> },
      // { path: 'schedule', element: <SchedulePage /> },
      // { path: 'schedule', element: <SchedulePage /> },
      { path: 'payment', element: <PaymentPage /> },
    ],
  },
];
