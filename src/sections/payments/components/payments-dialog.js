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
import { Divider, MenuItem, Typography } from '@mui/material';
import Iconify from 'src/components/iconify';
import { RHFCheckbox, RHFRadioGroup, RHFSelect, RHFTextField } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/form-provider';
import { formatDate } from 'src/utils/format-number';

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

const PaymentsDialog = ({ dialog, getData, selectedRow, setSelectedRow }) => {
  const { enqueueSnackbar } = useSnackbar();

  const integrationSchema = Yup.object().shape({
    paymentCategory: Yup.string().required(),
    paymentType: Yup.string().required(),
    cardType: Yup.string().required(),
    bankName: Yup.string().required(),
    chequeNumber: Yup.string().when('paymentType', {
      is: 'Cheque', // Conditional validation
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
  }

  const methods = useForm({
    resolver: yupResolver(integrationSchema),
    defaultValues,
  });

  const { handleSubmit, formState, reset, register, watch } = methods;
  const { isSubmitting, errors } = formState;

  const { paymentType } = watch()

  const onRegenerate = async (data) => {
    let payload = data;

    if (selectedRow) {
      payload = { ...payload, paymentId: selectedRow?._id };
    }

    let response;

    try {
      if (selectedRow) {
        response = await axios.put(API_ENDPOINTS.schedule.payment.put, payload);
      } else {
        response = await axios.post(API_ENDPOINTS.schedule.payment.post, payload);
      }
      getData();
      enqueueSnackbar(`${selectedRow ? 'Updated' : 'Created'} Successfully!`, { variant: 'success' });
      setSelectedRow(null);
      dialog.onFalse();
      reset();
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.message, { variant: 'error' });

    }
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
      maxWidth={'lg'}
      open={dialog.value}
    >
      <Stack direction={'row'} justifyContent={'flex-end'}>
        <Box
          onClick={() => dialog.onFalse()}
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
        <Typography variant="h4">Create Payment</Typography>
      </Stack>
      <Box sx={{ px: '36px', py: 5 }}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onRegenerate)}>
          <Grid container columnSpacing={3} rowSpacing={1} mt={2}>
            <Grid md={6}>
              <Box sx={{ width: '100%' }}>
                <Typography className="text-night-rider-5">Payment Category</Typography>
                <RHFRadioGroup sx={{ mt: 1 }} row spacing={4} name="paymentCategory" options={p_cat_options} />
              </Box>
            </Grid>

            <Grid md={6}>
              <Box sx={{ width: '100%' }}>
                <Typography className="text-night-rider-5">Payment Type</Typography>
                <RHFRadioGroup sx={{ mt: 1 }} row spacing={4} name="paymentType" options={p_type_options} />
              </Box>
            </Grid>

            <Grid md={6}>
              <Box sx={{ width: '100%' }}>
                <Typography className="text-night-rider-5">Card Type</Typography>
                <RHFRadioGroup sx={{ mt: 1 }} row spacing={4} name="cardType" options={c_type_options} />
              </Box>
            </Grid>

            <Grid md={12}>
              <Box sx={{ width: '100%' }}>
                <Typography className="text-night-rider-5">Bank Name</Typography>
                <RHFTextField size="small" name="bankName" sx={{ mt: 1 }} fullWidth placeholder="Enter bank name" />
              </Box>
            </Grid>

            {
              paymentType === 'Cheque' && (
                <Grid md={12}>
                  <Box sx={{ width: '100%' }}>
                    <Typography className="text-night-rider-5">Cheque Number</Typography>
                    <RHFTextField size="small" name="chequeNumber" sx={{ mt: 1 }} fullWidth placeholder="Enter Cheque number" />
                  </Box>
                </Grid>
              )}

            <Grid md={6}>
              <Box sx={{ width: '100%' }}>
                <Typography className="text-night-rider-5">Amount Received</Typography>
                <RHFTextField size="small" name="amountReceived" type={'number'} sx={{ mt: 1 }} fullWidth placeholder="Enter amount" />
              </Box>
            </Grid>

            <Grid md={6}>
              <Box sx={{ width: '100%' }}>
                <Typography className="text-night-rider-5">Currency</Typography>
                <RHFSelect
                  fullWidth
                  size='small'
                  name="currency"
                  InputLabelProps={{ shrink: true }}
                  sx={{ mt: 1, height: '37px' }}
                  PaperPropsSx={{ textTransform: 'capitalize' }}
                >
                  {['USD', 'GBP', 'PKR', 'INR'].map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </RHFSelect>
              </Box>
            </Grid>

            <Grid md={6}>
              <Box sx={{ width: '100%' }}>
                <Typography className="text-night-rider-5">Date</Typography>
                <RHFTextField size="small" name="date" type={'date'} sx={{ mt: 1 }} fullWidth placeholder='YYYY-MM-DD' />
              </Box>
            </Grid>

            <Grid md={6}>
              <Box sx={{ width: '100%' }}>
                <Typography className="text-night-rider-5">Final Amount Due</Typography>
                <RHFTextField size="small" type={'number'} name="finalAmountDue" sx={{ mt: 1 }} fullWidth placeholder="Calculated amount" />
              </Box>
            </Grid>
          </Grid>
          <Stack alignItems={'center'} width={1}>
            <LoadingButton loading={isSubmitting} sx={{ mt: 2 }} type='submit' variant='contained' color='primary'>
              {selectedRow ? 'Update' : 'Save'}
            </LoadingButton>
          </Stack>
        </FormProvider>
      </Box>
    </Dialog>
  );
};

export default PaymentsDialog;
