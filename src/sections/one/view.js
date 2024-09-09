import PropTypes from 'prop-types';
import { m } from 'framer-motion';
// @mui
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

// components
import { useSettingsContext } from 'src/components/settings';
import { ButtonBase, Card, CardContent, CardHeader, IconButton, Stack } from '@mui/material';
import { SvgCloseIcon } from '../common/components/list-svg-icons';
import { varHover } from 'src/components/animate';
import ProjectMilestoneCard from './components/project-milestone-card';
import ChartColumnSingle from './components/chart-single-column';
import Iconify from 'src/components/iconify';
import ProjectsCompleteCard from './components/projects-completed-card';
import ProjectsOverview from './components/projects-overview';
import CustomersCard from './components/customers-card';
import MessagesCard from './components/messages-card';
import PopularProduct from './components/popular-product';
import OrderCard from './components/order-card';


// ----------------------------------------------------------------------

export default function OneView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Box sx={{ bgcolor: '#F0F0F0', p: 3, borderRadius: '20px' }}>
        <Stack width={1} direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
          <Stack>
            <Typography variant='h5'>Project - 3600</Typography>
            <Typography variant='h7'>scheduled on 7 March at 5:00 PM</Typography>
          </Stack>
          <IconButton
            component={m.button}
            whileTap="tap"
            whileHover="hover"
            variants={varHover(1.05)}
          >
            {SvgCloseIcon}
          </IconButton>
        </Stack>
      </Box>
      <Grid container mt={3.5} columnSpacing={3.5}>
        <Grid md={8}>
          <ProjectMilestoneCard />
          <ProjectsCompleteCard />
          <ProjectsOverview />
          <CustomersCard />
        </Grid>
        <Grid md={4}>
          <MessagesCard />
          <PopularProduct />
          <OrderCard />
        </Grid>
      </Grid>
    </Container>
  );
}
