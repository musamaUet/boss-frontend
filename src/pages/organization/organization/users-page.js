import { Helmet } from 'react-helmet-async';
import { UsersView } from 'src/sections/configuration/users/view';

// ----------------------------------------------------------------------

export default function OrganizationUsersPage() {
  return (
    <>
      <Helmet>
        <title> Organization: Users</title>
      </Helmet>

      <UsersView />
    </>
  );
}
