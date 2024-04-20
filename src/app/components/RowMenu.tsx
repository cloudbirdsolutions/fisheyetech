import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import Dropdown from '@mui/joy/Dropdown';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../Store/store';
import { deleteuser } from '../Reducers/DeleteUserSlice';
import { useRouter } from 'next/navigation';
import IconButton from '@mui/joy/IconButton';
import Divider from '@mui/joy/Divider';
import { Box, Button } from '@mui/joy';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


function RowMenu(props:any) {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
  
    const deletefn = async (id:any) => {

        try {
            // const userData = Object.fromEntries();
             
            dispatch(deleteuser(id)).then(() => {
              router.push('/users');
            })
             
           } catch (error) {
             console.error('Failed to Delete user:', error);
             // Handle error (e.g., display error message)
           }
    }
  
  function editfn(id: any): void {
    throw new Error('Function not implemented.');
  }

    return (
      <Box id={props.id}>
        <Button onClick={() => editfn(props.id)}
          slots={{ root: IconButton }}
          slotProps={{ root: { variant: 'plain', color: 'neutral', size: 'sm' } }}
        >
          <EditIcon />
        </Button>
        <Button onClick={() => deletefn(props.id)}
          slots={{ root: IconButton }}
          slotProps={{ root: { variant: 'plain', color: 'danger', size: 'sm' } }}
        >
          <DeleteIcon />
        </Button>
      </Box>
    );
  }

  export default RowMenu;