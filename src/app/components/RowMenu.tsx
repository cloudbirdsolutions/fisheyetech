import IconButton from '@mui/joy/IconButton';
import { Box, Button } from '@mui/joy';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import React, { forwardRef, useImperativeHandle } from 'react';


const RowMenu = (props:any) => {

          
  function editfn(row: any): void {
    props.setOpen(true);
    props.setLabel('Edit');
    props.setRow(row);
  }

    return (
      <>
      <Box id={props.row?.id}>
        <Button 
          slots={{ root: IconButton }}
          slotProps={{ root: { variant: 'plain', color: 'neutral', size: 'sm' } }}
        >
          <EditIcon onClick={() => editfn(props.row)}/>
        </Button>
        <Button 
          slots={{ root: IconButton }}
          slotProps={{ root: { variant: 'plain', color: 'danger', size: 'sm' } }}
        >
          <DeleteIcon onClick={() => props.parentFunction(props.row?.id)}/>
        </Button>
      </Box>
      </>
    );
  }


  export default RowMenu;