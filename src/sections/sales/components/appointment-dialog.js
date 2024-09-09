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
import { Autocomplete, Chip, Divider, TextField, Typography } from '@mui/material';
import Iconify from 'src/components/iconify';
import { RHFCheckbox, RHFTextField } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/form-provider';
import { formatDate } from 'src/utils/format-number';

const AppointmentDialog = ({ dialog, getData, selectedRow, setSelectedRow }) => {
  const { enqueueSnackbar } = useSnackbar();

  const integrationSchema = Yup.object().shape({
    title: Yup.string().required(),
    date: Yup.string().required(),
    time: Yup.string().required(),
    additionalNotes: Yup.string(),
    sendEmail: Yup.boolean(),
    markAs: Yup.boolean(),
    participants: Yup.array().required(),
  });

  const defaultValues = {
    participants: selectedRow?.participants || [],
    title: selectedRow?.title || '',
    time: selectedRow?.time || '',
    date: formatDate(selectedRow?.date) || '',
    additionalNotes: selectedRow?.additionalNotes || '',
    sendEmail: selectedRow?.sendEmail || false,
    markAs: selectedRow?.markAs || false,

  };

  const methods = useForm({
    resolver: yupResolver(integrationSchema),
    defaultValues,
  });

  const { handleSubmit, formState, reset, register, setValue, watch } = methods;
  const { isSubmitting, errors } = formState;

  const { participants } = watch()

  const onRegenerate = async (data) => {
    let payload = data

    if (selectedRow) {
      payload = { ...payload, scheduleId: selectedRow?._id };
    }

    let response;

    try {
      if (selectedRow) {
        response = await axios.put(API_ENDPOINTS.schedule.appointment.put, payload);
      } else {
        response = await axios.post(API_ENDPOINTS.schedule.appointment.post, payload);
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
          <Typography variant="h4">{selectedRow ? 'Update' : 'Schedule'} Appointment</Typography>
        </Stack>
        <FormProvider methods={methods} onSubmit={handleSubmit(onRegenerate)}>
          <Grid container columnSpacing={3} rowSpacing={1}>
            <Grid md={12}>
              <Box sx={{ width: '100%' }}>
                <Typography className="text-night-rider-5">Appointment Title</Typography>
                <RHFTextField size="small" name="title" sx={{ mt: 1 }} fullWidth placeholder='Enter title' />
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
                <Typography className="text-night-rider-5">Participants</Typography>
                <Autocomplete
                  options={[]}
                  freeSolo
                  multiple
                  size='small'
                  value={participants}
                  disableClearable
                  onChange={(event, newValue) =>
                    setValue('participants', newValue, { shouldDirty: true })
                  }
                  renderTags={(value, props) =>
                    value.map((option, index) => (
                      <Chip
                        size="small"
                        color="info"
                        variant="soft"
                        label={option}
                        {...props({ index })}
                      />
                    ))
                  }
                  renderInput={(params) => <TextField {...params} placeholder={'after typing one name press enter to add new participant'} />}
                />
              </Box>
            </Grid>

            <Grid md={12}>
              <Box sx={{ width: '100%' }}>
                <Typography className="text-night-rider-5">Additional Notes</Typography>
                <RHFTextField multiline rows={4} size="small" name="additionalNotes" sx={{ mt: 1 }} fullWidth placeholder="Enter additional notes" />
              </Box>
            </Grid>

            <Grid md={12}>
              <Box sx={{ width: '100%' }}>
                <Stack direction={'row'} alignItems={'center'}>
                  <RHFCheckbox name="sendEmail" label="Send email" />
                  <RHFCheckbox name="markAs" label="Mark as" />
                </Stack>
              </Box>
            </Grid>
          </Grid>
          <Stack alignItems={'center'} width={1}>
            <LoadingButton loading={isSubmitting} sx={{ mt: 2 }} type='submit' variant='contained' color='primary'>
              {selectedRow ? 'Update' : 'Schedule'} Appointment
            </LoadingButton>
          </Stack>
        </FormProvider>
      </Box>
    </Dialog>
  );
};

export default AppointmentDialog;
