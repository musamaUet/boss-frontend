import { Helmet } from 'react-helmet-async';
import { OrganizationUserLoginView } from 'src/sections/configuration/auth/view';

// ----------------------------------------------------------------------

export default function OrganizationLoginPage() {
  return (
    <>
      <Helmet>
        <title> Organization: User Login</title>
      </Helmet>

      <OrganizationUserLoginView />
    </>
  );
}
