'use client';
import * as React from 'react';
import Box from '@mui/joy/Box';
import TasksTable from '@/app/components/Tasks/TasksTable';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/Store/store';
import {useAuth} from '@/app/hooks/useAuth';
import { useEffect } from 'react';


export default function Task() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const auth = useAuth();
  useEffect(() => {
    !auth ? (
    localStorage.removeItem('accessToken'),
    dispatch({ type: "USER_LOGOUT" }),
    //setuser('')
    router.push("/", { scroll: false }) ): ( '' )
  }, [])
  return (
    <>
    {auth ? 
      <TasksTable/> 
      :
      <>Session Timedout</>
    }
    </>
  );
}
