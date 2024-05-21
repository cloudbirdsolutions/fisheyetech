'use client';
import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';

import PersonAddIcon from '@mui/icons-material/PersonAdd';

import ForceTable from '../../components/Forceclose/ForceTable';
import ForceLists from '../../components/Forceclose/ForceList';
import Stack from '@mui/joy/Stack';
import modalContext from '@/app/context/modalContext';
import Remarks from '@/app/components/Forceclose/Remarks';
import { ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '@/app/components/Loader/Loader';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/hooks/useAuth';
import { AppDispatch } from '@/app/Store/store';
import { useEffect } from 'react';

export default function ForceClose() {
  const [label, setLabel] = React.useState<string>('');
  const [open, setOpen] = React.useState<boolean>(false);
  const [row, setRow] = React.useState(null!);

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
          <Box
            sx={{
              display: 'flex',
              mb: 1,
              gap: 1,
              flexDirection: "row",
              alignItems: { xs: 'start', sm: 'center' },
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            }}
          >
            <Typography level="h2" component="h1">
              Force Close
            </Typography>
            
          </Box>
          <ForceTable open={open} setOpen={setOpen} label={label} setLabel={setLabel} setRow={setRow}/>
          <ForceLists open={open} setOpen={setOpen} label={label} setLabel={setLabel} setRow={setRow}/>
    

          <modalContext.Provider value={row}>
            <Remarks open={open} setOpen={setOpen} label={label} setLabel={setLabel}/>
          </modalContext.Provider>
      <ToastContainer/>
      </>
    ) : ('Session Timed Out')
  }
      </>
  );
}
