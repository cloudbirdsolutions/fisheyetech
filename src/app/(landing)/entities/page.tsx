'use client';
import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';

import PersonAddIcon from '@mui/icons-material/PersonAdd';


import DepartmentLists from '../../components/DepartmentLists';
import Stack from '@mui/joy/Stack';
import EntityTable from '@/app/components/EntityTable';

export default function DepartmentList() {  

  const [label, setLabel] = React.useState<string>('');
  const [open, setOpen] = React.useState<boolean>(false);
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
              Entities
            </Typography>
            <Stack spacing={2} direction="row">
              <Button
                color="success"
                startDecorator={<PersonAddIcon />}
                size="sm"
                onClick={() => setOpen(true)}
              >
                Add Entity
              </Button>
            </Stack>

          </Box>
          <EntityTable open={open} setOpen={setOpen} label={label} setLabel={setLabel} setRow={setRow}/>
            
          </>
  );
}
