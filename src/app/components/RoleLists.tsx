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
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import AutorenewIcon from '@mui/icons-material/Autorenew';

import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import BlockIcon from '@mui/icons-material/Block';
import RowMenu from "./RowMenu";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../Store/store";
import { useRouter } from "next/navigation";
import { deleterole } from "../Reducers/DeleteRoleSlice";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {stableSort, getComparator} from '@/app/helper/sorting';
import { useAuth } from '../hooks/useAuth';

type Order = "asc" | "desc";

export default function RoleLists(props:any) {
  const [listItems, setlistItems] = React.useState([]);
  const [order, setOrder] = React.useState<Order>("desc");

  const createrole = useSelector(
    (state: any) => state?.createroles?.data
  );
  const deleteroles = useSelector(
    (state: any) => state?.deleteroles?.data
  );
  const editrole = useSelector(
    (state: any) => state?.editroles?.data
  );
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const HandleDeleteFunction = (id: any) => {
    try {
      // const userData = Object.fromEntries();

      dispatch(deleterole(id)).then((res) => {
        res.payload.statusCode === 200 ? (
          toast.success(res.payload.message),
          router.push("/rolelist")
        ) : 
          (
            toast.error(res.payload.message)
          )
      });
    } catch (error) {
      console.error("Failed to Delete user:", error);
      // Handle error (e.g., display error message)
    }
  };
const auth = useAuth();
  React.useEffect(() => {
    const getData = async () => {
      try {
         
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/roles/get`, {
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
        
        setlistItems(data.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };
  
    getData(); 

  }, [createrole, deleteroles, editrole])

  return (
    <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
      {listItems && stableSort(listItems, getComparator(order, "id")).map((listItem:any) => (
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
                <Avatar size="sm">{listItem?.id}</Avatar>
              </ListItemDecorator>
              <div>
                <Typography fontWeight={600} gutterBottom>
                  {listItem?.roleName}
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <RowMenu
                      row={listItem}
                      open={props.open}
                      setOpen={props.setOpen}
                      label={props.label}
                      setRow={props.setRow}
                      setLabel={props.setLabel}
                      parentFunction={HandleDeleteFunction}
                    />
                </Box>
              </div>
            </ListItemContent>
            <Chip
              variant="soft"
              size="sm"
              startDecorator={listItem?.statusMaster?.statusName === 'ACTIVE' ? <CheckRoundedIcon /> : listItem?.statusMaster?.statusName === 'PENDING' ? <AutorenewIcon /> : <BlockIcon />}
              color={listItem?.statusMaster?.statusName === 'ACTIVE' ? 'success' : listItem?.statusMaster?.statusName === 'PENDING' ? 'neutral' : 'danger'}
            >
              {listItem?.statusMaster?.statusName}
            </Chip>
          </ListItem>
          <ListDivider />
        </List>
      ))}
     
    </Box>
  );
}
