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
import { Entity } from "@/app/types";

type Order = "asc" | "desc";

interface EntityTableProps {
  open:boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  label:string;
  setLabel:React.Dispatch<React.SetStateAction<string>>;
  setRow:React.Dispatch<(prevState: never) => never>;
  EntityList:Entity[];
  fetchSheets:Function;
}

export default function EntityTable(props:EntityTableProps) {
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
    props.fetchSheets();
  

  }, [createentity, deleteentitys, editentity])

  const headers = ["Sheet Name"];

  const tablerows =  stableSort(props.EntityList, getComparator(order, 'id')).map((row:any) => (
    <tr key={row?.id}>
      <td>
        <Typography level="body-xs">{row?.id}</Typography>
      </td>
      <td>
        <Typography level="body-xs">{row?.sheetName}</Typography>
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
        <TableSection tableHeaders={headers} tableRows={tablerows} action={true}/>
        <EntityListSection listItems={rows} open={props.open} setOpen={props.setOpen} label={props.label} setRow={props.setRow} setLabel={props.setLabel} parentFunction={HandleDeleteFunction}/>
        </>
  );
}
