"use client";

/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from "react";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import TableSection from "./Common/TableSection";
import RowMenu from "./RowMenu";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../Store/store";
import { useRouter } from "next/navigation";
import { deletedepartment } from "@/app/Reducers/DeleteDepartmentSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { stableSort, getComparator } from "@/app/helper/sorting";
import { useAuth } from "../hooks/useAuth";
import {Department, User} from "@/app/types";

type Order = "asc" | "desc";

interface DepartmentTableProps {
  open:boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  label:string;
  setLabel:React.Dispatch<React.SetStateAction<string>>;
  setRow:React.Dispatch<(prevState: never) => never>;
  departmentList:Department[];
  fetchDepartments:Function;
}

export default function DepartmentTable(props: DepartmentTableProps) {
  const [order, setOrder] = React.useState<Order>("desc");
  const [rows, setRows] = React.useState([
    { id: "", createdAt: "", updatedAt: "", departmentName: "" },
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

  const HandleDeleteFunction = (id: any) => {
    dispatch(deletedepartment(id)).then((res) => {
      res.payload.statusCode == 200
        ? (toast.success(res.payload.message), router.push("/departmentlist"))
        : toast.error(res.payload.message);
    });
  };

  // const data = await getData()
  const auth = useAuth();
  React.useEffect(() => {
    props.fetchDepartments();

  }, [createdepartment, deletedepartments, editdepartment]);

  const headers = ["Department"];

  const tablerows = stableSort(props.departmentList, getComparator(order, "id")).map(
    (row: any) => (
      <tr key={row?.id}>
        <td>
          <Typography level="body-xs">{row?.id}</Typography>
        </td>
        <td>
          <Typography level="body-xs">{row?.departmentName}</Typography>
        </td>

        <td>
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <RowMenu
              row={row}
              open={props.open}
              setOpen={props.setOpen}
              label={props.label}
              setRow={props.setRow}
              setLabel={props.setLabel}
              parentFunction={HandleDeleteFunction}
            />
          </Box>
        </td>
      </tr>
    )
  );

  return (
    <>
      <TableSection tableHeaders={headers} tableRows={tablerows} action={true} />
    </>
  );
}
