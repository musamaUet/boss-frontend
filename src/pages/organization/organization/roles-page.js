import { Helmet } from 'react-helmet-async';
import { RolesView } from 'src/sections/configuration/roles/view';

// ----------------------------------------------------------------------

export default function OrganizationRolesPage() {
  return (
    <>
      <Helmet>
        <title> Organization: Roles</title>
      </Helmet>

      <RolesView />
    </>
  );
}
