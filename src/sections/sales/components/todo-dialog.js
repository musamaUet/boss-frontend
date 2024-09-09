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

const TodoDialog = ({ dialog, getData, selectedRow, setSelectedRow }) => {
  const { enqueueSnackbar } = useSnackbar();

  const integrationSchema = Yup.object().shape({
    title: Yup.string().required(),
    date: Yup.string().required(),
    priority: Yup.string().required(),
    additionalNotes: Yup.string(),
    assigned: Yup.string().required(),
  });

  const defaultValues = {
    title: selectedRow?.title || '',
    date: formatDate(selectedRow?.date) || '',
    additionalNotes: selectedRow?.additionalNotes || '',
    priority: selectedRow?.priority || '',
    assigned: selectedRow?.assigned || '',
  };

  const methods = useForm({
    resolver: yupResolver(integrationSchema),
    defaultValues,
  });

  const { handleSubmit, formState, reset, register, setValue, watch } = methods;
  const { isSubmitting, errors } = formState;

  const onRegenerate = async (data) => {
    let payload = data

    if (selectedRow) {
      payload = { ...payload, todoId: selectedRow?._id };
    }

    let response;

    try {
      if (selectedRow) {
        response = await axios.put(API_ENDPOINTS.schedule.todo.put, payload);
      } else {
        response = await axios.post(API_ENDPOINTS.schedule.todo.post, payload);
      }
      getData();
      enqueueSnackbar(`${selectedRow ? 'Updated' : 'Created'} Successfully!`, { variant: 'success' });
      setSelectedRow(null);
      dialog.onFalse();
      reset();
    } catch (error) {
      console.log(error);
      if (error.error) {
        enqueueSnackbar(error.message, { variant: 'error' });
      }
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
      <Box sx={{ px: '36px', py: 5 }}>
        <Stack alignItems={'center'} width={1}>
          <Typography variant="h4">{selectedRow ? 'Update' : 'Create a'} To-do Task</Typography>
        </Stack>
        <FormProvider methods={methods} onSubmit={handleSubmit(onRegenerate)}>
          <Grid container columnSpacing={3} rowSpacing={1} mt={2}>
            <Grid md={6}>
              <Box sx={{ width: '100%' }}>
                <Typography className="text-night-rider-5">Task Title</Typography>
                <RHFTextField size="small" name="title" sx={{ mt: 1 }} fullWidth placeholder='Enter title' />
              </Box>
            </Grid>

            <Grid md={6}>
              <Box sx={{ width: '100%' }}>
                <Typography className="text-night-rider-5">Priority</Typography>
                <RHFSelect
                  fullWidth
                  size='small'
                  name="priority"
                  InputLabelProps={{ shrink: true }}
                  sx={{ mt: 1, height: '37px' }}
                  PaperPropsSx={{ textTransform: 'capitalize' }}
                >
                  {['High', 'Low'].map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </RHFSelect>
              </Box>
            </Grid>

            <Grid md={6}>
              <Box sx={{ width: '100%' }}>
                <Typography className="text-night-rider-5">Due Date</Typography>
                <RHFTextField size="small" name="date" type={'date'} sx={{ mt: 1 }} fullWidth placeholder='YYYY-MM-DD' />
              </Box>
            </Grid>

            <Grid md={6}>
              <Box sx={{ width: '100%' }}>
                <Typography className="text-night-rider-5">Assigned</Typography>
                <RHFTextField size="small" name="assigned" sx={{ mt: 1 }} fullWidth placeholder="Enter participants' names" />
              </Box>
            </Grid>

            <Grid md={12}>
              <Box sx={{ width: '100%' }}>
                <Typography className="text-night-rider-5">Additional Notes</Typography>
                <RHFTextField multiline rows={4} size="small" name="additionalNotes" sx={{ mt: 1 }} fullWidth placeholder="Enter additional notes" />
              </Box>
            </Grid>
          </Grid>
          <Stack alignItems={'center'} width={1}>
            <LoadingButton loading={isSubmitting} sx={{ mt: 2 }} type='submit' variant='contained' color='primary'>
              {selectedRow ? 'Update' : 'Add'} Task
            </LoadingButton>
          </Stack>
        </FormProvider>
      </Box>
    </Dialog>
  );
};

export default TodoDialog;
