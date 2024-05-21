'use client';
import * as React from 'react';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';

import JoballocationTable from '@/app/components/JoballocationTable/JoballocationTable';
import Link from 'next/link';
import JoballocationLists from '@/app/components/JoballocationTable/JoballocationLists';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/Store/store';
import { useAuth } from '@/app/hooks/useAuth';
import { useEffect } from 'react';

export default function Joballocation() {
  const [listsec, setListsec] = React.useState(false);
  const [selectedrow, setSelectedRow] = React.useState();

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
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: { xs: 'start', sm: 'center' },
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            }}
          >
            <Typography level="h2" component="h1">
              Job Allocation
            </Typography>
            {listsec === true &&
            <Typography component="div">
              <Link href="/joballocation" onClick={() => setListsec(false) }>Back</Link>
            </Typography>
            }
          </Box>
          <JoballocationLists listsec={listsec} setListsec={setListsec} setSelectedRow={setSelectedRow} selectedrow={selectedrow}></JoballocationLists>
          <JoballocationTable listsec={listsec} setListsec={setListsec} setSelectedRow={setSelectedRow} selectedrow={selectedrow}/>
         </>
      ): ('Session Timed Out')
    }
    </>
  );
}
