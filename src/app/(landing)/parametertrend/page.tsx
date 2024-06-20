'use client';
import * as React from 'react';
import {useEffect} from 'react';
// import { Stack } from '@mui/joy';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '@/app/Store/store';
import {DefaultColorPalette} from '@mui/joy/styles/types';
import {useRouter} from 'next/navigation';
import {useAuth} from '@/app/hooks/useAuth';
import TrendSelectorComponent from '@/app/components/ParameterTrending/TrendSelectorComponent';


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
