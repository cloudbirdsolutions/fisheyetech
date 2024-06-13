"use client";

/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import Chip from '@mui/joy/Chip';
import IconButton from '@mui/joy/IconButton';
import ListItem from '@mui/joy/ListItem';
import ListItemContent from '@mui/joy/ListItemContent';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListDivider from '@mui/joy/ListDivider';



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
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Box from '@mui/joy/Box';
import List from '@mui/joy/List';

import {stableSort, getComparator} from '@/app/helper/sorting';
import Typography from '@mui/joy/Typography';
import { useAuth } from '../hooks/useAuth';

type Order = "asc" | "desc";



export default function UserList(props:any) {
  const [listItems, setlistItems] = React.useState([]);
  const createuser = useSelector((state:any) => state?.createusers?.data);
  const deleteusers = useSelector((state:any) => state?.deleteusers?.data);
  const edituser = useSelector((state:any) => state?.editusers?.data);

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [order, setOrder] = React.useState<Order>("desc");


  const HandleDeleteFunction = (id:any) => {
    try {
      // const userData = Object.fromEntries();
       
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

        const response = await fetch(`${API_BASE_URL}/users/get`, {
          method: 'GET',
          headers: {
            Accept: "application/json",
            'Content-Type': 'application/json',
            Authorization: "Bearer "  + auth,
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user details: ' + response.statusText);
        }

        const data = await response.json();

        setlistItems(data.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    getData();

  }, [createuser, deleteusers, edituser])

  return (
    <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
      {listItems && stableSort(listItems, getComparator(order, "id")).map((listItem: any) => (
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
                  {listItem.name}
                </Typography>
                <Typography gutterBottom>
                  {listItem.address}
                </Typography>

                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 0.5,
                    mb: 1,
                  }}
                >
                  <Typography level="body-xs">{listItem.phone}</Typography>
                  <Typography level="body-xs">&bull;</Typography>
                  <Typography level="body-xs">{listItem.userName}</Typography>
                  <Typography level="body-xs">&bull;</Typography>
                  <Typography level="body-xs">{listItem.password}</Typography>

                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <RowMenu row={listItem} open={props.open} setOpen={props.setOpen} label={props.label} setRow={props.setRow} setLabel={props.setLabel} parentFunction={HandleDeleteFunction}/>
                </Box>
              </div>
            </ListItemContent>
            <Chip
              variant="soft"
              size="sm"
              startDecorator={listItem.statusMaster.statusName === 'ACTIVE' ? <CheckRoundedIcon /> : listItem.statusMaster.statusName === 'PENDING' ? <AutorenewRoundedIcon /> : <BlockIcon />}
              color={listItem.statusMaster.statusName === 'ACTIVE' ? 'success' : listItem.statusMaster.statusName === 'PENDING' ? 'neutral' : 'danger'}
            >
              {listItem.statusMaster.statusName}
            </Chip>
          </ListItem>
          <ListDivider />
        </List>
      ))}
     
    </Box>
  );
}
