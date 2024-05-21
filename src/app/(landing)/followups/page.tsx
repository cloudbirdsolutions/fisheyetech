'use client';
import * as React from 'react';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Followups from '@/app/components/Tasks/Followups';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/hooks/useAuth';
import { AppDispatch } from '@/app/Store/store';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
export default function Dashboard() {
    const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
const auth =  useAuth();
useEffect(() => {
  !auth ? (
  localStorage.removeItem('accessToken'),
  dispatch({ type: "USER_LOGOUT" }),
  //setuser('')
  router.push("/", { scroll: false }) ): ( '' )
}, [])
    return (
        <>
        {auth ? (
            <>
            <Followups />
            </>
    ) : ('Session Timed Out')
  }
        </>)

}
