// @mui
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2'
// components
import { useSettingsContext } from 'src/components/settings';
import { Button, Stack, Switch, TextField } from '@mui/material';
import Image from 'src/components/image';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import InvoiceNewEditForm from '../components/invoice-new-edit-form';
import { useParams, useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
import { useLocation } from 'react-router';
import axios, { API_ENDPOINTS } from 'src/utils/axios';
import { useEffect, useState } from 'react';

// ----------------------------------------------------------------------

export default function InvoiceView() {
  const settings = useSettingsContext();
  const router = useRouter()
  const { state } = useLocation()
  const params = useParams()
  const [updatedData, setUpdatedData] = useState(null)
  const [payment, setPayment] = useState([])

  const getData = async (val) => {
    try {
      const { data } = await axios.get(API_ENDPOINTS.schedule.invoices.singleData + `${val}`)
      setUpdatedData(data?.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (params?.id) {
      getData(params?.id)
    }
  }, [params?.id])

  useEffect(() => {
    if (state) {
      setPayment(prev => {
        const uniquePayments = new Set([...prev, ...state]);
        return Array.from(uniquePayments);
      });
    }
  }, [state]);

  useEffect(() => {
    if (updatedData && !state) {
      setPayment(prev => {
        const uniquePayments = new Set([...prev, ...updatedData?.payment]);
        return Array.from(uniquePayments);
      });
    }
  }, [updatedData]);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h4"> Estimate# 082023-812 </Typography>
      <Grid container>
        <Grid md={12}>
          <InvoiceNewEditForm updatedData={updatedData} paymentId={payment} />
        </Grid>
      </Grid>
    </Container>
  );
}
