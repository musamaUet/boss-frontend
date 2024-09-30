import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useCallback, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import Container from '@mui/material/Container';
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
import { useSettingsContext } from 'src/components/settings';
import Iconify from 'src/components/iconify';
import FormProvider, { RHFCheckbox, RHFSelect, RHFTextField } from 'src/components/hook-form';
import Image from 'src/components/image';
import { Box, Button, Card, Divider, MenuItem } from '@mui/material';
import { MultiFilePreview, UploadBox } from 'src/components/upload';

// ----------------------------------------------------------------------

export default function SettingsView() {
  const router = useRouter();
  const settings = useSettingsContext();
  const dispatch = useDispatch();

  const [errorMsg, setErrorMsg] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);

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
      setSelectedImages((prev) => [...prev, ...newFiles]);
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
      <Typography variant="h4"></Typography>
    </Stack>
  );

  const renderForm = (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h5" textAlign={'start'}>
        Global Configurations
      </Typography>
      <Grid container rowSpacing={5} mt={2}>
        <Grid md={12}>
          <RHFTextField
            size="small"
            name="site_title"
            type="text"
            label="Site Title:"
            placeholder="Enter site title"
          />
        </Grid>
        <Grid md={12}>
          <RHFSelect
            fullWidth
            size="small"
            label="Default Language:"
            name="language"
            InputLabelProps={{ shrink: true }}
            sx={{ height: '37px' }}
            PaperPropsSx={{ textTransform: 'capitalize' }}
          >
            {['English', 'Urdu', 'French', 'German'].map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </RHFSelect>
        </Grid>
        <Grid md={12}>
          <RHFSelect
            fullWidth
            size="small"
            label="Time Zone:"
            name="timezone"
            InputLabelProps={{ shrink: true }}
            sx={{ height: '37px' }}
            PaperPropsSx={{ textTransform: 'capitalize' }}
          >
            {['English', 'Urdu', 'French', 'German'].map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </RHFSelect>
        </Grid>
        <Stack direction={'row'} alignItems={'center'}>
          <RHFCheckbox name={'enable_registration'} />
          <Typography>Enable Registration</Typography>
        </Stack>
      </Grid>

      <Stack width={1} direction={'row'} alignItems={'center'} mt={4}>
        <LoadingButton
          color="primary"
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Save Settings
        </LoadingButton>
      </Stack>
    </FormProvider>
  );

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <Card sx={{ p: 6, width: 1 }}>
        {renderHead}

        {renderForm}
      </Card>
    </Container>
  );
}
