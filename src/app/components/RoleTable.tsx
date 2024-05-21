"use client";

/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import Box from '@mui/joy/Box';
import Chip from '@mui/joy/Chip';
import Typography from '@mui/joy/Typography';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import BlockIcon from '@mui/icons-material/Block';
import AutorenewRoundedIcon from '@mui/icons-material/AutorenewRounded';

import RowMenu from "./RowMenu";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../Store/store";
import { useRouter } from "next/navigation";
import { deleterole } from "@/app/Reducers/DeleteRoleSlice";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TableSection from './Common/TableSection';
import {stableSort, getComparator} from '@/app/helper/sorting';
import { useAuth } from '../hooks/useAuth';

type Order = "asc" | "desc";

export default function RoleTable(props: any) {
  const [order, setOrder] = React.useState<Order>("desc");
  const [rows, setRows] = React.useState([
    { id: "", roleName: "", roleStatus: "", permission: "", action :"" },
  ]);

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


  // const data = await getData()
  const auth = useAuth();
  React.useEffect(() => {
    const getData = async () => {
      try {
         
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/roles/get`, {
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

        setRows(data.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    getData();

  }, [createrole, deleteroles, editrole])


  const headers = [ "Role Name", "Role Status", "Permisson"];

  const tablerows = stableSort(rows, getComparator(order, "id")).map(
    (row: any) => (
      <tr key={row?.id}>
                <td>
                  <Typography level="body-xs">{row?.id}</Typography>
                </td>
                <td>
                  <Typography level="body-xs">{row?.roleName}</Typography>
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
                  <Typography level="body-xs">{row?.permissionId}</Typography>
                </td>

                <td>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>

                    <RowMenu
              row={row}
              open={props.open}
              setOpen={props.setOpen}
              label={props.label}
              setRow={props.setRow}
              setLabel={props.setLabel}
              parentFunction={HandleDeleteFunction}
            />
                  </Box>
                </td>
              </tr>
    )
  );


  return (
    <React.Fragment>
      <TableSection tableHeaders={headers} tableRows={tablerows} />
    </React.Fragment>
  );
}
