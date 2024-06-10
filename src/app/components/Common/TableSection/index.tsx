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
    // Chip,
    // Select,
    // Option,
    // iconButtonClasses
 } from '@mui/joy';

import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { SearchComponent } from '../../search';
// import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
// import BlockIcon from '@mui/icons-material/Block';
// import AutorenewRoundedIcon from '@mui/icons-material/AutorenewRounded';
// import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
// import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

// import RowMenu from '../../RowMenu';


type Order = 'asc' | 'desc';


interface TableSectionProps {
    action?: Boolean,
    tableHeaders: String[],
    tableRows: React.ReactNode[]

}

export default function TableSection(props:TableSectionProps){

    const [order, setOrder] = React.useState<Order>('desc');
    const [open, setOpen] = React.useState(false);

    const headers = props.tableHeaders;
    const tableRows = props.tableRows;
    const id_index:number = headers.indexOf('id', 0);
    if (id_index > -1) {
        headers.splice(id_index, 1);
     }

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
    {/* <Sheet variant='outlined' sx={{borderRadius: 'sm', width:'100%'}}>
    <Box
      className="SearchAndFilters-tabletUp"
      sx={{
        backgroundColor : 'var(--joy-palette-primary-100)',
        borderRadius: 'sm',
        px:2,
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
        <FormLabel sx={{fontSize:'12'}}>Search</FormLabel>
        <Input size="sm" placeholder="Search" startDecorator={<SearchIcon />} />
      </FormControl>
      {/* {renderFilters()} */}
   {/* </Box>
    </Sheet> */}
    <SearchComponent/>
    <Sheet
      className="OrderTableContainer"
      variant="outlined"
      color={'neutral'}
      sx={{
        display: { xs: 'none', sm: 'initial' },
        width: '100%',
        borderRadius: 'sm',
        flexShrink: 1,
        maxHeight: '60vh', overflow: 'auto' 
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
          <tr key="head">
            <th style={{ padding: '12px 6px' }}>
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
                <th key={i} style={{ padding: '12px 6px' }} >{head}</th>
            ))}

              {props.action && <th style={{padding: '12px 6px'}}>Action</th>}
          </tr>
        </thead>
        <tbody>
          {
            tableRows && tableRows?.map((EachRowReactElement, i)=>(
              <React.Fragment key={i}>
              {EachRowReactElement}
              </React.Fragment>
            ))
          }
          {
            tableRows.length === 0 ? (
            <tr>
              <td>
                No data Found
              </td>
            </tr>
            ) : ('')
          }
        </tbody>
      </Table>
    </Sheet>
    {/*<Box
      className="Pagination-laptopUp"
      sx={{
        pt: 2,
        gap: 1,
        [& .${iconButtonClasses.root}]: { borderRadius: '50%' },
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
    */}   
  </React.Fragment>
)
}