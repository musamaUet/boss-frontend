import { Helmet } from 'react-helmet-async';
import { UsersView } from 'src/sections/configuration/users/view';

// ----------------------------------------------------------------------

export default function OrganizationLoginPage() {
  return (
    <>
      <Helmet>
        <title> Organization: Users</title>
      </Helmet>

      <UsersView />
    </>
  );
}
