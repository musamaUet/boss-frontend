import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useCallback, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
// redux
import { useDispatch } from 'src/redux/store';
import { register } from 'src/redux/slices/auth';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// routes
import { paths } from 'src/routes/paths';
import { useSearchParams, useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';
// config
import { PATH_AFTER_LOGIN } from 'src/config-global';
// components
import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import Image from 'src/components/image';
import { Box, Button, Fab } from '@mui/material';
import { useSnackbar } from 'src/components/snackbar';

// ----------------------------------------------------------------------

export default function JwtRegisterView() {
  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();

  const [errorMsg, setErrorMsg] = useState('');

  const searchParams = useSearchParams();

  const returnTo = searchParams.get('returnTo');

  const password = useBoolean();

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().required('First name required'),
    lastName: Yup.string().required('Last name required'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = useCallback(
    async (data) => {
      try {
        await dispatch(register(data.email, data.password, data.firstName, data?.lastName));
        enqueueSnackbar('User created successfully. Login to continue', { variant: 'success' })
        // router.push();
      } catch (error) {
        console.error(error);
        reset();
        setErrorMsg(typeof error === 'string' ? error : error.message);
      }
    },
    [dispatch, reset, returnTo, router]
  );

  const renderLogo = (
    <Stack sx={{ mb: 5 }}>
      <Image src="/logo/main_logo.png" />
    </Stack>
  );

  const renderHead = (
    <Stack alignItems={'center'} spacing={2} sx={{ mb: 5, position: 'relative' }}>
      <Typography variant="h4">Get started absolutely free</Typography>

      <Stack direction="row" spacing={0.5}>
        <Typography variant="body2"> Already have an account? </Typography>

        <Link href={paths.auth.jwt.login} component={RouterLink} variant="subtitle2">
          Sign in
        </Link>
      </Stack>
    </Stack>
  );

  const renderTerms = (
    <Typography
      component="div"
      sx={{ color: 'text.secondary', mt: 2.5, typography: 'caption', textAlign: 'center' }}
    >
      {'By signing up, I agree to '}
      <Link underline="always" color="text.primary">
        Terms of Service
      </Link>
      {' and '}
      <Link underline="always" color="text.primary">
        Privacy Policy
      </Link>
      .
    </Typography>
  );

  const renderForm = (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2.5}>
        {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField name="firstName" label="First name" />
          <RHFTextField name="lastName" label="Last name" />
        </Stack>

        <RHFTextField name="email" label="Email address" />

        <RHFTextField
          name="password"
          label="Password"
          type={password.value ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={password.onToggle} edge="end">
                  <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <LoadingButton
          fullWidth
          color="primary"
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
          sx={{ borderRadius: 20 }}
        >
          Create account
        </LoadingButton>
      </Stack>
    </FormProvider>
  );

  const renderSocialButtons = (
    <Stack spacing={2} my={3}>
      <Box fullWidth sx={{ display: 'flex', flexDirection: 'row', gap: 1, justifyContent: 'center', minHeight: '48px', alignItems: 'center', cursor: 'pointer', borderRadius: 20, backgroundColor: '#4285F4' }}>
        <Iconify icon='mingcute:google-fill' color='white' />
        <Typography color={'white'}>Sign up with Google</Typography>
      </Box>

      <Box fullWidth sx={{ display: 'flex', flexDirection: 'row', gap: 1, justifyContent: 'center', minHeight: '48px', alignItems: 'center', cursor: 'pointer', borderRadius: 20, backgroundColor: 'black' }}>
        <Iconify icon='ri:apple-fill' color='white' />
        <Typography color={'white'}>Sign up with Apple</Typography>
      </Box>

      <Box fullWidth sx={{ display: 'flex', flexDirection: 'row', gap: 1, justifyContent: 'center', minHeight: '48px', alignItems: 'center', cursor: 'pointer', borderRadius: 20, backgroundColor: '#F25022' }}>
        <Iconify icon='mdi:microsoft-windows' color='white' />
        <Typography color={'white'}>Sign up with Microsoft</Typography>
      </Box>
    </Stack>
  )

  return (
    <>
      {renderLogo}
      {renderHead}

      {renderForm}
      {renderSocialButtons}

      {/* {renderTerms} */}
    </>
  );
}
