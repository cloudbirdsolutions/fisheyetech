"use client";

/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';

import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import RowMenu from './RowMenu';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../Store/store';
import { useRouter } from 'next/navigation';
import { deleteentity } from '../Reducers/DeleteEntitySlice';
import EntityListSection from './EntityListSection';
import TableSection from './Common/TableSection';
import {stableSort, getComparator} from '@/app/helper/sorting';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../hooks/useAuth';

type Order = "asc" | "desc";

export default function EntityTable(props:any) {
  const [order, setOrder] = React.useState<Order>('desc');
  const [rows, setRows] = React.useState([{id:"",createdAt:"",updatedAt:"",departmentName: ""}]);
  
  const createentity = useSelector((state:any) => state?.createentity?.data);
  const deleteentitys = useSelector((state:any) => state?.deleteentity?.data);
  const editentity = useSelector((state:any) => state?.editentity?.data);


  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const HandleDeleteFunction = (id:any) => {
    try {
      // const userData = Object.fromEntries();
       
      dispatch(deleteentity(id)).then((res) => {
        
        res.payload.statusCode === 200 ? (
          toast.success(res.payload.message),
          router.push('/entities')
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
  // const data = await getData()
  const auth = useAuth();
  React.useEffect(() => {
    const getData = async () => {
      try {
         
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/sheetMaster/get`, {
          method: 'GET',
          headers: {
            Accept : "application/json",
            'Content-Type': 'application/json',
            Authorization: "Bearer "  + auth,
          }
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch user details: ' + response.statusText);
        }
  
        const data = await response.json();
        console.log(data)
        setRows(data.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };
  
    getData(); 

  }, [createentity, deleteentitys, editentity])

  const headers = ["Sheet Name"];

  const tablerows =  stableSort(rows, getComparator(order, 'id')).map((row:any) => (
    <tr key={row?.id}>
      <td>
        <Typography level="body-xs">{row?.id}</Typography>
      </td>
      <td>
        <Typography level="body-xs">{row?.sheetName}ddd</Typography>
      </td>
      
      <td>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          
          <RowMenu row={row} open={props.open} setOpen={props.setOpen} label={props.label} setRow={props.setRow} setLabel={props.setLabel} parentFunction={HandleDeleteFunction}/>
        </Box>
      </td>
    </tr>
  ))
 
  return (
      <>
        <TableSection tableHeaders={headers} tableRows={tablerows}/>
        <EntityListSection listItems={rows} open={props.open} setOpen={props.setOpen} label={props.label} setRow={props.setRow} setLabel={props.setLabel} parentFunction={HandleDeleteFunction}/>
        </>
  );
}
