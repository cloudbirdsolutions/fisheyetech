"use client";

/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from "react";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import TableSection from "../Common/TableSection";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../Store/store";
import { useRouter } from "next/navigation";
import { deletedepartment } from "@/app/Reducers/DeleteDepartmentSlice";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {stableSort, getComparator} from '@/app/helper/sorting';
import Button from "@mui/joy/Button/Button";


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

  const createdepartment = useSelector(
    (state: any) => state?.createdepartments?.data
  );
  const deletedepartments = useSelector(
    (state: any) => state?.deletedepartments?.data
  );
  const editdepartment = useSelector(
    (state: any) => state?.editdepartments?.data
  );

  const childRef = React.useRef(null);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  interface ActionProps {
    docId:number
  }

  async function resolvefn(docId:number) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/sheetdocid/forcecomplete`,
      {
        // const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/departments/get`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body : JSON.stringify({docId})
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      toast.error(errorData.message)
    }
  }

  const RowMenu = (props:ActionProps) => {
    return <Button onClick={()=>{resolvefn(props.docId)}} color='success'>Resolve</Button>
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
  }, [createdepartment, deletedepartments, editdepartment]);

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
            <RowMenu docId={row?.id}/>
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