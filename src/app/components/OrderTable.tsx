"use client";

/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import Box from '@mui/joy/Box';
import Chip from '@mui/joy/Chip';
import Typography from '@mui/joy/Typography';


import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import BlockIcon from '@mui/icons-material/Block';
import AutorenewRoundedIcon from '@mui/icons-material/AutorenewRounded';

import { useDispatch, useSelector } from 'react-redux';
import RowMenu from './RowMenu';
import { AppDispatch,RootState } from '../Store/store';
import { useRouter } from 'next/navigation';
import { deleteuser } from '../Reducers/DeleteUserSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TableSection from './Common/TableSection';


function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export default function OrderTable(props:any) {
  const createuser = useSelector((state:RootState) => state?.createusers?.data);
  const deleteusers = useSelector((state:RootState) => state?.deleteusers?.data);
  const edituser = useSelector((state:RootState) => state?.editusers?.data);

  const [order, setOrder] = React.useState<Order>('desc');
  const [open, setOpen] = React.useState(false);
  const [rows, setRows] = React.useState([
    { id: "", name: "", userName: "", status: "", password: "", action :"" },
  ]);
  
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const HandleDeleteFunction = (id:any) => {
    try {
       
      dispatch(deleteuser(id)).then((res) => {
        res.payload.statusCode === 200 ? (
          toast.success(res.payload.message),
        router.push('/users')
          ) : 
          (
            toast.error(res.payload.message)
          )
      })
       
     } catch (error) {
       console.error('Failed to Delete user:', error);
       // Handle error (e.g., display error message)
     }
  }


  React.useEffect(() => {
    const getData = async () => {
      try {

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/users/get`, {
          method: 'GET',
          headers: {
            Accept: "application/json",
            'Content-Type': 'application/json',
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user details: ' + response.statusText);
        }

        const data = await response.json();

        setRows(data.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    getData();

  }, [createuser, deleteusers, edituser])

  const headers = [ "Name", "User Name", "Status", "Password"];

  const tablerows = stableSort(rows, getComparator(order, "id")).map(
    (row: any) => (
      <tr key={row?.id}>
      <td>
        <Typography level="body-xs">{row?.id}</Typography>
      </td>
      <td>
        <Typography level="body-xs">{row?.name}</Typography>
      </td>
      <td>
        <Typography level="body-xs">{row.userName}</Typography>
      </td>
      <td>
        <Chip
          variant="soft"
          size="sm"
          startDecorator={row?.statusMaster?.statusName === 'ACTIVE' ? <CheckRoundedIcon /> : row?.statusMaster?.statusName === 'PENDING' ? <AutorenewRoundedIcon /> : <BlockIcon />}
          color={row?.statusMaster?.statusName === 'ACTIVE' ? 'success' : row?.statusMaster?.statusName === 'PENDING' ? 'neutral' : 'danger'}
        >
          {row?.statusMaster?.statusName}
        </Chip>
      </td>

      <td>
        <Typography level="body-xs">{row.password}</Typography>
      </td>
      <td>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>

          <RowMenu row={row} open={props.open} setOpen={props.setOpen} label={props.label} setRow={props.setRow} setLabel={props.setLabel} parentFunction={HandleDeleteFunction}/>
        </Box>
      </td>
    </tr>
    )
  );

   return (
    <TableSection tableHeaders={headers} tableRows={tablerows} />
  );
}
