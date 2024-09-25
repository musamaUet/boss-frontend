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

const options = [
  { value: 'view_users', label: 'View Users' },
  { value: 'view_roles', label: 'View Roles' },
  { value: 'edit_users', label: 'Edit Users' },
  { value: 'edit_roles', label: 'Edit Roles' },
  { value: 'delete_users', label: 'Delete Users' },
  { value: 'delete_roles', label: 'Delete Roles' },
  { value: 'manage_permissions', label: 'Manage Permissions' },
];

const PermissionsDialog = ({ dialog, getData, selectedRow, setSelectedRow, id }) => {
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
        <Typography variant="h4">Add New Permission</Typography>
      </Stack>
      <Box sx={{ px: '36px', py: 5 }}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onRegenerate)}>
          <Stack spacing={2.5}>
            <RHFTextField
              size="small"
              name="permission_name"
              type="text"
              label="Permission Name:"
              placeholder="Enter permission name"
            />

            <RHFTextField
              size="small"
              name="desc"
              type="text"
              multiline
              rows={3}
              label="Description:"
            />

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

export default PermissionsDialog;
