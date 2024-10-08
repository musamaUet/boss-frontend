import React, { useEffect, useState } from 'react';
import { m } from 'framer-motion';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import axios, { API_ENDPOINTS } from 'src/utils/axios';
import LoadingButton from '@mui/lab/LoadingButton';
import Stack from '@mui/material/Stack';

import { useSnackbar } from 'src/components/snackbar';
import Box from '@mui/material/Box';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Grid from '@mui/material/Unstable_Grid2';

//route
import { Divider, IconButton, InputAdornment, MenuItem, Typography } from '@mui/material';
import Iconify from 'src/components/iconify';
import { RHFCheckbox, RHFRadioGroup, RHFSelect, RHFTextField } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/form-provider';
import { formatDate } from 'src/utils/format-number';
import { useBoolean } from 'src/hooks/use-boolean';

const p_cat_options = [
  { value: 'Deposit', label: 'Deposit' },
  { value: 'Final', label: 'Final' },
  { value: 'Progressive', label: 'Progressive' },
  { value: 'Retention', label: 'Retention' },
];

const p_type_options = [
  { value: 'Cash', label: 'Cash' },
  { value: 'App', label: 'App' },
  { value: 'Cheque', label: 'Cheque' },
  { value: 'Card', label: 'Card' },
];

const c_type_options = [
  { value: 'Visa', label: 'Visa Card' },
  { value: 'Master', label: 'Master Card' },
  { value: 'American', label: 'American Express' },
  { value: 'Discover', label: 'Discover' },
];

const UsersDialog = ({ dialog, getData, selectedRow, setSelectedRow, id }) => {
  const { enqueueSnackbar } = useSnackbar();

  const password = useBoolean();

  const integrationSchema = Yup.object().shape({
    paymentCategory: Yup.string().required(),
    paymentType: Yup.string().required(),
    cardType: Yup.string().when('paymentType', {
      is: 'Card',
      then: (schema) => schema.required('Card Type is required'),
      otherwise: (schema) => schema.notRequired(),
    }),
    bankName: Yup.string().when('paymentType', {
      is: (value) => value !== 'Cash', // Condition to check
      then: (schema) => schema.required('Bank/App Name is required'),
      otherwise: (schema) => schema.notRequired(),
    }),
    chequeNumber: Yup.string().when('paymentType', {
      is: 'Cheque',
      then: (schema) => schema.required('Cheque number is required'),
      otherwise: (schema) => schema.notRequired(),
    }),
    amountReceived: Yup.number()
      .required('Amount received is required')
      .typeError('Amount received must be a number')
      .min(0, 'Amount received must be at least 0'),
    currency: Yup.string().required(),
    date: Yup.string().required(),
    finalAmountDue: Yup.number()
      .required('Final amount due is required')
      .typeError('Final amount due must be a number')
      .min(0, 'Final amount due must be at least 0'),
  });

  const defaultValues = {
    paymentCategory: selectedRow?.paymentCategory || '',
    paymentType: selectedRow?.paymentType || '',
    cardType: selectedRow?.cardType || '',
    bankName: selectedRow?.bankName || '',
    chequeNumber: selectedRow?.chequeNumber || '',
    amountReceived: selectedRow?.amountReceived || 0,
    currency: selectedRow?.currency || '',
    date: formatDate(selectedRow?.date) || '',
    finalAmountDue: selectedRow?.finalAmountDue || 0,
  };

  const methods = useForm({
    resolver: yupResolver(integrationSchema),
    defaultValues,
  });

  const { handleSubmit, formState, reset, register, watch } = methods;
  const { isSubmitting, errors } = formState;

  const { paymentType } = watch();

  const onRegenerate = async (data) => {
    let payload = data;
    // if (id) {
    //   payload = { ...payload, invoice: id }
    // }
    // if (selectedRow) {
    //   payload = { ...payload, paymentId: selectedRow?._id };
    // }

    // let response;

    // try {
    //   if (selectedRow) {
    //     response = await axios.put(API_ENDPOINTS.schedule.payment.put, payload);
    //   } else {
    //     response = await axios.post(API_ENDPOINTS.schedule.payment.post, payload);
    //   }
    //   getData(id);
    //   enqueueSnackbar(`${selectedRow ? 'Updated' : 'Created'} Successfully!`, { variant: 'success' });
    //   setSelectedRow(null);
    //   dialog.onFalse();
    //   reset();
    // } catch (error) {
    //   console.log(error);
    //   enqueueSnackbar(error.message, { variant: 'error' });

    // }
  };

  useEffect(() => {
    reset(defaultValues);
  }, [selectedRow]);

  return (
    <Dialog
      sx={{
        '& .MuiDialog-paper': {
          // borderRadius: 0,
        },
      }}
      fullWidth
      maxWidth={'sm'}
      open={dialog.value}
    >
      <Stack direction={'row'} justifyContent={'flex-end'}>
        <Box
          onClick={() => {
            setSelectedRow(null);
            dialog.onFalse();
          }}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: '45px',
            height: '45px',
            cursor: 'pointer',
          }}
        >
          <Iconify icon="ic:round-close" />
        </Box>
      </Stack>
      <Stack alignItems={'center'} width={1}>
        <Typography variant="h4">Add User</Typography>
      </Stack>
      <Box sx={{ px: '36px', py: 5 }}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onRegenerate)}>
          <Stack spacing={2.5}>
            <RHFTextField
              size="small"
              name="first_name"
              type="text"
              label="First Name:"
              placeholder="Enter first name"
            />
            <RHFTextField
              size="small"
              name="last_name"
              type="text"
              label="Last Name:"
              placeholder="Enter last name"
            />
            <RHFTextField
              size="small"
              name="email"
              type="email"
              label="Email:"
              placeholder="Enter Email"
            />
            <RHFTextField
              size="small"
              name="user_name"
              type="text"
              label="User Name:"
              placeholder="Enter user name"
            />

            <RHFTextField
              name="password"
              label="Password"
              size="small"
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

            <RHFTextField
              name="confirm_password"
              label="Confirm Password"
              size="small"
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

            <Box sx={{ width: '100%' }}>
              <Typography className="text-night-rider-5">Role</Typography>
              <RHFSelect
                fullWidth
                size="small"
                name="role"
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

            <Stack direction={'row'} alignItems={'center'}>
              <RHFCheckbox name={'agree_terms'} />
              <Typography>I agree to the Terms and Conditions</Typography>
            </Stack>
            <Stack
              width={1}
              direction={'row'}
              alignItems={'center'}
              justifyContent={'flex-end'}
              gap={3}
            >
              <LoadingButton
                color="primary"
                size="large"
                type="submit"
                variant="contained"
                sx={{ width: '100px' }}
                loading={isSubmitting}
              >
                Save
              </LoadingButton>
              <LoadingButton
                color="primary"
                size="large"
                sx={{ width: '100px' }}
                variant="outlined"
              >
                Cancel
              </LoadingButton>
            </Stack>
          </Stack>
        </FormProvider>
      </Box>
    </Dialog>
  );
};

export default UsersDialog;
