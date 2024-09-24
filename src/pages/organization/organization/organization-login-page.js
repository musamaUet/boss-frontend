import { Helmet } from 'react-helmet-async';
import { OrganizationLoginView } from 'src/sections/configuration/auth/view';

// ----------------------------------------------------------------------

export default function OrganizationLoginPage() {
  return (
    <>
      <Helmet>
        <title> Organization: Login</title>
      </Helmet>

      <OrganizationLoginView />
    </>
  );
}
