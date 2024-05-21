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
import {stableSort, getComparator} from '@/app/helper/sorting';
import { useAuth } from '../hooks/useAuth';

type Order = "asc" | "desc";

export default function OrderTable(props:any) {
  const createuser = useSelector((state:RootState) => state?.createusers?.data);
  const deleteusers = useSelector((state:RootState) => state?.deleteusers?.data);
  const edituser = useSelector((state:RootState) => state?.editusers?.data);

  const [order, setOrder] = React.useState<Order>("desc");

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

  const auth = useAuth();

  React.useEffect(() => {
    const getData = async () => {
      try {

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/users/get`, {
          method: 'GET',
          headers: {
            Accept: "application/json",
            'Content-Type': 'application/json',
            Authorization: "Bearer "  + auth,
          }
        });

        if (!response.ok) {
          const errorData = await response.json();
          toast.error(errorData.message)
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
