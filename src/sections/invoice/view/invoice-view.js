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
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------

export default function InvoiceView() {
  const settings = useSettingsContext();
  const router = useRouter()

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h4"> Estimate# 082023-812 </Typography>
      <Grid container sx={{ mt: '37px' }} spacing={5}>
        <Grid md={4} sm={12} xs={12}>
          <Stack>
            <Image src='/assets/images/alligator.png' sx={{ height: '275px', width: '280px' }} />
            <Box mt={5} ml={3}>
              <Typography variant='h6' color={'#808080'}>14907 Coldwater Ln</Typography>
              <Typography variant='h6' color={'#808080'}>Tampa, FL</Typography>
              <Typography variant='h6' color={'#808080'}>33624</Typography>
              <Typography variant='h6' color={'#808080'}>United States</Typography>
              <Typography variant='h6' color={'#808080'}>mralligatorrenovations@gmail.com</Typography>
              <Typography color={'#8F8F8F'}>https://mralligatorrenovations.com</Typography>
            </Box>

          </Stack>
        </Grid>
        <Grid md={4} sm={12} xs={12}>
          <Stack direction={'row'} alignItems={'flex-start'} justifyContent={'flex-end'} gap={3} sx={{ minWidth: '206px', width: 1 }}>
            <Button onClick={() => router.push(paths.dashboard.payment)} sx={{ minWidth: '120px' }} variant='contained' color='primary'>Payments</Button>
            <Box sx={{ border: '2px solid #67C118', borderRadius: 2, py: '9px', pl: '10px' }}>
              <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <Typography variant='text1' color={'#67C118'}>Estimate draft</Typography>
                <Switch />
              </Stack>

              <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <Typography variant='text1' color={'#67C118'}>Work order</Typography>
                <Switch />
              </Stack>
              <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <Typography variant='text1' color={'#67C118'}>Change Order</Typography>
                <Switch />
              </Stack>
              <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <Typography variant='text1' color={'#67C118'}>To Projects</Typography>
                <Switch />
              </Stack>
            </Box>
          </Stack>
        </Grid>
        <Grid md={4} sm={12} xs={12}>
          <Stack direction={'row'} alignItems={'center'} gap={2.5}>
            <Button fullWidth variant='contained'>Cancel</Button>
            <Button fullWidth variant='contained' color='primary'>Save</Button>
          </Stack>
          <Box sx={{ border: '1px solid #67C118', borderRadius: 2, py: '9px', px: '10px', mt: 2 }}>
            <Typography>MVH Construction LLC</Typography>
            <Typography>howardm@mvhconstruction.com</Typography>
            <Typography>8133240628</Typography>
            <Typography>412 E Madison ST., Suite 1200</Typography>
            <Typography>Tampa, FL 33602</Typography>
          </Box>
          <Box mt={4.5}>
            <TextField label='Doc number' value={'082023-812'} fullWidth />
            <DemoContainer components={['DatePicker']} sx={{mt: 1}}>
              <DatePicker label="Date" sx={{width: 1}} />
            </DemoContainer>
            <TextField label='PO number' sx={{mt: 2}} fullWidth />
          </Box>
        </Grid>
      </Grid>

      <Grid container mt={5}>
        <Grid md={12}>
          <InvoiceNewEditForm />
        </Grid>
      </Grid>
    </Container>
  );
}
