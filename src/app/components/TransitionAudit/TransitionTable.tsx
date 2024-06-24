"use client";

/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from "react";
import Box from "@mui/joy/Box";
import Chip from "@mui/joy/Chip";
import Typography from "@mui/joy/Typography";

import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import BlockIcon from "@mui/icons-material/Block";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";

import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TableSection from "@/app/components/Common/TableSection";
import { stableSort, getComparator } from "@/app/helper/sorting";
import { useAuth } from "@/app/hooks/useAuth";
import { TransitionAudit } from "@/app/types";

type Order = "asc" | "desc";

interface TransitionAuditProps {
  transitionAudit: TransitionAudit[];
  docId: number;
}

const OrderTable: React.FC<TransitionAuditProps> = (
  props: TransitionAuditProps
) => {
  // const LogForm: React.FC<LogFormProps> = (props: LogFormProps) => {

  const [rows, setRows] = React.useState([
    { id: "", name: "", userName: "", status: "", password: "", action: "" },
  ]);

  const [order, setOrder] = React.useState<Order>("desc");

  const router = useRouter();
  console.log(props.transitionAudit);

  const auth = useAuth();

  React.useEffect(() => {
    // setRows(props.transitionAudit);
    // const getData = async () => {
    //   try {
    //     const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/transitionaudit?docId=${props.docId}`, {
    //       method: 'GET',
    //       headers: {
    //         Accept: "application/json",
    //         'Content-Type': 'application/json',
    //         Authorization: "Bearer "  + auth,
    //       }
    //     });
    //     if (!response.ok) {
    //       const errorData = await response.json();
    //       toast.error(errorData.message)
    //     }
    //     const data = await response.json();
    //     setRows(data.data);
    //   } catch (error) {
    //     console.error('Error fetching user details:', error);
    //   }
    // };
    // getData();
  }, []);

  const headers = [
    "Document ID",
    "Shift Type",
    "Transition Name",
    "Updated By",
    "Updated Date",
  ];

  const tablerows = stableSort(
    props.transitionAudit,
    getComparator(order, "id")
  ).map((row: any) => (
    <tr key={row?.id}>
      <td>
        <Typography level="body-xs">{row?.id}</Typography>
      </td>
      <td>
        <Typography level="body-xs">{row?.docId}</Typography>
      </td>
      <td>
        <Typography level="body-xs">{row?.shiftMaster?.shiftType}</Typography>
      </td>
      <td>
        <Typography level="body-xs">
          {row?.transitionMaster?.transitionName}
        </Typography>
      </td>
      <td>
        <Typography level="body-xs">{row?.users?.name}</Typography>
      </td>
      <td>
        <Typography level="body-xs">{row?.createdAt}</Typography>
      </td>
    </tr>
  ));

  return (
    <TableSection tableHeaders={headers} tableRows={tablerows} action={false} />
  );
};

export default OrderTable;
