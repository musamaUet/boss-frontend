// @mui
import { useTheme } from '@mui/material/styles';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
// theme
import { bgBlur } from 'src/theme/css';
// routes
import { paths } from 'src/routes/paths';
// hooks
import { useOffSetTop } from 'src/hooks/use-off-set-top';
// components
import Logo from 'src/components/logo';
import { RouterLink } from 'src/routes/components';
//
import { HEADER } from '../config-layout';
import HeaderShadow from './header-shadow';
import SettingsButton from './settings-button';
import { usePathname } from 'src/routes/hooks';
import { Typography } from '@mui/material';

// ----------------------------------------------------------------------

const navigationRoutes = [
  { title: 'Dashboard', link: paths.organization.dashboard },
  { title: 'Users', link: paths.organization.users },
  { title: 'Roles', link: paths.organization.roles },
  { title: 'Permissions', link: paths.organization.permissions },
  { title: 'Relationships', link: paths.organization.relationships },
  { title: 'Settings', link: paths.organization.settings },
]

const loginNavigationRoutes = [
  { title: 'Features', link: '#' },
  { title: 'Pricing', link: '#' },
  { title: 'Contact', link: '#' },
  { title: 'About', link: '#' },
]

export default function HeaderSimple() {
  const theme = useTheme();

  const pathname = usePathname();
  const parts = pathname.split('/');
  const mainPath = `/${parts[2]}`;

  const offsetTop = useOffSetTop(HEADER.H_DESKTOP);

  return (
    <AppBar>
      <Toolbar
        sx={{
          justifyContent: 'space-between',
          boxShadow: (theme) => theme.customShadows.z8,
          height: {
            xs: HEADER.H_MOBILE,
            md: HEADER.H_DESKTOP,
          },
          transition: theme.transitions.create(['height'], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.shorter,
          }),
          ...(offsetTop && {
            ...bgBlur({
              color: theme.palette.background.default,
            }),
            height: {
              md: HEADER.H_DESKTOP_OFFSET,
            },
          }),
        }}
      >
        {
          mainPath === '/login' || mainPath === '/user-login' ?
            <Stack direction={'row'} alignItems={'center'} gap={2}>
              <Logo />
              <Typography>ezboss</Typography>
            </Stack>
            :
            <Stack>
              <Typography variant='h5'>Organization: Imtiaz Super Market</Typography>
              <Typography variant='subtitle2'>Admin: Usama_2024</Typography>
            </Stack>
        }

        <Stack direction="row" alignItems="center" spacing={2}>
          {
            (mainPath === '/login' || mainPath === '/user-login') ?
              loginNavigationRoutes?.map((item, index) => (
                <Link
                  key={index}
                  href={item?.link}
                  component={RouterLink}
                  color="inherit"
                  sx={{ typography: 'subtitle2' }}
                >
                  {item?.title}
                </Link>
              ))
              :
              navigationRoutes?.map((item, index) => (
                <Link
                  key={index}
                  href={item?.link}
                  component={RouterLink}
                  color="inherit"
                  sx={{ typography: 'subtitle2' }}
                >
                  {item?.title}
                </Link>
              ))
          }
        </Stack>
      </Toolbar>

      <HeaderShadow />
    </AppBar>
  );
}
