import PropTypes from 'prop-types'; // @mui
import Button from '@mui/material/Button';
// routes
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

// ----------------------------------------------------------------------

const loginPaths = {
  jwt: paths.auth.jwt.login,
  // auth0: paths.auth.auth0.login,
  // amplify: paths.auth.amplify.login,
  // firebase: paths.auth.firebase.login,
};

export default function LoginButton({ sx }) {
  const loginPath = loginPaths.jwt;

  return (
    <Button component={RouterLink} href={loginPath} variant="outlined" sx={{ mr: 1, ...sx }}>
      Login
    </Button>
  );
}

LoginButton.propTypes = {
  sx: PropTypes.object,
};
