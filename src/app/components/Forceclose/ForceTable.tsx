"use client";

/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from "react";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import TableSection from "../Common/TableSection";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../Store/store";
import { useRouter } from "next/navigation";
import 'react-toastify/dist/ReactToastify.css';
import {stableSort, getComparator} from '@/app/helper/sorting';
import Button from "@mui/joy/Button/Button";
import { toast } from "react-toastify";


type Order = "asc" | "desc";

export default function DepartmentTable(props: any) {
  const [order, setOrder] = React.useState<Order>("desc");
  const [rows, setRows] = React.useState([
    {
      "id": 0,
      "createdAt": "",
      "updatedAt": "",
      "sheetId": 0,
      "userId": 0,
      "transitionId": 0,
      "sheetMaster": {
          "sheetName": ""
      },
      "users": {
          "userName": ""
      }
  },
  ]);


  function remarksfn(row: any): void {
    props.setOpen(true);
    props.setLabel('Edit');
    props.setRow(row);
  }

   const RowMenu = (props:any) => {
    return <Button onClick={()=>{remarksfn(props.row)}} color='success'>Resolve</Button>
  }

  // const data = await getData()
  React.useEffect(() => {
    const getData = async () => {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_HOST}/sheetdocid/forcecomplete`,
          {
            // const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/departments/get`, {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          toast.error(errorData.message)
        }

        const data = await response.json();
       //toast.success(data.message)
        setRows(data.data);
    }

    getData();
  }, []);

  const headers = ["Sheet Name", "Created By"];

  const tablerows = stableSort(rows, getComparator(order, "id")).map(
    (row: any) => (
      <tr key={row?.id}>
        <td>
          <Typography level="body-xs">{row?.id}</Typography>
        </td>
        <td>
          <Typography level="body-xs">{row?.sheetMaster.sheetName}</Typography>
        </td>
        <td>
          <Typography level="body-xs">{row?.users.userName}</Typography>
        </td>

        <td>
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <RowMenu row={row}/>
          </Box>
        </td>
      </tr>
    )
  );

  return (
  <>
  <TableSection tableHeaders={headers} tableRows={tablerows} />
  </>
  )
}