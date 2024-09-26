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
import Grid from '@mui/material/Unstable_Grid2';

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
import FormProvider, { RHFCheckbox, RHFSelect, RHFTextField } from 'src/components/hook-form';
import Image from 'src/components/image';
import { Box, Button, Card, Divider, MenuItem } from '@mui/material';
import { MultiFilePreview, UploadBox } from 'src/components/upload';

// ----------------------------------------------------------------------

export default function MyProfileView() {
  const router = useRouter();

  const dispatch = useDispatch();

  const [errorMsg, setErrorMsg] = useState('');
  const [selectedImages, setSelectedImages] = useState([])

  const searchParams = useSearchParams();
  const { enqueueSnackbar } = useSnackbar();

  const returnTo = searchParams.get('returnTo');

  const currentPassword = useBoolean();
  const newPassword = useBoolean();
  const confirmNewPassword = useBoolean();

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

  const changePass = useCallback(
    async (data) => {
      const obj = { email: data.email, password: data.password };
    },
    [dispatch, reset, returnTo, router]
  );

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      setSelectedImages((prev) => [...prev, ...newFiles])
    },
    [selectedImages]
  );

  const handleRemoveFile = useCallback(
    (inputFile) => {
      const filtered = selectedImages.filter((file) => file !== inputFile);
      setSelectedImages(filtered);
    },
    [selectedImages]
  );

  const renderLogo = (
    <Stack sx={{ mb: 5 }}>
      <Image src="/logo/main_logo.png" />
    </Stack>
  );

  const renderHead = (
    <Stack justifyContent={'center'} alignItems={'center'} spacing={2} sx={{ mb: 5 }}>
      <Typography variant="h4">My Profile</Typography>
    </Stack>
  );

  const renderForm = (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>

      <Stack direction={'row'} alignItems={'center'} gap={10}>
        <Stack width={1} spacing={2} direction={'row'} alignItems={'center'}>
          <Stack direction={'row'} alignItems={'center'} spacing={2} flexWrap={'wrap'}>
            <MultiFilePreview
              thumbnail
              showImage
              files={selectedImages}
              onRemove={(file) => handleRemoveFile(file)}
              sx={{ width: 64, height: 64 }}
            />
          </Stack>
          <UploadBox onDrop={handleDrop} placeholder={<Button variant='contained' color='primary'>Upload</Button>} />
        </Stack>
      </Stack>
      <Grid container rowSpacing={2} columnSpacing={8} mt={2}>
        <Grid md={6}>
          <RHFTextField size='small' name='first_name' type="text" label="First Name:" placeholder='Enter first name' />
        </Grid>
        <Grid md={6}>
          <RHFTextField size='small' name='last_name' type="text" label="Last Name:" placeholder='Enter last name' />
        </Grid>
        <Grid md={12}>
          <RHFTextField size='small' name='email' type="email" label="Email:" placeholder='Enter email' />
        </Grid>
        <Grid md={6}>
          <RHFTextField size='small' name='user_name' type="text" label="User Name:" placeholder='Enter user name' />
        </Grid>
        <Grid md={6}>
          <RHFTextField size='small' name='phone' type="text" label="Phone Number:" placeholder='Enter phone' />
        </Grid>

        <Grid md={12}>
          <RHFTextField name='address' type="textarea" multine rows={8} label="Address:" placeholder='Enter address' />
        </Grid>

      </Grid>
      <Stack width={1} direction={'row'} alignItems={'center'} mt={4}>
        <LoadingButton
          color="primary"
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Save Changes
        </LoadingButton>
      </Stack>
    </FormProvider>

  );

  const renderChangePassword = (
    <FormProvider methods={methods} onSubmit={handleSubmit(changePass)}>
      <Typography textAlign={'start'} variant='h4'>Change Password</Typography>
      <Grid container rowSpacing={2} columnSpacing={8} mt={2}>
        <Grid md={12}>
          <RHFTextField
            name="current_password"
            label="Current Password"
            type={currentPassword.value ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={currentPassword.onToggle} edge="end">
                    <Iconify icon={currentPassword.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid md={6}>
          <RHFTextField
            name="new_password"
            label="New Password"
            type={newPassword.value ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={newPassword.onToggle} edge="end">
                    <Iconify icon={newPassword.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid md={6}>
          <RHFTextField
            name="confirm_new_password"
            label="Confirm New Password"
            type={confirmNewPassword.value ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={confirmNewPassword.onToggle} edge="end">
                    <Iconify icon={confirmNewPassword.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>

      </Grid>
      <Stack width={1} direction={'row'} alignItems={'center'} mt={4}>
        <LoadingButton
          color="primary"
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Update Password
        </LoadingButton>
      </Stack>
    </FormProvider>

  );

  return (
    <Card sx={{ p: 6, width: 1 }}>
      {renderHead}

      {renderForm}
      <Divider sx={{ mt: 6, mb: 6 }} />
      {renderChangePassword}
    </Card>
  );
}
