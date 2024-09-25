import { Helmet } from 'react-helmet-async';
import { PermissionsView } from 'src/sections/configuration/permissions/view';

// ----------------------------------------------------------------------

export default function OrganizationPermissionPage() {
  return (
    <>
      <Helmet>
        <title> Organization: Permission</title>
      </Helmet>

      <PermissionsView />
    </>
  );
}
