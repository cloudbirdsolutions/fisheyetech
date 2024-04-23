import * as React from 'react';
import Box from '@mui/joy/Box';
import Checkbox from '@mui/joy/Checkbox';

export default function BasicCheckbox(props:any) {
  return (
    <Box sx={{ display: 'flex', gap: 3 }}>
      <Checkbox label={props.label} />
    </Box>
  );
}