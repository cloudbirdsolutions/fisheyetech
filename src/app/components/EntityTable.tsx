"use client";

/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';

import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import TableSection from './Common/TableSection';
import RowMenu from './RowMenu';



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

export default function EntityTable(props:any) {
  const [order, setOrder] = React.useState<Order>('desc');
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [open, setOpen] = React.useState(false);
  const [rows, setRows] = React.useState([{id:"",createdAt:"",updatedAt:"",departmentName: ""}]);
  
  

  // const data = await getData()
  React.useEffect(() => {
    const getData = async () => {
      try {
         
        const response = await fetch('http://51.79.147.139:3000/sheetMaster/get', {
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

  }, [])

  const headers = ["Sheet Name"];

  const tablerows =  stableSort(rows, getComparator(order, 'id')).map((row:any) => (
    <tr key={row?.id}>
      <td>
        <Typography level="body-xs">{row?.id}</Typography>
      </td>
      <td>
        <Typography level="body-xs">{row?.sheetName}</Typography>
      </td>
      
      <td>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          
          <RowMenu row={row} open={props.open} setOpen={props.setOpen} label={props.label} setRow={props.setRow} setLabel={props.setLabel}/>
        </Box>
      </td>
    </tr>
  ))
 
  return (

        <TableSection tableHeaders={headers} tableRows={tablerows}/>

  );
}
