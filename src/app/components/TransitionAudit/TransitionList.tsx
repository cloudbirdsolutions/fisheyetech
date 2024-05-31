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
import { useDispatch, useSelector } from 'react-redux';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Box from '@mui/joy/Box';
import List from '@mui/joy/List';

import {stableSort, getComparator} from '@/app/helper/sorting';
import Typography from '@mui/joy/Typography';
import { useAuth } from '@/app/hooks/useAuth';

type Order = "asc" | "desc";



export default function OrderList(props:any) {
  const [listItems, setlistItems] = React.useState([]);
  const createuser = useSelector((state:any) => state?.createusers?.data);
  const deleteusers = useSelector((state:any) => state?.deleteusers?.data);
  const edituser = useSelector((state:any) => state?.editusers?.data);

  const [order, setOrder] = React.useState<Order>("desc");


  const auth = useAuth();
  React.useEffect(() => {
    const getData = async () => {
      try {

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/transitionaudit?docId=${props.docId}`, {
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

  }, [])

  return (
    <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
      {}
     
    </Box>
  );
}
