'use client';
import * as React from 'react';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import DashboardCard from '@/app/components/dashboard/dashboardcard';
import { Stack } from '@mui/joy';
import Grid from '@mui/joy/Grid';
import DashboardReviewCard from '@/app/components/dashboard/dashboardreviewcard';
import DashboardFollowUpCard from '@/app/components/dashboard/dashboardfollowupcard';
import DashboardDocumentCard from '@/app/components/dashboard/dashboarddocumentcard';
import ChartsOverviewDemo from '@/app/components/dashboard/dashboardchart';
import DashboardChart from '@/app/components/dashboard/dashboardchart';


export default function Dashboard() {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          mb: 1,
          gap: 1,
          flexDirection: { xs: 'column', sm: 'row' },
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
          <Grid xs={3}>
            <DashboardCard />
          </Grid>
          <Grid xs={3}>
            <DashboardReviewCard />
          </Grid>
          <Grid xs={3}>
            <DashboardFollowUpCard />
          </Grid>
          <Grid xs={3}>
            <DashboardDocumentCard />
          </Grid>
        </Grid>
     <DashboardChart />
      </Box>

    </>)

}
