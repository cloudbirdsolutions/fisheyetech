'use client';
import * as React from 'react';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';

import JoballocationTable from '@/app/components/JoballocationTable/JoballocationTable';

export default function Joballocation(props:any) {
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
              Job Allocation
            </Typography>
          </Box>
          <JoballocationTable />
         </>
  );
}
