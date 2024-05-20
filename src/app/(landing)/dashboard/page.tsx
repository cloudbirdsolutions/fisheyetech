'use client';
import * as React from 'react';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import DashboardCard from '@/app/components/dashboard/dashboardcard';
// import { Stack } from '@mui/joy';
import Grid from '@mui/joy/Grid';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/Store/store';
import { DefaultColorPalette } from '@mui/joy/styles/types';
import ReviewsIcon from '@mui/icons-material/Reviews';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DashboardChart from '@/app/components/dashboard/dashboardchart';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/hooks/useAuth';
import { AppDispatch } from '@/app/Store/store';
import { useDispatch } from 'react-redux';


interface ChartType {
  title: string,
  color: DefaultColorPalette,
  icon: any,
  value: number
}
interface ChartSeries {
  label: string;
  data: number[];
  showMark?: boolean;
  color: DefaultColorPalette;
}

interface LineChartsParams {
  series: ChartSeries[];
  width: number;
  height: number;
}


export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState({
    "joballocation": 0,
    "review": 0,
    "remarks": 0,
    "sheetDocumentId": 0
  });
  const [loading, setLoading] = useState(true)

  const logintype = useSelector((state: RootState) => state?.user.data);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
const auth =  useAuth();
useEffect(() => {
  !auth ? (
  localStorage.removeItem('accessToken'),
  dispatch({ type: "USER_LOGOUT" }),
  //setuser('')
  router.push("/", { scroll: false }) ): ( '' )
 
    fetch(`${process.env.NEXT_PUBLIC_API_HOST}/dashboard/count?userId=${logintype.data.id}`, {
      headers: {
      Accept : "application/json",
      'Content-Type': 'application/json',
      Authorization: "Bearer "  + auth,
    }
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === 200) {
          setDashboardData(data.data._count)
        }
        setLoading(false)
      })
      .catch(error => {
        console.error('Error fetching data : ', error);
        setLoading(false)
      })
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const charts: ChartType[] = [
    {
      title: 'Tasks',
      color: 'success',
      icon: PendingActionsIcon,
      value: dashboardData.joballocation
    },
    {
      title: 'Reviews',
      color: 'primary',
      icon: ReviewsIcon,
      value: dashboardData.review
    },
    {
      title: 'Follow-Ups',
      color: 'warning',
      icon: ReportProblemIcon,
      value: dashboardData.remarks
    },
    {
      title: 'Documents',
      color: 'danger',
      icon: AssignmentIcon,
      value: dashboardData.sheetDocumentId
    },
  ]

  return (
    <>
     {auth ? (
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
      <Grid container spacing={2} sx={{ flexGrow: 1, flexDirection: { xs: 'column', md: 'row' } }} >

        {
          charts.map((c, i) => (
            <Grid key={i} xs={3}>
              <DashboardCard icon={c.icon} title={c.title} value={c.value} color={c.color} />
            </Grid>
          ))
        }
      </Grid>
      <DashboardChart />
      </>
    ) : ('Session Timed Out')
  }
    </>

  )

}
