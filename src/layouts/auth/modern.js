// @mui
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

// hooks
import { useResponsive } from 'src/hooks/use-responsive';
import { usePathname, useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
import Image from 'src/components/image';

// components
// import { TextLogo } from 'src/components/logo';

const data = [
  { label: 'Residential', file: 'text', image: '/assets/license.png' },
  { label: 'Background Check', file: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`, image: '/assets/bg_check.png' },
  { label: 'Commercial', file: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`, image: '/assets/bond.png' },
  { label: 'Residential', file: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`, image: '/assets/insurance.png' },
  { label: 'Residential', file: 'text', image: '/assets/license.png' },
]


// ----------------------------------------------------------------------

export default function AuthModernLayout({ children, image }) {
  const upMd = useResponsive('up', 'md');
  const pathname = usePathname();
  const router = useRouter()
  const parts = pathname.split('/');
  const mainPath = `/${parts[2]}/${parts[3]}`;

  const renderContent = (
    <Stack
      sx={{
        width: 1,
        mx: 'auto',
        maxWidth: { xs: '100%', md: 'calc(45% - 5px)' },
        height: mainPath === '/jwt/about' || mainPath === '/jwt/portfolio' ? 'auto' : 'auto',
        px: { xs: 2, md: 8 },
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Card
        sx={{
          my: mainPath === '/jwt/about' || mainPath === '/jwt/portfolio' ? 5 : 0,
          py: mainPath === '/jwt/about' || mainPath === '/jwt/portfolio' ? 0 : { xs: 5, md: 0 },
          px: mainPath === '/jwt/about' || mainPath === '/jwt/portfolio' ? 0 : { xs: 3, md: 12 },
          boxShadow: { md: 'none' },
          overflow: { md: 'unset' },
        }}
      >
        {/* <Logo
          sx={{
            mt: { xs: 2, md: 8 },
            mb: { xs: 10, md: 8 },
          }}
        /> */}
        {children}
      </Card>
    </Stack >
  );

  const renderSection = (
    <Stack
      flexGrow={1}
      alignItems={mainPath === '/jwt/about' || mainPath === '/jwt/portfolio' ? 'flex-start' : "center"}
      justifyContent={mainPath === '/jwt/about' || mainPath === '/jwt/portfolio' ? 'flex-start' : "center"}
      spacing={4}
      sx={{
        backgroundColor: '#F0F0F0',
        m: mainPath === '/jwt/login' ? 2 : mainPath === '/jwt/about' || mainPath === '/jwt/portfolio' ? 1 : 4,
        borderRadius: '15px',
      }}
    >
      {
        mainPath === '/jwt/about' ? (
          <Stack justifyContent={'space-between'} height={1}>
            <Image src="/logo/main_logo.png" />
            <Stack direction={'row'} justifyContent={'center'} width={1} mb={5}>
              <Button onClick={() => router.push(paths.auth.jwt.login)} color="primary" sx={{ minWidth: 120, borderRadius: '20px' }} variant="contained">
                Welcome Screen
              </Button>
            </Stack>
          </Stack>
        ) : mainPath === '/jwt/portfolio' ? (
          <Stack width={1} justifyContent={'space-between'} height={1} p={4.5}>
            <Stack spacing={2.5}>
              <Typography variant="h4">Residential</Typography>
              {
                data?.map((item, index) => (
                  <Stack key={index} direction={'row'} alignItems={'center'} gap={2}>
                    <Image src={item.image} sx={{ width: '103px', height: '92px' }} />
                    <Stack gap={2.1}>
                      <Typography variant='h8'>{item.label}</Typography>
                      <Typography variant='text1'>{item.file}</Typography>
                    </Stack>
                  </Stack>
                ))
              }
            </Stack>
            <Stack direction={'row'} justifyContent={'center'} width={1} mt={5}>
              <Button onClick={() => router.push(paths.auth.jwt.login)} color="primary" sx={{ minWidth: 120, borderRadius: '20px' }} variant="contained">
                Welcome Screen
              </Button>
            </Stack>
          </Stack>
        ) : (
          <>
            <Box
              component="img"
              alt="auth"
              src={image || '/assets/illustrations/img1.png'}
              sx={{ maxWidth: 720 }}
            />
            {
              (mainPath === '/jwt/contact' || mainPath === '/jwt/register') && (
                <Stack direction={'row'} justifyContent={'center'} width={1}>
                  <Button onClick={() => router.push(paths.auth.jwt.login)} color="primary" sx={{ minWidth: 120, borderRadius: '20px' }} variant="contained">
                    Welcome Screen
                  </Button>
                </Stack>
              )
            }
          </>
        )
      }
      {mainPath === '/jwt/login' && (
        <Stack
          direction={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
          width={1}
          maxWidth={500}
        >
          <Button onClick={() => router.push(paths.auth.jwt.about)} sx={{ minWidth: 120, borderRadius: '20px' }} color="primary" variant="contained">
            About
          </Button>
          <Button onClick={() => router.push(paths.auth.jwt.portfolio)} color="primary" sx={{ minWidth: 120, borderRadius: '20px' }} variant="contained">
            Portfolio
          </Button>
        </Stack>
      )}
    </Stack>
  );

  return (
    <Stack
      component="main"
      direction="row"
      sx={{
        minHeight: '100vh',
        position: 'relative',
        '&:before': {
          width: 1,
          height: 1,
          zIndex: -1,
          content: "''",
          position: 'absolute',
          backgroundSize: 'cover',
          opacity: { xs: 0.24, md: 0 },
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          backgroundImage: 'url(/assets/blue-cover.jpg)',
        },
      }}
    >
      {upMd && renderSection}
      {renderContent}
    </Stack>
  );
}

AuthModernLayout.propTypes = {
  children: PropTypes.node,
  image: PropTypes.string,
};
