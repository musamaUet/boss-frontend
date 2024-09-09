import React, { useCallback, useEffect, useState } from 'react';
import Iconify from 'src/components/iconify';
// @mui
import { useTheme, alpha } from '@mui/material/styles';
import { Box, Button, Container, Stack, Tab, Tabs, Typography, Card } from '@mui/material';

// components
import { useSettingsContext } from 'src/components/settings';
import AppointmentTable from '../components/appointment-table/appointment-table-main';
import AppointmentDialog from '../components/appointment-dialog';
import { useBoolean } from 'src/hooks/use-boolean';
import TodoTable from '../components/todo-table/todo-table.main';
import TodoDialog from '../components/todo-dialog';
import CalenderTable from '../components/calender-table/calender-table-main';
import CalenderDialog from '../components/calender-dialog';
import EstimatesTable from '../components/residential-table/estimates-table-main';
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
import { useLocation } from 'react-router';

// ----------------------------------------------------------------------

const TABS = [
  {
    value: 'estimates',
    icon: <Iconify icon="solar:phone-bold" width={24} />,
    label: 'Estimates',
  },
  {
    value: 'drafts',
    icon: <Iconify icon="solar:heart-bold" width={24} />,
    label: 'Drafts',
  },
  {
    value: 'work_orders',
    icon: <Iconify icon="eva:headphones-fill" width={24} />,
    label: 'Work Orders',
  },
  {
    value: 'change_orders',
    icon: <Iconify icon="eva:headphones-fill" width={24} />,
    label: 'Change Orders',
  },
  {
    value: 'invoices',
    icon: <Iconify icon="eva:headphones-fill" width={24} />,
    label: 'Invoices',
  },
  {
    value: 'sent_to_project',
    icon: <Iconify icon="eva:headphones-fill" width={24} />,
    label: 'Estimates sent to projects',
  },
];

// ----------------------------------------------------------------------

const CommercialView = () => {
  const theme = useTheme();

  const appointmentDialog = useBoolean();
  const todoDialog = useBoolean();
  const calenderDialog = useBoolean();
  const settings = useSettingsContext();
  const router = useRouter()

  const [currentTab, setCurrentTab] = useState('estimates');

  const { state } = useLocation()

  useEffect(() => {
    if (state) {
      setCurrentTab(state)
    }
  }, [state])


  const handleChangeTab = useCallback((event, newValue) => {
    setCurrentTab(newValue);
  }, []);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Card>
        <Stack spacing={2} sx={{ width: 1 }}>
          <Tabs
            value={currentTab}
            onChange={handleChangeTab}
            sx={{
              px: 2.5,
              boxShadow: `inset 0 -2px 0 0 ${alpha(theme.palette.grey[500], 0.08)}`,
            }}
          >
            {TABS.map((tab) => (
              <Tab key={tab.value} value={tab.value} label={tab.label} />
            ))}
          </Tabs>

          {currentTab === 'estimates' && (
            <>
              <Stack
                width={1}
                direction={'row'}
                alignItems={'center'}
                justifyContent={'space-between'}
                px={2.5}
              >
                <Typography variant="h4"> Estimates</Typography>
                <Button onClick={() => router.push(paths.dashboard.invoice.root)} variant="contained" color="primary">
                  Create an Estimate
                </Button>
              </Stack>
              <EstimatesTable type='commercial' />
            </>
          )}

        </Stack>
      </Card>

      <AppointmentDialog dialog={appointmentDialog} />
      <TodoDialog dialog={todoDialog} />
      <CalenderDialog dialog={calenderDialog} />
    </Container>
  );
};

export default CommercialView;
