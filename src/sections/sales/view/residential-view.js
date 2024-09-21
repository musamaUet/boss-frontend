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
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { useLocation } from 'react-router';
import axios, { API_ENDPOINTS } from 'src/utils/axios';
import { TABS } from 'src/utils/storage-available';

// ----------------------------------------------------------------------

const ResidentialView = () => {
  const theme = useTheme();

  const appointmentDialog = useBoolean();
  const todoDialog = useBoolean();
  const tableLoading = useBoolean();
  const calenderDialog = useBoolean();
  const settings = useSettingsContext();
  const router = useRouter()

  const [currentTab, setCurrentTab] = useState('draft');
  const [tableData, setTableData] = useState([])

  const { state } = useLocation()

  useEffect(() => {
    if (state) {
      setCurrentTab(state)
    }
  }, [state])

  const handleChangeTab = useCallback((event, newValue) => {
    setTableData([])
    setCurrentTab(newValue);
  }, []);

  const getData = async (tab) => {
    tableLoading.onTrue()
    try {
      const response = await axios.get(API_ENDPOINTS.schedule.invoices.get + `?type=residential&tabType=${tab}`);
      console.log('API response:', response.data); // Log the full response
      setTableData(response?.data?.data?.data || []);
      tableLoading.onFalse()
    } catch (error) {
      console.log('Error fetching data:', error);
      setTableData([]);
      tableLoading.onFalse()
    }
  }


  useEffect(() => {
    getData(currentTab)
  }, [currentTab])
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

          <Stack
            width={1}
            direction={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}
            px={2.5}
          >
            <Typography variant="h4">
              {
                currentTab === 'estimate' ? 'Estimates' :
                  currentTab === 'draft' ? 'Drafts' :
                    currentTab === 'work-order' ? 'Work Orders' :
                      currentTab === 'change-order' ? 'Change Order' :
                        currentTab === 'invoices' ? 'Invoices' : // Fix here
                          'Estimates sent to projects'
              }
            </Typography>
            <Button onClick={() => router.push(paths.dashboard.invoice.root('residential'))} variant="contained" color="primary">
              Create an Estimate
            </Button>
          </Stack>
          <EstimatesTable
            currentTab={
              currentTab === 'estimate' ? 'Estimates' :
                currentTab === 'draft' ? 'Drafts' :
                  currentTab === 'work-order' ? 'Work Orders' :
                    currentTab === 'change-order' ? 'Change Order' :
                      currentTab === 'invoices' ? 'Invoices' : // Fix here
                        'Estimates sent to projects'
            }
            type='residential'
            data={tableData}
            getData={getData}
            page='residential'
            currentTabValue={currentTab}
            loading={tableLoading}
          />

        </Stack>
      </Card>

      <AppointmentDialog dialog={appointmentDialog} />
      <TodoDialog dialog={todoDialog} />
      <CalenderDialog dialog={calenderDialog} />
    </Container>
  );
};

export default ResidentialView;
