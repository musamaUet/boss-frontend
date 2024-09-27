import { Helmet } from 'react-helmet-async';
import { DashboardView } from 'src/sections/configuration/dashboard/view';

// ----------------------------------------------------------------------

export default function DashboardPage() {
  return (
    <>
      <Helmet>
        <title>Organization: Dashboard</title>
      </Helmet>

      <DashboardView />
    </>
  );
}
