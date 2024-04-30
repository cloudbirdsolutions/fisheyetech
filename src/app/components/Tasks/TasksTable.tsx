"use client";

/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from "react";
import { ColorPaletteProp } from "@mui/joy/styles";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Chip from "@mui/joy/Chip";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Link from "@mui/joy/Link";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import ModalClose from "@mui/joy/ModalClose";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Table from "@mui/joy/Table";
import Sheet from "@mui/joy/Sheet";
import Checkbox from "@mui/joy/Checkbox";
import IconButton, { iconButtonClasses } from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import Dropdown from "@mui/joy/Dropdown";
import AssignmentIcon from "@mui/icons-material/Assignment";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import BlockIcon from "@mui/icons-material/Block";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";

import Add from "@mui/icons-material/Add";

import { useRouter } from "next/navigation";

import { useSelector } from "react-redux";

import { API_BASE_URL } from '@/app/config';
import { RootState } from "@/app/Store/store";
import { Stack, Tooltip } from "@mui/joy";
import TableSection from "../Common/TableSection";






function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
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

// function RowMenu() {
//   return (
//     <Button color="success" variant="solid" size='sm' startDecorator={<Add />} onClick={() => router.push('/dashboard')} >
//   Record Data
// </Button>
//   );
// }



export default function TasksTable() {
  const [order, setOrder] = React.useState<Order>("desc");
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [open, setOpen] = React.useState(false);
  const [rows, setRows] = React.useState();

  const [userRemarks, setUserRemarks] = React.useState('');


  const [departmentRemarks, setDepartmentRemark] = React.useState([
    {
      "id": 1,
      "createdAt": "",
      "updatedAt": "",
      "createdBy": 1,
      "departmentId": 1,
      "remarks": "",
      "departments": {
        "id": 1,
        "createdAt": "",
        "updatedAt": "",
        "departmentName": ""
      }
    }
  ])

  const [remarksDepartment, setRemarksDepartment] = React.useState(0);

  const [departmentList, setDepartmentList] = React.useState([
    {
        "departments": {
            "id": 1,
            "createdAt": "2024-04-20T08:20:59.096Z",
            "updatedAt": "2024-04-20T08:20:59.096Z",
            "departmentName": "CHP"
        }
    }
])

  const logintype = useSelector((state: RootState) => state?.user.data);


  const getRemarksByUser = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/remarks/get-user-remarks?userId=${logintype.data.id}`, {
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
      return data
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  }
  const getDepartmentsByUser = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/joballocation/get-user-departments?userId=${logintype.data.id}`, {
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
      return data
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  }
  const savedepartmentRemarks = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/remarks/create`, {
        method: 'POST',
        headers: {
          Accept: "application/json",
          'Content-Type': 'application/json',
        },
        body : JSON.stringify({departmentId:remarksDepartment,remarks:userRemarks,createdBy:logintype.data.id})
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user details: ' + response.statusText);
      }

      const data = await response.json();
      return data
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  }

  

  const followUpHeader = ["Department", "CreatedAt", "UpdatedAt", "Remarks", "Status"]

  const followUpRow = departmentRemarks.map(rem => (
    <tr key={`document_id_${rem.id}`}>
      <td><Typography level="body-xs">{rem?.id}</Typography></td>
      <td><Typography level="body-xs">{rem?.departments.departmentName}</Typography></td>
      <td><Typography level="body-xs">{rem?.createdAt}</Typography></td>
      <td><Typography level="body-xs">{rem?.updatedAt}</Typography></td>
      <td><Typography level="body-xs">{rem?.remarks}</Typography></td>
      <td><Typography level="body-xs">New</Typography></td>
    </tr>
  ))


  const RowMenu = (props: { sheetid: any; sheetName: any }) => {
    return (
      <Tooltip title="Documents" arrow color="primary" placement="right">
        <Button
          color="primary"
          variant="outlined"
          size="sm"
          onClick={() => router.push(`/tasks/sheet/${props.sheetid}`)}
        >
          {/* Documents */} <AssignmentIcon />
        </Button>
      </Tooltip>
    );
  };

  const router = useRouter();

  // const data = await getData()
  React.useEffect(() => {
    const getData = async () => {
      try {

        const url = [4].includes(logintype.data.rolesId) ? `${API_BASE_URL}/joballocation/get-all-jobs` : `${API_BASE_URL}/joballocation/get-user-jobs?id=${logintype.data.id}`
        // const url = `http://51.79.147.139:3000/joballocation/get-user-jobs?id=${logintype.data.id}`
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(
            "Failed to fetch user details: " + response.statusText
          );
        }

        const data = await response.json();

        setRows(data.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    getData();

    const fetchRemarks = async () => {
      let depRem = await getRemarksByUser()
      let departments = await getDepartmentsByUser()
      setDepartmentRemark(depRem.data)
      setDepartmentList(departments.data)
    }

    fetchRemarks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (
    event: React.SyntheticEvent | null,
    newValue: string | null,
  ) => {
   setRemarksDepartment(parseInt(newValue?newValue:"0"));
  };

  const renderFilters = () => (
    <React.Fragment>
      <FormControl size="sm">
        <FormLabel>Status</FormLabel>
        <Select
          size="sm"
          placeholder="Filter by status"
          slotProps={{ button: { sx: { whiteSpace: "nowrap" } } }}
        >
          <Option value="Active">Active</Option>
          <Option value="pending">Pending</Option>
          <Option value="Inactive">Inactive</Option>
        </Select>
      </FormControl>
      <FormControl size="sm">
        <FormLabel>Category</FormLabel>
        <Select size="sm" placeholder="All">
          <Option value="all">All</Option>
          <Option value="refund">Refund</Option>
          <Option value="purchase">Purchase</Option>
          <Option value="debit">Debit</Option>
        </Select>
      </FormControl>
      <FormControl size="sm">
        <FormLabel>Customer</FormLabel>
        <Select size="sm" placeholder="All">
          <Option value="all">All</Option>
          <Option value="olivia">Olivia Rhye</Option>
          <Option value="steve">Steve Hampton</Option>
          <Option value="ciaran">Ciaran Murray</Option>
          <Option value="marina">Marina Macdonald</Option>
          <Option value="charles">Charles Fulton</Option>
          <Option value="jay">Jay Hoper</Option>
        </Select>
      </FormControl>
    </React.Fragment>
  );
  return (
    <React.Fragment>
      <Sheet>
        <Stack direction={'row'} marginBottom={1}>
          <Typography level="h2">Follow Ups</Typography>

        </Stack>

        <Box margin={2}>
          {/* <Typography level="title-sm" >Add New Remarks</Typography> */}
          <Stack gap={2} >
          <FormControl orientation="horizontal">
            <FormLabel>Department</FormLabel>
            <Select placeholder="Select a department" onChange={handleChange}>
              {departmentList.map(dep=>(<Option value={dep.departments.id}>
                  {dep.departments.departmentName}
              </Option>))}
            </Select>
          </FormControl>
          <FormControl orientation="horizontal">
            <FormLabel>Remarks</FormLabel>
            <Input value={userRemarks} onChange={(e) => { setUserRemarks(e.target.value) }} ></Input>
            <Button variant="solid" sx={{ ml: 2 }} onClick={(e)=>{savedepartmentRemarks()}}>Add New Remarks</Button>
          </FormControl>
          
          </Stack>
        </Box>

        <TableSection tableHeaders={followUpHeader} tableRows={followUpRow} />
      </Sheet>
      <Divider sx={{ my: 2 }} />
      <Typography level="h2" component="h1">
        Tasks
      </Typography>
      <Sheet
        className="SearchAndFilters-mobile"
        sx={{
          display: { xs: "flex", sm: "none" },
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
            <Sheet sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {renderFilters()}
              <Button color="primary" onClick={() => setOpen(false)}>
                Submit
              </Button>
            </Sheet>
          </ModalDialog>
        </Modal>
      </Sheet>
<<<<<<< HEAD
      
      <Sheet  variant='outlined' sx={{borderRadius: 'sm'}}>
      <Box
        className="SearchAndFilters-tabletUp"
        sx={{
          backgroundColor : 'var(--joy-palette-primary-100)',
          borderRadius: 'sm',
          py: 2,
          px: 2,
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
=======
      <Sheet variant="outlined" sx={{ borderRadius: "sm" }}>
        <Box
          className="SearchAndFilters-tabletUp"
          sx={{
            backgroundColor: "var(--joy-palette-primary-100)",
            borderRadius: "sm",
            py: 2,
            px: 2,
            display: { xs: "none", sm: "flex" },
            flexWrap: "wrap",
            gap: 1.5,
            "& > *": {
              minWidth: { xs: "120px", md: "160px" },
            },
          }}
        >
          <FormControl sx={{ flex: 1 }} size="sm">
            <FormLabel>Search for tasks</FormLabel>
            <Input
              size="sm"
              placeholder="Search"
              startDecorator={<SearchIcon />}
            />
          </FormControl>

          {/* {renderFilters()} */}
        </Box>
>>>>>>> 1b14dd0d9d4fd980fd14fd72b4f6f34e84e70db0
      </Sheet>
      <Divider sx={{ my: 2 }} />
      <Sheet
        className="OrderTableContainer"
        // variant="outlined"
        color={"neutral"}
        sx={{
          display: { xs: "none", sm: "initial" },
          width: "100%",
          borderRadius: "sm",
          flexShrink: 1,
          overflow: "auto",
          minHeight: 0,
        }}
      >
        <Table
          aria-labelledby="tableTitle"
          stickyHeader
          hoverRow
          sx={{
            "--TableCell-headBackground": "var(--joy-palette-primary-800)",
            "--Table-headerUnderlineThickness": "1px",
            "--TableRow-hoverBackground":
              "var(--joy-palette-background-level1)",
            "--TableCell-paddingY": "4px",
            "--TableCell-paddingX": "8px",
            "& th ": { color: "white" },
            backgroundColor: "var(--joy-palette-primary-50)",
          }}
        >
          <thead>
            <tr>
              <th style={{ width: 80, padding: "12px 6px" }}>
                <Link
                  underline="none"
                  color="primary"
                  component="button"
                  onClick={() => setOrder(order === "asc" ? "desc" : "asc")}
                  fontWeight="lg"
                  endDecorator={<ArrowDropDownIcon />}
                  sx={{
                    "& svg": {
                      transition: "0.2s",
                      transform:
                        order === "desc" ? "rotate(0deg)" : "rotate(180deg)",
                    },
                  }}
                >
                  ID
                </Link>
              </th>
              <th style={{ width: 140, padding: "12px 6px" }}>Department</th>
              <th style={{ width: 140, padding: "12px 6px" }}>Entity</th>
              <th style={{ width: 140, padding: "12px 6px" }}>Permission</th>
              <th style={{ width: 140, padding: "12px 6px" }}>Assigned To</th>

              <th style={{ width: 140, padding: "12px 6px" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {rows &&
              stableSort(rows, getComparator(order, "id")).map((row: any) => (
                <tr key={row?.id}>
                  <td>
                    <Typography level="body-xs">{row?.id}</Typography>
                  </td>
                  <td>
                    <Typography level="body-xs">
                      {row?.departments.departmentName}
                    </Typography>
                  </td>
                  <td>
                    <Typography level="body-xs">
                      {row?.sheetMaster.sheetName}
                    </Typography>
                  </td>
                  <td>
                    <Chip
                      variant="soft"
                      size="sm"
                      startDecorator={
                        row.status === "ACTIVE" ? (
                          <CheckRoundedIcon />
                        ) : row.permissionType.permissionType === "Operator" ? (
                          <AutorenewRoundedIcon />
                        ) : (
                          <BlockIcon />
                        )
                      }
                      color={
                        row.permissionType.permissionType === "ACTIVE"
                          ? "success"
                          : row.permissionType.permissionType === "Operator"
                            ? "success"
                            : "danger"
                      }
                    >
                      {row.permissionType.permissionType}
                    </Chip>
                  </td>
                  <td>
                    <Typography level="body-xs">
                      {row?.users.userName}
                    </Typography>
                  </td>
                  <td>
                    <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                      <RowMenu
                        sheetid={row.sheetMaster.id}
                        sheetName={row.sheetMaster.sheetName}
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
          [`& .${iconButtonClasses.root}`]: { borderRadius: "50%" },
          display: {
            xs: "none",
            md: "flex",
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
        {["1", "2", "3", "…", "8", "9", "10"].map((page) => (
          <IconButton
            key={page}
            size="sm"
            variant={Number(page) ? "outlined" : "plain"}
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
