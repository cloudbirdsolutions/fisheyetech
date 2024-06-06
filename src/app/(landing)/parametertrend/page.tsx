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
import TrendSelectorComponent from '@/app/components/ParameterTrending/TrendSelectorComponent';
import TrendChartComponent from '@/app/components/ParameterTrending/TrendChartComponent';


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


export default function ParameterTrend() {


  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const auth = useAuth();
  useEffect(() => {
    !auth ? (
      localStorage.removeItem('accessToken'),
      dispatch({ type: "USER_LOGOUT" }),
      //setuser('')
      router.push("/", { scroll: false })) : ('')
  }, [])

  return (
    <>
      {auth ? (
        <>
          <TrendSelectorComponent/>

          {/* <TrendChart /> */}
        </>
      ) : ('Session Timed Out')
      }
    </>

  )

}
