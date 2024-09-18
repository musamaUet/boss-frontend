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
import { Button, Divider, MenuItem, TextField, Typography } from '@mui/material';
import Iconify from 'src/components/iconify';
import { RHFCheckbox, RHFSelect, RHFTextField } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/form-provider';
import { formatDate } from 'src/utils/format-number';

const integrationData = [
  {
    value: 'OpenAi',
    label: 'Open AI',
    icon: 'logos:openai-icon',
    color: '#000000',
  },
];

const AddDiscountDialog = ({ dialog, setValue, values }) => {
  const { enqueueSnackbar } = useSnackbar();

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
            dialog.onFalse()
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
      <Box sx={{ px: '36px', py: 5 }}>
        <Stack alignItems={'center'} spacing={3} width={1}>
          <Typography variant="h4">Add Discount</Typography>
          <TextField type={'number'} value={values?.discount} placeholder={'add discount'} onChange={(e) => setValue('discount', e.target.value)} />
          <Button color='primary' variant='outlined' onClick={() => dialog.onFalse()}>Add</Button>
        </Stack>

      </Box>
    </Dialog>
  );
};

export default AddDiscountDialog;
