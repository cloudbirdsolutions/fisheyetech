"use client";

/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Chip from '@mui/joy/Chip';
import Link from '@mui/joy/Link';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import IconButton, { iconButtonClasses } from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import BlockIcon from '@mui/icons-material/Block';
import AutorenewRoundedIcon from '@mui/icons-material/AutorenewRounded';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

import RowMenu from "./RowMenu";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../Store/store";
import { useRouter } from "next/navigation";
import { deleterole } from "@/app/Reducers/DeleteRoleSlice";

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


export default function RoleTable(props: any) {
  const [order, setOrder] = React.useState<Order>("desc");
  const [rows, setRows] = React.useState(null!);

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

      dispatch(deleterole(id)).then(() => {
        router.push("/rolelist");
      });
    } catch (error) {
      console.error("Failed to Delete user:", error);
      // Handle error (e.g., display error message)
    }
  };


  // const data = await getData()
  React.useEffect(() => {
    const getData = async () => {
      try {
         
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/roles/get`, {
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

  }, [createrole, deleteroles, editrole])

  return (
    <React.Fragment>
      
      <Sheet
        className="RowTableContainer"
        variant="outlined"
        sx={{
          display: { xs: 'none', sm: 'initial' },
          width: '100%',
          borderRadius: 'sm',
          flexShrink: 1,
          maxHeight: '60vh', overflow: 'auto' ,
         
        }}
      >
        <Table
          aria-labelledby="tableTitle"
          stickyHeader
          hoverRow
          sx={{
            '--TableCell-headBackground': 'var(--joy-palette-primary-800)',
            '--Table-headerUnderlineThickness': '1px',
            '--TableRow-hoverBackground': 'var(--joy-palette-background-level1)',
            '--TableCell-paddingY': '4px',
            '--TableCell-paddingX': '8px',
            '& th ': {color:"white"},
            backgroundColor : 'var(--joy-palette-primary-50)'
          }}
        >
          <thead>
            <tr>
              <th style={{ width: 80, padding: '12px 6px' }}>
                <Link
                  underline="none"
                  color="primary"
                  component="button"
                  onClick={() => setOrder(order === 'asc' ? 'desc' : 'asc')}
                  fontWeight="lg"
                  endDecorator={<ArrowDropDownIcon />}
                  sx={{
                    '& svg': {
                      transition: '0.2s',
                      transform:
                        order === 'desc' ? 'rotate(0deg)' : 'rotate(180deg)',
                    },
                  }}
                >
                  S.No
                </Link>
              </th>
              <th style={{ width: 140, padding: '12px 6px' }}>Role Name</th>
              <th style={{ width: 140, padding: '12px 6px' }}>Role Status</th>
              <th style={{ width: 140, padding: '12px 6px' }}>permission</th>
              <th style={{ width: 140, padding: '12px 6px' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {rows && stableSort(rows, getComparator(order, 'id')).map((row: any) => (
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
            ))}
          </tbody>
        </Table>
      </Sheet>
      <Box
        className="Pagination-laptopUp"
        sx={{
          pt: 2,
          gap: 1,
          [`& .${iconButtonClasses.root}`]: { borderRadius: '50%' },
          display: {
            xs: 'none',
            md: 'flex',
          },
        }}
      >
        <Button
          size="sm"
          variant="outlined"
          color="neutral"
          startDecorator={<KeyboardArrowLeftIcon />}
        >
          Previous
        </Button>

        <Box sx={{ flex: 1 }} />
        {['1', '2', '3', '…', '8', '9', '10'].map((page) => (
          <IconButton
            key={page}
            size="sm"
            variant={Number(page) ? 'outlined' : 'plain'}
            color="neutral"
          >
            {page}
          </IconButton>
        ))}
        <Box sx={{ flex: 1 }} />

        <Button
          size="sm"
          variant="outlined"
          color="neutral"
          endDecorator={<KeyboardArrowRightIcon />}
        >
          Next
        </Button>
      </Box>
    </React.Fragment>
  );
}
