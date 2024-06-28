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
import {UserJob} from "@/app/types";
import useUserTaskApi from "@/app/api/hooks/useUserTaskApi";
import {log} from "node:util";
type Order = "asc" | "desc";

interface TasksTableProps {
    userJobList : UserJob[]
}

export default function TasksTable(props:TasksTableProps) {
  const [order, setOrder] = React.useState<Order>("desc");
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [open, setOpen] = React.useState(false);

  const router = useRouter()


  const RowMenu = (props: { sheetid: any}) => {
    return (
        <Button
          color="primary"
          variant="outlined"
          size="sm"
          onClick={() => {

              router.push(`/tasks/sheet/${props.sheetid}`)
          }}

        >
          {/* Documents */} <AssignmentIcon />
        </Button>
    );
  };

  const auth = useAuth();
  // const data = await getData()


  const headers = ["Department", "Entity", "Shift","Designation", "Assigned To"]
  const tablerows =  stableSort(props.userJobList, getComparator(order, "id")).map((row: any) => (
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
        <Typography level="body-xs">
          {row?.shiftMaster?.shiftType}
        </Typography>
      </td>
      <td>
        <Typography level="body-xs">
          {row?.designationMaster?.designationName}
        </Typography>
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
            // sheetName={row.sheetMaster.sheetName}
          />
        </Box>
      </td>
    </tr>
  ))

  return (
    <TableSection tableHeaders={headers} tableRows={tablerows} action={true}/>
  );
}
