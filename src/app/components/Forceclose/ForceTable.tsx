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
import { useAuth } from "@/app/hooks/useAuth";
import { ForceCloseSheet } from "@/app/types";


type Order = "asc" | "desc";

interface ForceSheetTableProps {
  open:boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  label:string;
  setLabel:React.Dispatch<React.SetStateAction<string>>;
  setRow:React.Dispatch<(prevState: never) => never>;
  sheetList:ForceCloseSheet[];
  fetchSheets:Function;
  setAction:React.Dispatch<React.SetStateAction<string>>;
}

export default function DepartmentTable(props: ForceSheetTableProps) {
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


  function remarksfn(row: any,action:string): void {
    props.setOpen(true);
    props.setLabel('Edit');
    props.setRow(row);
    props.setAction(action)
  }

   const RowMenu = (props:any) => {
    return (<><Button onClick={()=>{remarksfn(props.row,"forcecomplete")}} color='success'>Resolve</Button>
    <Button onClick={()=>{remarksfn(props.row,"forcedraft")}} color='primary'>Reopen</Button></>)
  }

  // const data = await getData()
  const auth = useAuth();
  React.useEffect(() => {
    props.fetchSheets()
    // const getData = async () => {
    //     const response = await fetch(
    //       `${process.env.NEXT_PUBLIC_API_HOST}/sheetdocid/forcecomplete`,
    //       {
    //         // const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/departments/get`, {
    //         method: "GET",
    //         headers: {
    //           Accept: "application/json",
    //           "Content-Type": "application/json",
    //           Authorization: "Bearer "  + auth,
    //         },
    //       }
    //     );

    //     if (!response.ok) {
    //       const errorData = await response.json();
    //       toast.error(errorData.message)
    //     }

    //     const data = await response.json();
    //    //toast.success(data.message)
    //     setRows(data.data);
    // }

    // getData();
  }, []);

  const headers = ["Sheet Name", "Created By"];

  const tablerows = stableSort(props.sheetList, getComparator(order, "id")).map(
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
  <TableSection tableHeaders={headers} tableRows={tablerows} action={true}/>
  </>
  )
}