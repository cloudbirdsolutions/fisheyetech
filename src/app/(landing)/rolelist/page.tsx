'use client';
import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';

import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

import RoleTable from '../../components/RoleTable';
import RoleLists from '../../components/RoleLists';
import Stack from '@mui/joy/Stack';
import modalContext from '@/app/context/modalContext';
import RoleModalForm from '@/app/components/RoleListModalForm/RoleListModalForm';

import { useState } from 'react';

export default function RoleList() {
  const [label, setLabel] = React.useState<string>('');
  const [open, setOpen] = React.useState<boolean>(false);
  const [row, setRow] = React.useState(null!);
  
  
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
  );
}
