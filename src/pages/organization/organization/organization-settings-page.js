import { Helmet } from 'react-helmet-async';
import { OrganizationSettingsView } from 'src/sections/configuration/dashboard/view';

// ----------------------------------------------------------------------

export default function OrganizationSettingsPage() {
  return (
    <>
      <Helmet>
        <title> Organization: Settings</title>
      </Helmet>

      <OrganizationSettingsView />
    </>
  );
}
