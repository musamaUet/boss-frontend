import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2'

// components
import { useSettingsContext } from 'src/components/settings';
import { Button, Card, Stack } from '@mui/material';
import PaymentsTable from '../components/payments-table/payments-table-main';
import { useBoolean } from 'src/hooks/use-boolean';
import PaymentsDialog from '../components/payments-dialog';
import axios, { API_ENDPOINTS } from 'src/utils/axios';
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { useLocation } from 'react-router';

const PaymentView = () => {
  const settings = useSettingsContext();
  const router = useRouter()
  const paymentsDialog = useBoolean();
  const paymentLoading = useBoolean(true)
  const { state } = useLocation()

  const [paymentTableData, setPaymentTableData] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null)

  const getAllPayments = async () => {
    paymentLoading.onTrue()
    try {
      const res = await axios.get(API_ENDPOINTS.schedule.payment.get)
      const data = res?.data?.data
      setPaymentTableData(data)
      paymentLoading.onFalse()
    } catch (error) {
      console.log(error)
      paymentLoading.onFalse()

    }
  }

  useEffect(() => {
    getAllPayments()
  }, [])

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Card>
        <Stack
          width={1}
          direction={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
          p={2.5}
        >
          <Typography variant="h4"> Payments</Typography>
          <Stack direction={'row'} alignItems={'center'} gap={1}>
            {selectedPayment && (<Button onClick={() => {
              if (state.id) {
                router.push(paths.dashboard.invoice.details(state.id, state?.type), selectedPayment)
              } else {
                router.push(paths.dashboard.invoice.root(state?.type), selectedPayment)
              }
              setSelectedPayment(null)
            }} variant="contained">
              Go to Invoice
            </Button>)}
            <Button onClick={() => {
              setSelectedRow(null)
              paymentsDialog.onTrue()
            }} variant="contained" color="primary">
              Add Payment
            </Button>
          </Stack>
        </Stack>
        <PaymentsTable selectedPayment={selectedPayment} setSelectedPayment={setSelectedPayment} getData={getAllPayments} paymentsDialog={paymentsDialog} setSelectedRow={setSelectedRow} data={paymentTableData?.data} loading={paymentLoading} />
      </Card>

      <PaymentsDialog getData={getAllPayments} selectedRow={selectedRow} setSelectedRow={setSelectedRow} dialog={paymentsDialog} />
    </Container>
  )
}

export default PaymentView
