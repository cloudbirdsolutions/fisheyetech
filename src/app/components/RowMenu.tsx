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
  
    return (
      <Dropdown id={props.id}>
        <MenuButton
          slots={{ root: IconButton }}
          slotProps={{ root: { variant: 'plain', color: 'neutral', size: 'sm' } }}
        >
          <MoreHorizRoundedIcon />
        </MenuButton>
        <Menu size="sm" sx={{ minWidth: 140 }}>
          <MenuItem>Edit</MenuItem>
          <MenuItem>Rename</MenuItem>
          <MenuItem>Move</MenuItem>
          <Divider />
          <MenuItem color="danger" onClick={() => deletefn(props.id)}>Delete</MenuItem>
        </Menu>
      </Dropdown>
    );
  }

  export default RowMenu;