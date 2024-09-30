// @mui
import Container from '@mui/material/Container';
import { Box, Card, Stack, Typography } from '@mui/material';
import React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
// components
import { useSettingsContext } from 'src/components/settings';

const statsData = [
  { name: 'users', value: 2500 },
  { name: 'Active Relationships', value: 850 },
  { name: 'Cutomers', value: 35000 },
  { name: 'Plan', value: 'Starter close to growth' },
  { name: 'Databbase Records', value: 5000000 },
  { name: 'DB Space', value: '10Gb' },
  { name: 'Traffic/workload units', value: 275000 },
  { name: 'Files', value: 38324 },
  { name: 'Pending Requests', value: 5 },
  { name: 'Notifications', value: 3 },
];

const activityData = [
  'User A added a new role',
  'User B updated permissions for role "Employee"',
  'User C invited a new user.',
  'User D upload 12gb.',
];

const notiData = [
  'You have 2 pending user approvals.',
  'Organization XYZ Corp wants to establish a relationship.',
];

const DashboardView = () => {
  const settings = useSettingsContext();
  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : 'xl'}>
        <Grid container spacing={2}>
          <Grid md={6}>
            <Card sx={{ p: 1.5 }}>
              <Typography textAlign={'start'} variant="h5">
                Quick Stats
              </Typography>
              <Grid container spacing={2} mt={1}>
                {statsData?.map((item, index) => (
                  <Grid md={6} key={index}>
                    <Box sx={{ backgroundColor: '#f0f0f0', px: 1, py: 2 }}>
                      <Typography textAlign={'start'}>
                        {item?.name}: {item?.value}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Card>
          </Grid>
          <Grid md={6}>
            <Card sx={{ p: 1.5, height: 1 }}>
              <Typography textAlign={'start'} variant="h5">
                Recent Activities
              </Typography>
              <Grid container spacing={2} mt={1}>
                {activityData?.map((item, index) => (
                  <Grid md={12} key={index}>
                    <Typography textAlign={'start'}>{item}</Typography>
                  </Grid>
                ))}
              </Grid>
            </Card>
          </Grid>

          <Grid md={12}>
            <Card sx={{ p: 1.5 }}>
              <Typography textAlign={'start'} variant="h5">
                Notifications
              </Typography>
              <Grid container spacing={2} mt={1}>
                {notiData?.map((item, index) => (
                  <Grid md={12} key={index}>
                    <Typography textAlign={'start'}>{item}</Typography>
                  </Grid>
                ))}
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default DashboardView;
