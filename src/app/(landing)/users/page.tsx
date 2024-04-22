'use client';
import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';


import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

import OrderTable from '../../components/OrderTable';
import OrderList from '../../components/OrderList';
import Stack from '@mui/joy/Stack';
import UserModalForm from '@/app/components/UserModalForm/UserModalForm';
import { createContext, useContext, useState } from 'react';
import modalContext from '@/app/context/modalContext';

export default function JoyOrderDashboardTemplate() {


  const [open, setOpen] = React.useState<boolean>(false);
  const [label, setLabel] = React.useState<string>('');
  const [row, setRow] = React.useState(null);
  
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
            <Typography level="h2" component="h1">
              Users
            </Typography>
            <Stack spacing={2} direction="row">
              <Button
                color="success"
                startDecorator={<PersonAddIcon />}
                size="sm"
                onClick={() => {setOpen(true); setLabel('Add New User'); setRow(null)}}
              >
                Add New User
              </Button>
              <Button
                color="primary"
                startDecorator={<DownloadRoundedIcon />}
                size="sm"
              >
                Download Excel
              </Button>
            </Stack>
          </Box>

          <OrderTable open={open} setOpen={setOpen} label={label} setLabel={setLabel} setRow={setRow}/>

          <OrderList open={open} setOpen={setOpen} label={label} setLabel={setLabel} setRow={setRow}/>
          <modalContext.Provider value={row}>
          <UserModalForm open={open} setOpen={setOpen} label={label} setLabel={setLabel} setRow={setRow}/>
          </modalContext.Provider>
      
    </>
  );
}