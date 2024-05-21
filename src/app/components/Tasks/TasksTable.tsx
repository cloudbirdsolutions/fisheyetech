"use client";

/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Chip from "@mui/joy/Chip";
import Typography from "@mui/joy/Typography";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import BlockIcon from "@mui/icons-material/Block";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";

import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { API_BASE_URL } from '@/app/config';
import { RootState } from "@/app/Store/store";
import { Stack, Tooltip } from "@mui/joy";
import TableSection from "../Common/TableSection";
import {stableSort, getComparator} from '@/app/helper/sorting';
import { useAuth } from "@/app/hooks/useAuth";
type Order = "asc" | "desc";

export default function TasksTable() {
  const [order, setOrder] = React.useState<Order>("desc");
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [open, setOpen] = React.useState(false);
  const [rows, setRows] = React.useState([
    {
      "id": 1,
      "users": {
        "userName": "Bharani1"
      },
      "departments": {
        "id": 1,
        "createdAt": "2024-04-20T08:20:59.096Z",
        "updatedAt": "2024-04-20T08:20:59.096Z",
        "departmentName": "CHP"
      },
      "permissionType": {
        "id": 1,
        "createdAt": "2024-04-20T08:38:18.589Z",
        "updatedAt": "2024-04-20T08:38:18.589Z",
        "permissionType": "Operator"
      },
      "sheetMaster": {
        "id": 1,
        "createdAt": "2024-04-20T08:04:49.113Z",
        "updatedAt": "2024-04-20T08:04:49.113Z",
        "sheetName": "AUTOMOBILE CHECKLIST & DAILY MAINTENANCE REPORT",
        "description": ""
      }
    }
  ]);

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
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/remarks/get-user-remarks?userId=${logintype.data.id}`, {
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
      return data
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  }
  const getDepartmentsByUser = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/joballocation/get-user-departments?userId=${logintype.data.id}`, {
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
      return data
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  }
 
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
const auth = useAuth();
  // const data = await getData()
  React.useEffect(() => {
    const getData = async () => {
      try {

        const url = [2,3].includes(logintype.data.rolesId) ? `${process.env.NEXT_PUBLIC_API_HOST}/joballocation/get-all-jobs` : `${process.env.NEXT_PUBLIC_API_HOST}/joballocation/get-user-jobs?id=${logintype.data.id}`
        // const url = `http://51.79.147.139:3000/joballocation/get-user-jobs?id=${logintype.data.id}`
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer "  + auth,
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
      setDepartmentRemark(depRem?.data)
      setDepartmentList(departments?.data) 
    }

    fetchRemarks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const headers = ["Department", "Entity", "Permission", "Assigned To"]
  const tablerows =  stableSort(rows, getComparator(order, "id")).map((row: any) => (
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
  ))

  return (
    <TableSection tableHeaders={headers} tableRows={tablerows} action={true}/>
  );
}
