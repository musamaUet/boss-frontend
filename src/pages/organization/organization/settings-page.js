import { Helmet } from 'react-helmet-async';
import { SettingsView } from 'src/sections/configuration/dashboard/view';

// ----------------------------------------------------------------------

export default function SettingsPage() {
  return (
    <>
      <Helmet>
        <title> Organization: Settings</title>
      </Helmet>

      <SettingsView />
    </>
  );
}
