import { Helmet } from 'react-helmet-async';
import { OrganizationSignupView } from 'src/sections/configuration/auth/view';

// ----------------------------------------------------------------------

export default function OrganizationSignupPage() {
  return (
    <>
      <Helmet>
        <title> Organization: Login</title>
      </Helmet>

      <OrganizationSignupView />
    </>
  );
}
