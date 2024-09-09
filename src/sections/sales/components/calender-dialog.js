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
import { Divider, Typography } from '@mui/material';
import Iconify from 'src/components/iconify';
import { RHFCheckbox, RHFTextField } from 'src/components/hook-form';
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

const CalenderDialog = ({ dialog, getData, selectedRow, setSelectedRow }) => {
  const { enqueueSnackbar } = useSnackbar();

  const integrationSchema = Yup.object().shape({
    eventName: Yup.string().required(),
    date: Yup.string().required(),
    time: Yup.string().required(),
    location: Yup.string().required(),
    description: Yup.string(),
    setReminder: Yup.boolean(),
  });

  const defaultValues = {
    eventName: selectedRow?.eventName || '',
    time: selectedRow?.time || '',
    date: formatDate(selectedRow?.date) || '',
    description: selectedRow?.description || '',
    location: selectedRow?.location || '',
    setReminder: selectedRow?.setReminder || false,
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
      payload = { ...payload, calendarId: selectedRow?._id };
    }

    let response;

    try {
      if (selectedRow) {
        response = await axios.put(API_ENDPOINTS.schedule.calendars.put, payload);
      } else {
        response = await axios.post(API_ENDPOINTS.schedule.calendars.post, payload);
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
          onClick={() => {
            setSelectedRow(null)
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
        <Stack alignItems={'center'} width={1}>
          <Typography variant="h4">Create Calender Event</Typography>
        </Stack>
        <FormProvider methods={methods} onSubmit={handleSubmit(onRegenerate)}>
          <Grid container columnSpacing={3} rowSpacing={1}>
            <Grid md={12}>
              <Box sx={{ width: '100%' }}>
                <Typography className="text-night-rider-5">Event Name</Typography>
                <RHFTextField size="small" name="eventName" sx={{ mt: 1 }} fullWidth placeholder='Enter event title' />
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
                <Typography className="text-night-rider-5">Time</Typography>
                <RHFTextField size="small" name="time" type={'time'} sx={{ mt: 1 }} fullWidth />
              </Box>
            </Grid>

            <Grid md={12}>
              <Box sx={{ width: '100%' }}>
                <Typography className="text-night-rider-5">Location</Typography>
                <RHFTextField size="small" name="location" sx={{ mt: 1 }} fullWidth placeholder="Enter location" />
              </Box>
            </Grid>

            <Grid md={12}>
              <Box sx={{ width: '100%' }}>
                <Typography className="text-night-rider-5">Description</Typography>
                <RHFTextField multiline rows={4} size="small" name="description" sx={{ mt: 1 }} fullWidth />
              </Box>
            </Grid>

            <Grid md={12}>
              <Box sx={{ width: '100%' }}>
                <Stack direction={'row'} alignItems={'center'}>
                  <RHFCheckbox name="setReminder" label="Set Reminder" />
                </Stack>
              </Box>
            </Grid>
          </Grid>
          <Stack alignItems={'center'} width={1}>
            <LoadingButton loading={isSubmitting} sx={{ mt: 2 }} type='submit' variant='contained' color='primary'>
              {selectedRow ? 'Update' : 'Create'} Event
            </LoadingButton>
          </Stack>
        </FormProvider>
      </Box>
    </Dialog>
  );
};

export default CalenderDialog;
