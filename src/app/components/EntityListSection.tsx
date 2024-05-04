"use client";

/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import { ColorPaletteProp } from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import Avatar from '@mui/joy/Avatar';
import Chip from '@mui/joy/Chip';
import Link from '@mui/joy/Link';
import Divider from '@mui/joy/Divider';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemContent from '@mui/joy/ListItemContent';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListDivider from '@mui/joy/ListDivider';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import Dropdown from '@mui/joy/Dropdown';



import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import BlockIcon from '@mui/icons-material/Block';
import AutorenewRoundedIcon from '@mui/icons-material/AutorenewRounded';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import RowMenu from './RowMenu';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { deleteuser } from '../Reducers/DeleteUserSlice';
import { AppDispatch } from '../Store/store';
import { API_BASE_URL } from '../config';
import { deleteentity } from '../Reducers/DeleteEntitySlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function EntityListSection (props:any) {

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
  

    return (
        
<Box sx={{ display: { xs: 'block', sm: 'none' } }}>
    {props.listItems && props.listItems.map((listItem: any) => (
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
    <Box
      className="Pagination-mobile"
      sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', py: 2 }}
    >
      <IconButton
        aria-label="previous page"
        variant="outlined"
        color="neutral"
        size="sm"
      >
        <KeyboardArrowLeftIcon />
      </IconButton>
      <Typography level="body-sm" mx="auto">
        Page 1 of 10
      </Typography>
      <IconButton
        aria-label="next page"
        variant="outlined"
        color="neutral"
        size="sm"
      >
        <KeyboardArrowRightIcon />
      </IconButton>
    </Box>
  </Box>
    )
}
