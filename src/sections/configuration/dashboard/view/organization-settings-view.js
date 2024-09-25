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

export default function OrganizationSettingsView() {
  const router = useRouter();

  const dispatch = useDispatch();

  const [errorMsg, setErrorMsg] = useState('');
  const [selectedImages, setSelectedImages] = useState([])

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
      <Typography variant="h4">Organization Settings</Typography>
    </Stack>
  );

  const renderForm = (
    <>
      <Typography textAlign={'start'}>Organization Details:</Typography>
      <Grid container columnSpacing={8} mt={2}>
        <Grid md={6}>
          <Stack width={1} gap={2}>
            <RHFTextField name='organization_name' type="text" label="Organization Name:" placeholder='Enter organization name' />
            <RHFTextField name='address' type="text" label="Address:" placeholder='Enter address' />
            <RHFTextField name='phone' type="text" label="Phone Number:" placeholder='Enter phone number' />
          </Stack>
        </Grid>
        <Grid md={6}>
          <Stack direction={'row'} alignItems={'center'} gap={10}>
            <Typography>Logo:</Typography>
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
        </Grid>
      </Grid>
      <Divider sx={{ width: 1, my: 6 }} />
      <Grid container columnSpacing={8}>
        <Grid md={6}>
          <Typography textAlign={'start'}>Admin User:</Typography>
          <Stack width={1} gap={2} mt={3}>
            <Typography textAlign={'start'}>Current Admin:  Usama</Typography>
            <Box sx={{ width: '100%' }}>
              <Typography className="text-night-rider-5" textAlign={'start'}>Change Admin</Typography>
              <RHFSelect
                fullWidth
                size="small"
                name="change_admin"
                InputLabelProps={{ shrink: true }}
                sx={{ mt: 1, height: '37px' }}
                PaperPropsSx={{ textTransform: 'capitalize' }}
              >
                {['Admin', 'User', 'Employee', 'Manager'].map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </RHFSelect>
            </Box>
            <Box sx={{ width: '100%' }}>
              <Typography className="text-night-rider-5" textAlign={'start'}>Parent Organization</Typography>
              <RHFSelect
                fullWidth
                size="small"
                name="parent_organization"
                InputLabelProps={{ shrink: true }}
                sx={{ mt: 1, height: '37px' }}
                PaperPropsSx={{ textTransform: 'capitalize' }}
              >
                {['Admin', 'User', 'Employee', 'Manager'].map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </RHFSelect>
            </Box>
          </Stack>
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
    </>
  );

  return (
    <Card sx={{ p: 6, width: 1 }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        {renderHead}

        {renderForm}

      </FormProvider>
    </Card>
  );
}
