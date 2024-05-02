'use client';
import * as React from 'react';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import DashboardCard from '@/app/components/dashboard/dashboardcard';
import { Stack } from '@mui/joy';
import Grid from '@mui/joy/Grid';
import PendingActionsIcon from '@mui/icons-material/PendingActions';


export default function Dashboard() {
  return (
    <>
      <Box
        sx={{
          // display: 'flex',
          mb: 1,
          gap: 1,
          flexDirection: 'row',
          alignItems: { xs: 'start', sm: 'center' },
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}
      >

        <Grid container spacing={2} sx={{ flexGrow: 1 }}>
          <Grid xs={12}>
            <Typography level="h2" component="h1">
              Dashboards
            </Typography>
          </Grid>
        </Grid>
       </Box>
        <Grid container spacing={2} sx={{ flexGrow: 1,flexDirection : {xs:'column',md:'row'} }} >
          <Grid xs={12}>
            <Typography level="h3" component="h1">
              Tasks
            </Typography>
          </Grid>
          <Grid xs={3}>
            <DashboardCard icon={PendingActionsIcon} title={'Total'} value={75} color='primary' />
          </Grid>
          <Grid xs={3}>
            <DashboardCard icon={PendingActionsIcon} title={'Inprogress'} value={10} color='neutral' />
          </Grid>
          <Grid xs={3}>
            <DashboardCard icon={PendingActionsIcon} title={'Pending Approval'} value={60} color='warning' />
          </Grid>
          <Grid xs={3}>
            <DashboardCard icon={PendingActionsIcon} title={'Approved'} value={5} color='success' />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ flexGrow: 1,flexDirection : {xs:'column',md:'row'} }} >
          <Grid xs={12}>
            <Typography level="h3" component="h1">
              Reviews
            </Typography>
          </Grid>
          <Grid xs={3}>
            <DashboardCard icon={PendingActionsIcon} title={'Total'} value={75} color='primary' />
          </Grid>
          <Grid xs={3}>
            <DashboardCard icon={PendingActionsIcon} title={'Inprogress'} value={10} color='neutral' />
          </Grid>
          <Grid xs={3}>
            <DashboardCard icon={PendingActionsIcon} title={'Pending Approval'} value={60} color='warning' />
          </Grid>
          <Grid xs={3}>
            <DashboardCard icon={PendingActionsIcon} title={'Approved'} value={5} color='success' />
          </Grid>
        </Grid>

    </>)

}
