// @mui
import PropTypes from 'prop-types';
import { alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// hooks
import { useResponsive } from 'src/hooks/use-responsive';
// theme
import { bgGradient } from 'src/theme/css';
// components
import Logo from 'src/components/logo';
import { Button } from '@mui/material';
import { usePathname } from 'src/routes/hooks';

// ----------------------------------------------------------------------

export default function AuthClassicLayout({ children, image, title }) {
  const theme = useTheme();

  const pathname = usePathname();
  const parts = pathname.split('/');
  const mainPath = `/${parts[2]}/${parts[3]}`;

  console.log(mainPath)
  const upMd = useResponsive('up', 'md');

  const renderLogo = (
    <Logo
      sx={{
        zIndex: 9,
        position: 'absolute',
        m: { xs: 2, md: 5 },
      }}
    />
  );

  const renderContent = (
    <Stack
      sx={{
        width: 1,
        mx: 'auto',
        maxWidth: 480,
        px: { xs: 2, md: 8 },
        py: { xs: 15, md: 30 },
      }}
    >
      {children}
    </Stack>
  );

  const renderSection = (
    <Stack
      flexGrow={1}
      alignItems="center"
      justifyContent="center"
      spacing={4}
      sx={{
        backgroundColor: '#F0F0F0',
        m: mainPath === '/jwt/login' ? 0 : 6,
        borderRadius: '15px',
        // ...bgGradient({
        //   color: alpha(
        //     theme.palette.background.default,
        //     theme.palette.mode === 'light' ? 0.88 : 0.94
        //   ),
        //   imgUrl: '/assets/background/overlay_2.jpg',
        // }),
      }}
    >
      {/* <Typography variant="h3" sx={{ maxWidth: 480, textAlign: 'center' }}>
        {title || 'Hi, Welcome back'}
      </Typography> */}

      <Box
        component="img"
        alt="auth"
        src={image || '/assets/illustrations/img1.png'}
        sx={{ maxWidth: 720 }}
      />
      {
        mainPath === '/jwt/login' && (
          <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} width={1} maxWidth={500}>
        <Button sx={{minWidth: 120, borderRadius: '20px'}} color='primary' variant='contained'>
          About
        </Button>
        <Button color='primary'  sx={{minWidth: 120, borderRadius: '20px'}} variant='contained'>
          Portfolio
        </Button>
      </Stack>
        )
      }
    </Stack>
  );

  return (
    <Stack
      component="main"
      direction="row"
      sx={{
        minHeight: '100vh',
      }}
    >
      {/* {renderLogo} */}

      {upMd && renderSection}

      {renderContent}
    </Stack>
  );
}

AuthClassicLayout.propTypes = {
  children: PropTypes.node,
  image: PropTypes.string,
  title: PropTypes.string,
};
