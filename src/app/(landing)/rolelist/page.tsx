'use client';
import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';

import PersonAddIcon from '@mui/icons-material/PersonAdd';

import RoleTable from '../../components/RoleTable';
import RoleLists from '../../components/RoleLists';
import Stack from '@mui/joy/Stack';
import modalContext from '@/app/context/modalContext';
import RoleModalForm from '@/app/components/RoleListModalForm/RoleListModalForm';
import { ToastContainer } from 'react-toastify';
import Loader from '@/app/components/Loader/Loader';


import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/hooks/useAuth';
import { AppDispatch } from '@/app/Store/store';

export default function RoleList() {
  const [label, setLabel] = React.useState<string>('');
  const [open, setOpen] = React.useState<boolean>(false);
  const [row, setRow] = React.useState(null!);
  
  const loadingState = useSelector((state:any) => state?.createroles?.status === 'loading' || state?.deleteroles?.status === 'loading' || state?.editroles?.status === 'loading' ? 'loading' : '');
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
        <Loader open={loadingState === 'loading'? true : false}/>
        {auth ? (
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
            <Typography level="h2" component="h1">
              Role
            </Typography>
            <Stack spacing={2} direction="row">
              <Button
                color="success"
                startDecorator={<PersonAddIcon />}
                size="sm"
                onClick={() => {setOpen(true); setLabel('Add'); setRow(null!)}}
              >
                Add New Role
              </Button>
            </Stack>

          </Box>
          <RoleTable open={open} setOpen={setOpen} label={label} setLabel={setLabel} setRow={setRow}/>
          <RoleLists open={open} setOpen={setOpen} label={label} setLabel={setLabel} setRow={setRow}/>

          <modalContext.Provider value={row}>
          <RoleModalForm open={open} setOpen={setOpen} label={label} setLabel={setLabel} setRow={setRow}/>
          </modalContext.Provider>
          </>
        ) :  ('Session Timed Out')
      }
          <ToastContainer/>
      </>
  );
}
