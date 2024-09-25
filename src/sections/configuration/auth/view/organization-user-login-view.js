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
import { login } from 'src/redux/slices/auth';
// routes
import { paths } from 'src/routes/paths';
import { useSearchParams, useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';
// config
import { PATH_AFTER_LOGIN } from 'src/config-global';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
import { useSnackbar } from 'src/components/snackbar';

// components
import Iconify from 'src/components/iconify';
import FormProvider, { RHFCheckbox, RHFTextField } from 'src/components/hook-form';
import Image from 'src/components/image';
import { Button, Card } from '@mui/material';

// ----------------------------------------------------------------------

export default function OrganizationUserLoginView() {
  const router = useRouter();

  const dispatch = useDispatch();

  const [errorMsg, setErrorMsg] = useState('');

  const searchParams = useSearchParams();
  const { enqueueSnackbar } = useSnackbar();

  const returnTo = searchParams.get('returnTo');

  const password = useBoolean();

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    password: Yup.string().required('Password is required'),
  });

  // const defaultValues = {
  //   email: 'demo@minimals.cc',
  //   password: 'demo1234',
  // };

  const defaultValues = {
    email: '',
    password: '',
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = useCallback(
    async (data) => {
      const obj = { email: data.email, password: data.password };

    },
    [dispatch, reset, returnTo, router]
  );

  const renderLogo = (
    <Stack sx={{ mb: 5 }}>
      <Image src="/logo/main_logo.png" />
    </Stack>
  );

  const renderHead = (
    <Stack justifyContent={'center'} alignItems={'center'} spacing={2} sx={{ mb: 5 }}>
      <Typography variant="h4">Create Your Ezboss Account</Typography>

      {/* <Stack direction="row" spacing={0.5}>
        <Typography variant="body2">New user?</Typography>

        <Link component={RouterLink} href={paths.auth.jwt.register} variant="subtitle2">
          Create an account
        </Link>
      </Stack> */}
    </Stack>
  );

  const renderForm = (
    <Stack spacing={2.5}>

      <RHFTextField name='user_name' type="text" label="Email or UserName:" placeholder='Enter user name' />


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

      <Stack direction={'row'} alignItems={'center'}>
        <RHFCheckbox name={'agree_terms'} />
        <Typography>Remember me</Typography>
      </Stack>
      <Stack width={1} direction={'row'} alignItems={'center'} gap={3}>
        <LoadingButton
          color="primary"
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Login
        </LoadingButton>
        <LoadingButton
          color="primary"
          size="large"
        >
          Forgot Password
        </LoadingButton>
      </Stack>
    </Stack>
  );

  return (
    <Card sx={{ p: 6, width: 1, maxWidth: '600px' }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        {renderHead}

        {renderForm}

      </FormProvider>
    </Card>
  );
}
