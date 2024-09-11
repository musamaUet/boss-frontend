import * as Yup from 'yup';
import dayjs from 'dayjs';
import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import LoadingButton from '@mui/lab/LoadingButton';
import Grid from '@mui/material/Unstable_Grid2'

import { paths } from 'src/routes/paths';
import { useParams, useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import { _addressBooks } from 'src/_mock';

import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { useSnackbar } from 'src/components/snackbar';

import InvoiceNewEditStatusDate from './invoice-new-edit-status-date';
import InvoiceNewEditDetails from './invoice-new-edit-details';
import InvoiceNewEditAddress from './invoice-new-edit-address';
import Image from 'src/components/image';
import { Box, Button, Switch, TextField, Typography } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from '@mui/x-date-pickers';
import axios, { API_ENDPOINTS } from 'src/utils/axios';


// ----------------------------------------------------------------------

export default function InvoiceNewEditForm({ updatedData, paymentId, }) {

  const { enqueueSnackbar } = useSnackbar();

  const { type, id } = useParams();

  const router = useRouter();

  const loadingSave = useBoolean();

  const loadingSend = useBoolean();

  const [estimateType, setEstimateType] = useState([])

  const NewInvoiceSchema = Yup.object().shape({
    customer: Yup.string().required('Customer to is required'),
    company: Yup.string().required('Company is required'),
    date: Yup.date().required('Date is required'),
    docNumber: Yup.string().required('Doc number is required'),
    poNumber: Yup.string().required('PO number is required'),
    types: Yup.array(),
    items: Yup.lazy(() =>
      Yup.array().of(
        Yup.object({
          title: Yup.string().required('Title is required'),
          description: Yup.string(),
          rate: Yup.number(),
          tax: Yup.number(),
          markUp: Yup.number(),
          quantity: Yup.number()
            .required('Quantity is required')
            .min(1, 'Quantity must be more than 0'),
        })
      )
    ),
    // not required
    // markUp: Yup.number(),
    // subTotal: Yup.string(),
    // discount: Yup.number(),
    // depositRequest: Yup.number(),
    // paymentSchedule: Yup.number(),
    // totalAmount: Yup.number(),
    // additionalNotes: Yup.string(),
  });

  const defaultValues = useMemo(
    () => ({
      customer: updatedData?.customer || '',
      company: updatedData?.company || '',
      date: updatedData?.date ? dayjs(updatedData.date) : dayjs(new Date()),
      types: updatedData?.types || [],
      docNumber: updatedData?.docNumber || '',
      poNumber: updatedData?.poNumber || '',
      markup: updatedData?.markup || 0,
      discount: updatedData?.discount || 0,
      subTotal: updatedData?.subTotal || 0,
      despositRequest: updatedData?.despositRequest || null,
      paymentSchedule: updatedData?.paymentSchedule || null,
      additionalNotes: updatedData?.additionalNotes || '',
      items: updatedData?.details || [
        {
          title: '',
          description: '',
          rate: 1,
          quantity: 1,
          tax: 0,
          markUp: 0,
          total: 0,
        },
      ],
      totalAmount: updatedData?.totalAmount || 0,
    }),
    [updatedData]
  );

  const methods = useForm({
    resolver: yupResolver(NewInvoiceSchema),
    defaultValues,
  });

  const {
    reset,
    setValue,
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const { date } = watch()

  const handleSaveAsDraft = handleSubmit(async (data) => {
    loadingSave.onTrue();

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      loadingSave.onFalse();
      router.push(paths.dashboard.invoice.root);
      console.info('DATA', JSON.stringify(data, null, 2));
    } catch (error) {
      console.error(error);
      loadingSave.onFalse();
    }
  });

  const handleCreateAndSend = handleSubmit(async (data) => {
    if (estimateType?.length === 0) {
      enqueueSnackbar('Please select Estimate Type', { variant: 'error' });
      return;
    }

    // if (!paymentId) {
    //   enqueueSnackbar('Please select Payment', { variant: 'error' });
    //   return;
    // }

    loadingSend.onTrue();
    let obj = {
      // "payment": paymentId || null,
      "company": data?.company,
      "customer": data?.customer,
      "docNumber": data?.docNumber,
      "date": data?.date,
      "poNumber": data?.poNumber,
      'types': [type],
      "tabTypes": estimateType,
      "details": data?.items,
      "subTotal": data?.subTotal || updatedData?.subTotal,
      "markUp": 0,
      "discount": 0,
      "depositRequest": "N/A",
      "paymentSchedule": "N/A",
      "additionalNotes": data?.additionalNotes
    }

    if (paymentId) {
      obj = { ...obj, payment: paymentId }
    }

    if (updatedData) {
      obj = { ...obj, invoiceId: updatedData?._id }
    }

    let res;
    try {
      if (updatedData) {
        res = await axios.put(API_ENDPOINTS.schedule.invoices.put, obj)
      } else {
        res = await axios.post(API_ENDPOINTS.schedule.invoices.post, obj)
      }
      enqueueSnackbar(res?.data?.message, { variant: 'success' })
      router.push(paths.dashboard.sales.home)
      reset()
      setEstimateType([])
      loadingSend.onFalse();
    } catch (error) {
      console.log(error);
      loadingSend.onFalse();
    }
  });


  const handleToggle = (name) => (event) => {
    if (event.target.checked) {
      setEstimateType((prevTypes) => [...prevTypes, name]);
    } else {
      setEstimateType((prevTypes) => prevTypes.filter((type) => type !== name));
    }
  };

  const isSwitchChecked = (name) => estimateType.includes(name);

  useEffect(() => {
    if (updatedData) {
      reset(defaultValues)
      setEstimateType(updatedData?.tabTypes)
    }
  }, [updatedData])

  console.log(type)
  return (
    <FormProvider methods={methods} onSubmit={handleCreateAndSend}>
      <Grid container sx={{ mt: '37px' }} spacing={5}>
        <Grid md={4} sm={12} xs={12}>
          <Stack>
            <Image src='/assets/images/alligator.png' sx={{ height: '275px', width: '280px' }} />
            <Box mt={5} ml={3}>
              <RHFTextField name={'company'} multiline rows={4} label='Company' />
            </Box>

          </Stack>
        </Grid>
        <Grid md={4} sm={12} xs={12}>
          <Stack direction={'row'} alignItems={'flex-start'} justifyContent={'flex-end'} gap={3} sx={{ minWidth: '206px', width: 1 }}>
            <Stack>
              <Button onClick={() => router.push(paths.dashboard.payment, { type, id })} sx={{ minWidth: '120px' }} variant='contained' color='primary'>Payments</Button>
              {paymentId && <Typography fontSize={14}>Selected Payemnt: {paymentId}</Typography>}
            </Stack>
            <Box sx={{ border: '2px solid #67C118', borderRadius: 2, py: '9px', pl: '10px', minWidth: '180px' }}>
              <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <Typography variant='text1' color={'#67C118'}>Estimate draft</Typography>
                <Switch onChange={handleToggle('estimate-draft')} checked={isSwitchChecked('estimate-draft')} />
              </Stack>

              <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <Typography variant='text1' color={'#67C118'}>Work order</Typography>
                <Switch onChange={handleToggle('work-order')} checked={isSwitchChecked('work-order')} />
              </Stack>

              <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <Typography variant='text1' color={'#67C118'}>Change Order</Typography>
                <Switch onChange={handleToggle('change-order')} checked={isSwitchChecked('change-order')} />
              </Stack>

              <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <Typography variant='text1' color={'#67C118'}>To Projects</Typography>
                <Switch onChange={handleToggle('to-project')} checked={isSwitchChecked('to-project')} />
              </Stack>

              <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <Typography variant='text1' color={'#67C118'}>Residential</Typography>
                <Switch onChange={handleToggle('residential')} checked={isSwitchChecked('residential')} />
              </Stack>

              <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <Typography variant='text1' color={'#67C118'}>Commercial</Typography>
                <Switch onChange={handleToggle('commercial')} checked={isSwitchChecked('commercial')} />
              </Stack>

              <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <Typography variant='text1' color={'#67C118'}>Services</Typography>
                <Switch onChange={handleToggle('services')} checked={isSwitchChecked('services')} />
              </Stack>
            </Box>
          </Stack>
        </Grid>
        <Grid md={4} sm={12} xs={12}>
          <Stack direction={'row'} alignItems={'center'} gap={2.5}>
            <Button fullWidth variant='contained'>Cancel</Button>
            <Button disabled={loadingSend?.value} fullWidth variant='contained' type='submit' color='primary'>{loadingSend?.value ? 'Saving...' : 'Save'}</Button>
          </Stack>
          <Box sx={{ mt: 2 }}>
            <RHFTextField name={'customer'} multiline rows={4} label='Customer' />

          </Box>
          <Box mt={4.5}>
            <RHFTextField name="docNumber" label="Doc number" fullWidth />
            <DemoContainer components={['DatePicker']} sx={{ mt: 1 }}>
              <DatePicker
                label="Date"
                value={date}
                sx={{ width: 1 }}
                onChange={(value) => setValue('date', value)}
              />
            </DemoContainer>

            <RHFTextField name="poNumber" label="PO number" sx={{ mt: 2 }} fullWidth />
          </Box>
        </Grid>
      </Grid>

      <Card sx={{ mt: 5 }}>
        <InvoiceNewEditDetails data={updatedData} />
      </Card>
    </FormProvider>
  );
}

InvoiceNewEditForm.propTypes = {
  currentInvoice: PropTypes.object,
};
