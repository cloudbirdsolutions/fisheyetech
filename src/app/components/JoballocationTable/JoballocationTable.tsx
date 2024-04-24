"use client";

/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';

import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import TableSection from '../Common/TableSection';
import Button from '@mui/joy/Button';
import IconButton from '@mui/joy/IconButton/IconButton';
import Chip from '@mui/joy/Chip';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import BlockIcon from '@mui/icons-material/Block';
import AutorenewRoundedIcon from '@mui/icons-material/AutorenewRounded';
import ListPermission from './ListPermission';
import Link from '@mui/joy/Link';



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

export default function JoballocationTable() {
  const [order, setOrder] = React.useState<Order>('desc');
  const [rows, setRows] = React.useState([{id:"",createdAt:"",updatedAt:"",userName: "", statusName:''}]);
  
  const [listsec, setListsec] = React.useState(false);
  const [selectedrow, setSelectedRow] = React.useState();

  // const data = await getData()
  React.useEffect(() => {
    const getData = async () => {
      try {
         
        const response = await fetch('http://51.79.147.139:3000/users/get', {
          method: 'GET',
          headers: {
            Accept : "application/json",
            'Content-Type': 'application/json',
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

  }, []);
  const jobs = React.useCallback((row:any) => {
    setListsec(true)
      setSelectedRow(row);
  }, [])


  

  const headers = ["Name", "Status"];

  const tablerows =  stableSort(rows, getComparator(order, 'id')).map((row:any) => (
    <tr key={row?.id}>
      <td>
        <Typography level="body-xs">{row?.id}</Typography>
      </td>
      <td>
        <Typography level="body-xs">{row?.name}</Typography>
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
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>          
         <Button onClick={() => jobs(row)}> Allocate Job</Button>
        </Box>
      </td>
    </tr>
  ))
 
  return (

        <>
        {listsec === false && <TableSection tableHeaders={headers} tableRows={tablerows} /> }
        {listsec === true && <ListPermission selectedrows={selectedrow}/> }
        </>

  );
}
