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

const categoryOptions = [
  { value: 'Software House', label: 'Software House' },
  { value: 'Digital Marketing', label: 'Digital Marketing' },
  { value: 'E-commerce', label: 'E-commerce' },
  { value: 'Finance', label: 'Finance' },
  { value: 'Healthcare', label: 'Healthcare' },
  { value: 'Education', label: 'Education' },
  { value: 'Real Estate', label: 'Real Estate' },
  { value: 'Travel and Tourism', label: 'Travel and Tourism' },
  { value: 'Food and Beverage', label: 'Food and Beverage' },
  { value: 'Retail', label: 'Retail' },
  { value: 'Manufacturing', label: 'Manufacturing' },
  { value: 'Logistics', label: 'Logistics' },
  { value: 'Entertainment', label: 'Entertainment' },
  { value: 'Media and Publishing', label: 'Media and Publishing' },
  { value: 'Construction', label: 'Construction' },
  { value: 'Automotive', label: 'Automotive' },
  { value: 'Consulting', label: 'Consulting' },
  { value: 'Non-Profit', label: 'Non-Profit' },
  { value: 'Legal Services', label: 'Legal Services' },
  { value: 'Human Resources', label: 'Human Resources' },
  { value: 'IT Services', label: 'IT Services' },
  { value: 'Telecommunications', label: 'Telecommunications' },
  { value: 'Energy', label: 'Energy' },
  { value: 'Pharmaceutical', label: 'Pharmaceutical' },
  { value: 'Agriculture', label: 'Agriculture' },
  { value: 'Fashion', label: 'Fashion' },
  { value: 'Beauty and Personal Care', label: 'Beauty and Personal Care' },
  { value: 'Sports and Fitness', label: 'Sports and Fitness' },
  { value: 'Hospitality', label: 'Hospitality' },
  { value: 'Event Management', label: 'Event Management' },
  { value: 'Aerospace', label: 'Aerospace' },
  { value: 'Defense', label: 'Defense' },
  { value: 'Government', label: 'Government' },
  { value: 'Insurance', label: 'Insurance' },
  { value: 'Engineering', label: 'Engineering' },
  { value: 'Architecture', label: 'Architecture' },
  { value: 'Market Research', label: 'Market Research' },
  { value: 'Graphic Design', label: 'Graphic Design' },
  { value: 'Interior Design', label: 'Interior Design' },
  { value: 'Art and Craft', label: 'Art and Craft' },
  { value: 'Handmade Goods', label: 'Handmade Goods' },
  { value: 'Jewelry', label: 'Jewelry' },
  { value: 'Furniture', label: 'Furniture' },
  { value: 'Cleaning Services', label: 'Cleaning Services' },
  { value: 'Security Services', label: 'Security Services' },
  { value: 'Recruitment Agency', label: 'Recruitment Agency' },
  { value: 'Technical Support', label: 'Technical Support' },
  { value: 'Video Production', label: 'Video Production' },
  { value: 'Music Production', label: 'Music Production' },
  { value: 'Animation and VFX', label: 'Animation and VFX' },
  { value: 'Printing Services', label: 'Printing Services' },
  { value: 'Photography', label: 'Photography' },
  { value: 'Pet Services', label: 'Pet Services' },
  { value: 'Gardening and Landscaping', label: 'Gardening and Landscaping' },
  { value: 'Fitness and Wellness', label: 'Fitness and Wellness' },
  { value: 'Home Improvement', label: 'Home Improvement' },
  { value: 'Apparel', label: 'Apparel' },
  { value: 'Technology', label: 'Technology' },
  { value: 'Biotechnology', label: 'Biotechnology' },
  { value: 'Marine', label: 'Marine' },
  { value: 'Mining', label: 'Mining' },
  { value: 'Chemical', label: 'Chemical' },
  { value: 'Environmental Services', label: 'Environmental Services' },
  { value: 'Transportation', label: 'Transportation' },
  { value: 'Urban Planning', label: 'Urban Planning' },
  { value: 'Television and Broadcasting', label: 'Television and Broadcasting' },
  { value: 'Public Relations', label: 'Public Relations' },
  { value: 'Advertising', label: 'Advertising' },
  { value: 'Business Services', label: 'Business Services' },
  { value: 'Data Analysis', label: 'Data Analysis' },
  { value: 'Cloud Computing', label: 'Cloud Computing' },
  { value: 'Artificial Intelligence', label: 'Artificial Intelligence' },
  { value: 'Machine Learning', label: 'Machine Learning' },
  { value: 'Robotics', label: 'Robotics' },
  { value: 'Cryptocurrency', label: 'Cryptocurrency' },
  { value: 'Blockchain', label: 'Blockchain' },
  { value: 'Virtual Reality', label: 'Virtual Reality' },
  { value: 'Augmented Reality', label: 'Augmented Reality' },
  { value: 'Game Development', label: 'Game Development' },
  { value: 'Mobile App Development', label: 'Mobile App Development' },
  { value: 'Web Development', label: 'Web Development' },
  { value: 'Cybersecurity', label: 'Cybersecurity' },
  { value: 'Network Solutions', label: 'Network Solutions' },
  { value: 'E-learning', label: 'E-learning' },
  { value: 'Online Marketplace', label: 'Online Marketplace' },
  { value: 'Subscription Services', label: 'Subscription Services' },
];

export default function JwtContactView() {
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

  const renderLogo = (
    <Stack sx={{ mb: 2 }}>
      <Image src="/logo/main_logo.png" />
    </Stack>
  );

  const renderHead = (
    <Stack justifyContent={'center'} alignItems={'center'} spacing={1} sx={{ mb: 2 }}>
      <Typography variant="h4">Contact Us</Typography>
    </Stack>
  );

  const renderForm = (
    <Stack spacing={2.5}>
      {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}

      <RHFTextField name="name" label="Name" placeholder="Enter your name" />
      <RHFTextField name="email" type={'email'} label="Email" placeholder="Enter your email" />
      <RHFTextField name="phone" type={'number'} label="Phone" placeholder="Enter your phone numbber" />
      <RHFSelect
        native
        name="category"
        label='Reason'
        InputLabelProps={{ shrink: true }}
      >
        {categoryOptions.map((classify, index) => (
          <option key={index} value={classify.value}>
            {classify.label}
          </option>
        ))}
      </RHFSelect>
      <RHFTextField name="message" multiline rows={4} label="Message" placeholder="Enter your message" />

      <LoadingButton
        fullWidth
        color="primary"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        sx={{ borderRadius: 20 }}
      >
        Send Message
      </LoadingButton>
    </Stack>
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      {renderLogo}
      {renderHead}

      {/* <Alert severity="info" sx={{ mb: 3 }}>
        Use email : <strong>demo@minimals.cc</strong> / password :<strong> demo1234</strong>
      </Alert> */}

      {renderForm}
    </FormProvider>
  );
}
