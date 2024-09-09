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
// components
import Iconify from 'src/components/iconify';
import FormProvider, { RHFSelect, RHFTextField } from 'src/components/hook-form';
import Image from 'src/components/image';

// ----------------------------------------------------------------------

const data = [
  { label: 'Residentail', file: 'text', image: '/assets/license.png' },
  { label: 'Residential', file: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`, image: '/assets/insurance.png' },
  { label: 'Workers comp', file: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`, image: '/assets/worker.png' },
  { label: 'Commercial', file: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`, image: '/assets/bond.png' },
  { label: 'Background Check', file: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`, image: '/assets/bg_check.png' },
]

export default function JwtPortfolioView() {
  const router = useRouter();

  const dispatch = useDispatch();

  const [errorMsg, setErrorMsg] = useState('');

  const searchParams = useSearchParams();

  const returnTo = searchParams.get('returnTo');

  const password = useBoolean();

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    email: 'demo@minimals.cc',
    password: 'demo1234',
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
      // try {
      //   await dispatch(login(data.email, data.password));

      //   router.push(PATH_AFTER_LOGIN);
      // } catch (error) {
      //   console.error(error);
      //   reset();
      //   setErrorMsg(typeof error === 'string' ? error : error.message);
      // }
    },
    [dispatch, reset, returnTo, router]
  );

  const renderHead = (
    <Stack spacing={1} sx={{ mb: 2 }}>
      <Typography variant="h4">About Us</Typography>
      <Typography variant="body3">We are a family owned business from the construction field specialized
        on plumbing. We do residential and commercial projects. This software
        is the bacck bone of our company informatic system.</Typography>
    </Stack>
  );

  const renderDownloads = (
    <Stack spacing={2.5}>
      <Typography variant="h4">Commercial</Typography>
      {
        data?.map((item, index) => (
          <Stack key={index} direction={'row'} alignItems={'center'} gap={2}>
            <Image src={item.image} sx={{ width: '103px', height: '92px' }} />
            <Stack gap={2.1}>
              <Typography variant='h8'>{item.label}</Typography>
              <Typography variant='text1'>{item.file}.pdf</Typography>
            </Stack>
          </Stack>
        ))
      }
    </Stack>
  );

  return (
    <>
      {/* // <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}> */}
      {/* {renderLogo} */}
      {/* {renderHead} */}

      {/* <Alert severity="info" sx={{ mb: 3 }}>
        Use email : <strong>demo@minimals.cc</strong> / password :<strong> demo1234</strong>
      </Alert> */}

      {renderDownloads}
      {/* // </FormProvider> */}
    </>
  );
}
