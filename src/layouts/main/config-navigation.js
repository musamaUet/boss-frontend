// routes
import { paths } from 'src/routes/paths';
// config
// import { PATH_AFTER_LOGIN } from 'src/config-global';
// components
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export const navConfig = [
  { title: 'Dashboard', path: paths.organization.dashboard },
  { title: 'Users', path: paths.organization.users },
  { title: 'Roles', path: paths.organization.roles },
  { title: 'Permissions', path: paths.organization.permissions },
  { title: 'Relationships', path: paths.organization.relationships },
  { title: 'Settings', path: paths.organization.settings },
];
