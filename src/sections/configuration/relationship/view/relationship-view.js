import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

// components
import { useSettingsContext } from 'src/components/settings';
import { Button, Card, Stack, TextField } from '@mui/material';
import { useBoolean } from 'src/hooks/use-boolean';
import axios, { API_ENDPOINTS } from 'src/utils/axios';
import { paths } from 'src/routes/paths';
import { useParams, useRouter } from 'src/routes/hooks';
import { useLocation } from 'react-router';
import RelationshipTable from '../components/relationship-table/relationship-table-main';
import RelationshipDialog from '../components/relationship-dialog';

const RelationshipView = () => {
  const settings = useSettingsContext();
  const router = useRouter();
  const { id } = useParams();
  const paymentsDialog = useBoolean();
  const paymentLoading = useBoolean(true);
  const { state } = useLocation();

  const [paymentTableData, setPaymentTableData] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState([]);

  const getAllPayments = async (value) => {
    paymentLoading.onTrue();
    try {
      const res = await axios.get(API_ENDPOINTS.schedule.invoices.paymentsByInvoice + value);
      const data = res?.data?.data;
      setPaymentTableData(data);
      paymentLoading.onFalse();
    } catch (error) {
      console.log(error);
      paymentLoading.onFalse();
    }
  };

  useEffect(() => {
    if (id) {
      getAllPayments(id);
    }
  }, [id]);

  useEffect(() => {
    if (state?.paymentId) {
      setSelectedPayment(state.paymentId);
    }
  }, [state]);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Card sx={{ my: 2 }}>
        <Stack
          width={1}
          direction={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
          p={2.5}
        >
          <Typography variant="h4"> Organization Relationships</Typography>
          <Stack direction={'row'} alignItems={'center'} gap={1}>
            <Stack direction={'row'} alignItems={'center'} gap={1}>
              <TextField placeholder="Search Organization" size="small" />
              <Button variant="contained" color="primary">
                Search
              </Button>
            </Stack>
            <Button
              onClick={() => {
                setSelectedRow(null);
                paymentsDialog.onTrue();
              }}
              variant="contained"
              color="primary"
            >
              Add New Relationship
            </Button>
          </Stack>
        </Stack>
        <RelationshipTable
          selectedPayment={selectedPayment}
          setSelectedPayment={setSelectedPayment}
          getData={getAllPayments}
          paymentsDialog={paymentsDialog}
          setSelectedRow={setSelectedRow}
          data={paymentTableData?.data}
          loading={paymentLoading}
        />
      </Card>

      <RelationshipDialog
        getData={getAllPayments}
        id={id}
        selectedRow={selectedRow}
        setSelectedRow={setSelectedRow}
        dialog={paymentsDialog}
      />
    </Container>
  );
};

export default RelationshipView;
