"use client";
import * as React from 'react';
import { Sheet, Input,IconButton,Modal, ModalDialog,
    Typography, ModalClose,
    Divider,
    Button,
    Box,
    FormControl,
    FormLabel,
    Table,
    Link,
    Chip,
    Select,
    Option,
    iconButtonClasses
 } from '@mui/joy';

import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import BlockIcon from '@mui/icons-material/Block';
import AutorenewRoundedIcon from '@mui/icons-material/AutorenewRounded';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

import RowMenu from '../../RowMenu';


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

interface TableSectionProops{
    tableHeaders : String[],
    tableRows: React.ReactNode[]

}

export default function TableSection(props:TableSectionProops){

    const [order, setOrder] = React.useState<Order>('desc');
    const [selected, setSelected] = React.useState<readonly string[]>([]);
    const [open, setOpen] = React.useState(false);
    const [rows, setRows] = React.useState();

    const headers = props.tableHeaders;
    const tableRows = props.tableRows;
    const id_index:number = headers.indexOf('id', 0);
    if (id_index > -1) {
        headers.splice(id_index, 1);
     }

    // const renderFilters = () => (
    //     <React.Fragment>
    //       <FormControl size="sm">
    //         <FormLabel>Status</FormLabel>
    //         <Select
    //           size="sm"
    //           placeholder="Filter by status"
    //           slotProps={{ button: { sx: { whiteSpace: 'nowrap' } } }}
    //         >
    //           <Option value="Active">Active</Option>
    //           <Option value="pending">Pending</Option>
    //           <Option value="Inactive">Inactive</Option>
    //         </Select>
    //       </FormControl>
    //       <FormControl size="sm">
    //         <FormLabel>Category</FormLabel>
    //         <Select size="sm" placeholder="All">
    //           <Option value="all">All</Option>
    //           <Option value="refund">Refund</Option>
    //           <Option value="purchase">Purchase</Option>
    //           <Option value="debit">Debit</Option>
    //         </Select>
    //       </FormControl>
    //       <FormControl size="sm">
    //         <FormLabel>Customer</FormLabel>
    //         <Select size="sm" placeholder="All">
    //           <Option value="all">All</Option>
    //           <Option value="olivia">Olivia Rhye</Option>
    //           <Option value="steve">Steve Hampton</Option>
    //           <Option value="ciaran">Ciaran Murray</Option>
    //           <Option value="marina">Marina Macdonald</Option>
    //           <Option value="charles">Charles Fulton</Option>
    //           <Option value="jay">Jay Hoper</Option>
    //         </Select>
    //       </FormControl>
    //     </React.Fragment>
    //   );
return (
    <React.Fragment>
    <Sheet
      className="SearchAndFilters-mobile"
      sx={{
        display: { xs: 'flex', sm: 'none' },
        my: 1,
        gap: 1,
      }}
    >
      <Input
        size="sm"
        placeholder="Search"
        startDecorator={<SearchIcon />}
        sx={{ flexGrow: 1 }}
      />
      <IconButton
        size="sm"
        variant="outlined"
        color="neutral"
        onClick={() => setOpen(true)}
      >
        <FilterAltIcon />
      </IconButton>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog aria-labelledby="filter-modal" layout="fullscreen">
          <ModalClose />
          <Typography id="filter-modal" level="h2">
            Filters
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Sheet sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {/* {renderFilters()} */}
            <Button color="primary" onClick={() => setOpen(false)}>
              Submit
            </Button>
          </Sheet>
        </ModalDialog>
      </Modal>
    </Sheet>
    <Box
      className="SearchAndFilters-tabletUp"
      sx={{
        borderRadius: 'sm',
        py: 2,
        display: { xs: 'none', sm: 'flex' },
        flexWrap: 'wrap',
        gap: 1.5,
        '& > *': {
          minWidth: { xs: '120px', md: '160px' },
        },
      }}
    >
      <FormControl sx={{ flex: 1 }} size="sm">
        <FormLabel>Search for tasks</FormLabel>
        <Input size="sm" placeholder="Search" startDecorator={<SearchIcon />} />
      </FormControl>
      {/* {renderFilters()} */}
    </Box>
    <Sheet
      className="OrderTableContainer"
      // variant="outlined"
      color={'neutral'}
      sx={{
        display: { xs: 'none', sm: 'initial' },
        width: '100%',
        borderRadius: 'sm',
        flexShrink: 1,
        overflow: 'auto',
        minHeight: 0,
      }}
    >
      <Table
        aria-labelledby="tableTitle"
        stickyHeader
        hoverRow
        sx={{
          '--TableCell-headBackground': 'var(--joy-palette-background-level3)',
          '--Table-headerUnderlineThickness': '1px',
          '--TableRow-hoverBackground': 'var(--joy-palette-background-level1)',
          '--TableCell-paddingY': '4px',
          '--TableCell-paddingX': '8px',
        }}
      >
        <thead>
          <tr key="head">
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
                ID
              </Link>
            </th>
            {headers && headers.map((head, i)=>(
                <th key={i} style={{ width: 140, padding: '12px 6px' }} >{head}</th>
            ))}
      
            <th style={{ width: 140, padding: '12px 6px' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* {rows && stableSort(rows, getComparator(order, 'id')).map((row:any) => (
            <tr key={row?.id}>
              <td>
                <Typography level="body-xs">{row?.id}</Typography>
              </td>
              <td>
                <Typography level="body-xs">{row?.departments.departmentName}</Typography>
              </td>
              <td>
                <Typography level="body-xs">{row?.sheetMaster.sheetName}</Typography>
              </td>
              <td>
              <Chip
                  variant="soft"
                  size="sm"
                  startDecorator={row.status === 'ACTIVE' ? <CheckRoundedIcon /> : row.role.roleName === 'Data Entry' ? <AutorenewRoundedIcon /> : <BlockIcon />}
                  color={row.role.roleName === 'ACTIVE' ? 'success' : row.role.roleName === 'Data Entry' ? 'success' : 'danger'}
                >
                  {row.role.roleName}
                </Chip>
              </td>
             
              <td>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                  
                  <RowMenu sheetid={row.sheetMaster.id} />
                </Box>
              </td>
            </tr>
          ))} */}
          {
            tableRows && tableRows.map((EachRowReactElement)=>(<>{EachRowReactElement}</>))
          }
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
)
}