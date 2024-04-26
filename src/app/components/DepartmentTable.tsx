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

2;
export default function DepartmentTable(props: any) {
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
    try {
      // const userData = Object.fromEntries();

      dispatch(deletedepartment(id)).then(() => {
        router.push("/departmentlist");
      });
    } catch (error) {
      console.error("Failed to Delete user:", error);
      // Handle error (e.g., display error message)
    }
  };

  // const data = await getData()
  React.useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(
          `http://51.79.147.139:3000/departments/get`,
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
  }, [createdepartment, deletedepartments, editdepartment]);

  const headers = ["Department"];

  const tablerows = stableSort(rows, getComparator(order, "id")).map(
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

  return <TableSection tableHeaders={headers} tableRows={tablerows} />;
}
