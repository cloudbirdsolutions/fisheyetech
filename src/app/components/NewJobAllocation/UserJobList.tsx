import {User, UserJob} from "@/app/types";
import {Typography} from "@mui/joy";
import {getComparator, stableSort} from "@/app/helper/sorting";
import Chip from "@mui/joy/Chip";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";
import BlockIcon from "@mui/icons-material/Block";
import Box from "@mui/joy/Box";
import RowMenu from "@/app/components/RowMenu";
import * as React from "react";
import TableSection from "@/app/components/Common/TableSection";
import Button from "@mui/joy/Button";


interface UserListProps {
    userJobs : UserJob[]
}

type Order = "asc" | "desc";


export default function  UserJobList(props: UserListProps)  {

    const [order, setOrder] = React.useState<Order>("desc");
    const headers = [ "Name", "Department", "Sheet", "Designation", "Shift" ];

    const tableRows = stableSort(props.userJobs, getComparator(order, "id")).map(
        (row: any) => (
            <tr key={row?.id}>
                <td><Typography level="body-xs">{row?.id}</Typography></td>
                <td><Typography level="body-xs">{row?.users?.userName}</Typography></td>
                <td><Typography level="body-xs">{row?.departments?.departmentName}</Typography></td>
                <td><Typography level="body-xs">{row?.sheetMaster?.sheetName}</Typography></td>
                <td><Typography level="body-xs">{row?.designationMaster?.designationName}</Typography></td>
                <td><Typography level="body-xs">{row?.shiftMaster?.shiftType}</Typography></td>
            </tr>
        )
    );


    
    return (<TableSection tableHeaders={headers} tableRows={tableRows} action={false} />)
}