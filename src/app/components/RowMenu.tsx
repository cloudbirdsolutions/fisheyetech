
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../Store/store';
import { deleteuser } from '../Reducers/DeleteUserSlice';
import { useRouter } from 'next/navigation';
import IconButton from '@mui/joy/IconButton';
import { Box, Button } from '@mui/joy';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import UserModalForm from './UserModalForm/UserModalForm';
import React, { useEffect } from 'react';


const RowMenu = (props:any) => {


    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

  
    const deletefn = async (id:any) => {

        try {
            // const userData = Object.fromEntries();
             
            dispatch(deleteuser(id)).then(() => {
              router.push('/entities');
            })
             
           } catch (error) {
             console.error('Failed to Delete user:', error);
             // Handle error (e.g., display error message)
           }
    }
  
  function editfn(row: any): void {
    props.setOpen(true);
    props.setLabel('Edit User');
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
          <DeleteIcon onClick={() => deletefn(props.row?.id)}/>
        </Button>
      </Box>
      </>
    );
  }


  export default RowMenu;