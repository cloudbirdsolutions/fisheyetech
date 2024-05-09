"use client";

/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import Box from '@mui/joy/Box';
import Avatar from '@mui/joy/Avatar';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemContent from '@mui/joy/ListItemContent';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListDivider from '@mui/joy/ListDivider';


import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import RowMenu from './RowMenu';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { AppDispatch } from '../Store/store';
import { deleteentity } from '../Reducers/DeleteEntitySlice';
import {stableSort, getComparator} from '@/app/helper/sorting';

type Order = "asc" | "desc";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function EntityListSection (props:any) {

    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const [order, setOrder] = React.useState<Order>("desc");

  
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
  

    return (
        
<Box sx={{ display: { xs: 'block', sm: 'none' } }}>
    {props.listItems && stableSort(props.listItems, getComparator(order, "id")).map((listItem: any) => (
      <List
        key={listItem.id}
        size="sm"
        sx={{
          '--ListItem-paddingX': 0,
        }}
      >
        <ListItem
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'start',
          }}
        >
          <ListItemContent sx={{ display: 'flex', gap: 2, alignItems: 'start' }}>
            <ListItemDecorator>
              <Avatar size="sm">{listItem.id}</Avatar>
            </ListItemDecorator>
            <div>
              <Typography fontWeight={600} gutterBottom>
                {listItem.sheetName}
              </Typography>
             
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <RowMenu row={listItem} open={props.open} setOpen={props.setOpen} label={props.label} setRow={props.setRow} setLabel={props.setLabel} parentFunction={HandleDeleteFunction}/>
              </Box>
            </div>
          </ListItemContent>
         
        </ListItem>
        <ListDivider />
      </List>
    ))}
  </Box>
    )
}
