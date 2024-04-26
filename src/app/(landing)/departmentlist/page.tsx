'use client';
import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';

import PersonAddIcon from '@mui/icons-material/PersonAdd';

import DepartmentTable from '../../components/DepartmentTable';
import DepartmentLists from '../../components/DepartmentLists';
import Stack from '@mui/joy/Stack';
import modalContext from '@/app/context/modalContext';
import DepartmentModalForm from '@/app/components/DepartmentModalForm/DepartmentModalForm';

export default function DepartmentList() {
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
              Departments
            </Typography>
            <Stack spacing={2} direction="row">
              <Button
                color="success"
                startDecorator={<PersonAddIcon />}
                size="sm"
                onClick={() => {setOpen(true); setLabel('Add'); setRow(null!)}}
              >
                Add New Department
              </Button>
            </Stack>

          </Box>
          <DepartmentTable open={open} setOpen={setOpen} label={label} setLabel={setLabel} setRow={setRow}/>
          <DepartmentLists open={open} setOpen={setOpen} label={label} setLabel={setLabel} setRow={setRow}/>
    
          <modalContext.Provider value={row}>
          <DepartmentModalForm open={open} setOpen={setOpen} label={label} setLabel={setLabel} setRow={setRow}/>
          </modalContext.Provider>
      
      </>
  );
}
