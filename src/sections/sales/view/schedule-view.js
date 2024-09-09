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
import { useLocation } from 'react-router';
import axios, { API_ENDPOINTS } from 'src/utils/axios';

// ----------------------------------------------------------------------

const TABS = [
  {
    value: 'appointments',
    icon: <Iconify icon="solar:phone-bold" width={24} />,
    label: 'Appointments',
  },
  {
    value: 'calender',
    icon: <Iconify icon="solar:heart-bold" width={24} />,
    label: 'Calender',
  },
  {
    value: 'todo',
    icon: <Iconify icon="eva:headphones-fill" width={24} />,
    label: 'To-do',
  },
];

// ----------------------------------------------------------------------

const ScheduleView = () => {
  const theme = useTheme();

  const appointmentLoading = useBoolean(true)
  const calenderLoading = useBoolean(true)
  const taskLoading = useBoolean(true)
  const appointmentDialog = useBoolean();
  const todoDialog = useBoolean();
  const calenderDialog = useBoolean();
  const settings = useSettingsContext();

  const [currentTab, setCurrentTab] = useState('appointments');
  const [isFirstLoad, setIsFirstLoad] = useState(true); // Flag to prevent multiple calls

  const [appointmentTableData, setAppointmentTableData] = useState(null);
  const [todoTableData, setTodoTableData] = useState(null);
  const [calenderTableData, setCalenderTableData] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);

  const { state } = useLocation()

  useEffect(() => {
    if (state) {
      setCurrentTab(state)
    }
  }, [state])

  const handleChangeTab = useCallback((event, newValue) => {
    setCurrentTab(newValue);
  }, []);

  const getAllAppointments = async () => {
    appointmentLoading.onTrue()
    try {
      const res = await axios.get(API_ENDPOINTS.schedule.appointment.get)
      console.log(res?.data)
      const data = res?.data?.data
      setAppointmentTableData(data)
      appointmentLoading.onFalse()
    } catch (error) {
      console.log(error)
      appointmentLoading.onFalse()

    }
  }

  const getAllTasks = async () => {
    taskLoading.onTrue()
    try {
      const res = await axios.get(API_ENDPOINTS.schedule.todo.get)
      console.log(res?.data)
      const data = res?.data?.data
      setTodoTableData(data)
      taskLoading.onFalse()
    } catch (error) {
      console.log(error)
      taskLoading.onFalse()

    }
  }

  const getAllCalenderEvents = async () => {
    calenderLoading.onTrue()
    try {
      const res = await axios.get(API_ENDPOINTS.schedule.calendars.get)
      console.log(res?.data)
      const data = res?.data?.data
      setCalenderTableData(data)
      calenderLoading.onFalse()
    } catch (error) {
      console.log(error)
      calenderLoading.onFalse()

    }
  }

  useEffect(() => {
    if (isFirstLoad) {
      getAllAppointments(); // Call the function only on the first load
      setIsFirstLoad(false); // Disable further calls
    }
  }, [isFirstLoad]);

  useEffect(() => {
    if (!isFirstLoad) {
      if (currentTab === 'todo') {
        getAllTasks();
      }
      if (currentTab === 'calender') {
        getAllCalenderEvents();
      }
      if (currentTab === 'appointments') {
        getAllAppointments();
      }
    }
  }, [currentTab, isFirstLoad]);

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
            {TABS.slice(0, 3).map((tab) => (
              <Tab key={tab.value} value={tab.value} label={tab.label} />
            ))}
          </Tabs>

          {currentTab === 'appointments' && (
            <>
              <Stack
                width={1}
                direction={'row'}
                alignItems={'center'}
                justifyContent={'space-between'}
                px={2.5}
              >
                <Typography variant="h4"> Appointments</Typography>
                <Button onClick={appointmentDialog.onTrue} variant="contained" color="primary">
                  Add new Appointment
                </Button>
              </Stack>
              <AppointmentTable getData={getAllAppointments} appointmentDialog={appointmentDialog} setSelectedRow={setSelectedRow} data={appointmentTableData?.data} loading={appointmentLoading} />
            </>
          )}
          {currentTab === 'todo' && (
            <>
              <Stack
                width={1}
                direction={'row'}
                alignItems={'center'}
                justifyContent={'space-between'}
                px={2.5}
              >
                <Typography variant="h4"> To-Do</Typography>
                <Button onClick={todoDialog.onTrue} variant="contained" color="primary">
                  Add to-do task
                </Button>
              </Stack>
              <TodoTable getData={getAllTasks} todoDialog={todoDialog} setSelectedRow={setSelectedRow} data={todoTableData?.data} loading={taskLoading} />
            </>
          )}

          {currentTab === 'calender' && (
            <>
              <Stack
                width={1}
                direction={'row'}
                alignItems={'center'}
                justifyContent={'space-between'}
                px={2.5}
              >
                <Typography variant="h4"> Calender</Typography>
                <Button onClick={calenderDialog.onTrue} variant="contained" color="primary">
                  Add Calender Event
                </Button>
              </Stack>
              <CalenderTable getData={getAllCalenderEvents} calenderDialog={calenderDialog} setSelectedRow={setSelectedRow} data={calenderTableData?.data} loading={calenderLoading} />
            </>
          )}
        </Stack>
      </Card>

      <AppointmentDialog getData={getAllAppointments} selectedRow={selectedRow} setSelectedRow={setSelectedRow} dialog={appointmentDialog} />
      <TodoDialog dialog={todoDialog} getData={getAllTasks} selectedRow={selectedRow} setSelectedRow={setSelectedRow} />
      <CalenderDialog dialog={calenderDialog} getData={getAllCalenderEvents} selectedRow={selectedRow} setSelectedRow={setSelectedRow} />
    </Container>
  );
};

export default ScheduleView;
