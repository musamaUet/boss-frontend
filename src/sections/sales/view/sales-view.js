import React from 'react'
import { Button, Card, Container, Stack, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'

// components
import { useSettingsContext } from 'src/components/settings';
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';

const SalesView = () => {
  const settings = useSettingsContext();
  const router = useRouter()
  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Card sx={{ py: 3, border: '1px solid #FF9500' }}>
        <Stack width={1} alignItems={'center'}>
          <Typography variant='h3' color={'#FF9500'}>Sales</Typography>
        </Stack>
      </Card>
      <Card sx={{ p: 3, border: '1px solid #FF9500', mt: '17px' }}>
        <Grid container spacing={2}>
          <Grid md={6}>
            <Typography>Residential</Typography>
            <Card sx={{ p: 3, border: '1px solid #BEBEBE', backgroundColor: '#F9F9F9', minHeight: '150px' }}>
              <Stack direction={'row'} alignItems={'center'} spacing={2} mt={1} flexWrap={'wrap'}>
                <Button onClick={() => router.push(paths.dashboard.sales.residential, 'estimate-draft')} variant='outlined'>
                  Estimates
                </Button>
                <Button variant='outlined' onClick={() => router.push(paths.dashboard.sales.residential, 'work-order')}>
                  Work Orders
                </Button>
                <Button variant='outlined' onClick={() => router.push(paths.dashboard.sales.residential, 'change-order')}>
                  Change orders
                </Button>
                <Button variant='outlined' onClick={() => router.push(paths.dashboard.sales.residential, 'invoices')}>
                  Invoices
                </Button>
                <Button variant='outlined' onClick={() => router.push(paths.dashboard.sales.residential, 'to-project')}>
                  Estimates sent to projets
                </Button>
              </Stack>
            </Card>
          </Grid>

          <Grid md={6}>
            <Typography>Commercial</Typography>
            <Card sx={{ p: 3, border: '1px solid #BEBEBE', backgroundColor: '#F9F9F9', minHeight: '150px' }}>
              <Stack direction={'row'} alignItems={'center'} spacing={2} mt={1} flexWrap={'wrap'}>
                <Button onClick={() => router.push(paths.dashboard.sales.commercial, 'estimate-draft')} variant='outlined'>
                  Estimates
                </Button>
                <Button variant='outlined' onClick={() => router.push(paths.dashboard.sales.commercial, 'work-order')}>
                  Work Orders
                </Button>
                <Button variant='outlined' onClick={() => router.push(paths.dashboard.sales.commercial, 'change-order')}>
                  Change orders
                </Button>
                <Button variant='outlined' onClick={() => router.push(paths.dashboard.sales.commercial, 'invoices')}>
                  Invoices
                </Button>
                <Button variant='outlined' onClick={() => router.push(paths.dashboard.sales.commercial, 'to-project')}>
                  Estimates sent to projets
                </Button>
              </Stack>
            </Card>
          </Grid>
          <Grid md={6}>
            <Typography>Services</Typography>
            <Card sx={{ p: 3, border: '1px solid #BEBEBE', backgroundColor: '#F9F9F9', minHeight: '150px' }}>
              <Stack direction={'row'} alignItems={'center'} spacing={2} mt={1} flexWrap={'wrap'}>
                <Button onClick={() => router.push(paths.dashboard.sales.services, 'estimate-draft')} variant='outlined'>
                  Estimates
                </Button>
                <Button variant='outlined' onClick={() => router.push(paths.dashboard.sales.services, 'work-order')}>
                  Work Orders
                </Button>
                <Button variant='outlined' onClick={() => router.push(paths.dashboard.sales.services, 'change-order')}>
                  Change orders
                </Button>
                <Button variant='outlined' onClick={() => router.push(paths.dashboard.sales.services, 'invoices')}>
                  Invoices
                </Button>
              </Stack>
            </Card>
          </Grid>
          <Grid md={6}>
            <Typography>Schedule</Typography>
            <Card sx={{ p: 3, border: '1px solid #BEBEBE', backgroundColor: '#F9F9F9', minHeight: '150px' }}>
              <Stack direction={'row'} alignItems={'center'} spacing={2} mt={1} flexWrap={'wrap'}>
                <Button onClick={() => router.push(paths.dashboard.sales.schedule, 'appointments')} variant='outlined'>
                  Appointments
                </Button>
                <Button variant='outlined' onClick={() => router.push(paths.dashboard.sales.schedule, 'calender')}>
                  Calendar
                </Button>
                <Button variant='outlined' onClick={() => router.push(paths.dashboard.sales.schedule, 'todo')}>
                  To- Do
                </Button>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Card>
    </Container>
  )
}

export default SalesView
