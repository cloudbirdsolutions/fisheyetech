'use client';
import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';

import PersonAddIcon from '@mui/icons-material/PersonAdd';


import Stack from '@mui/joy/Stack';
import EntityTable from '@/app/components/EntityTable';
import EntityModalForm from '@/app/components/EntityModalForm/EntityModalForm';
import modalContext from '@/app/context/modalContext';
import { ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
import Loader from '@/app/components/Loader/Loader';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/hooks/useAuth';
import { AppDispatch } from '@/app/Store/store';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';


export default function Entity() {  

  const [label, setLabel] = React.useState<string>('');
  const [open, setOpen] = React.useState<boolean>(false);
  const [row, setRow] = React.useState(null!);

  const loadingState = useSelector((state:any) => state?.createentity?.status === 'loading' || state?.deleteentity?.status === 'loading' || state?.editentity?.status === 'loading' ? 'loading' : '');
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
              Entities
            </Typography>
            <Stack spacing={2} direction="row">
              <Button
                color="success"
                startDecorator={<PersonAddIcon />}
                size="sm"
                onClick={() => {setOpen(true); setLabel('Add'); setRow(null!)}}
              >
                Add Entity
              </Button>
            </Stack>

          </Box>
          <EntityTable open={open} setOpen={setOpen} label={label} setLabel={setLabel} setRow={setRow}/>
         
          <modalContext.Provider value={row}>
          <EntityModalForm open={open} setOpen={setOpen} label={label} setLabel={setLabel} setRow={setRow}/>
          </modalContext.Provider>
          <ToastContainer/>
          </>
    ) : ('Session Timed Out')
  }
          </>
  );
}
