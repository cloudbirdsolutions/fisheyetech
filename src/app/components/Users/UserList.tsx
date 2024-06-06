import {User} from "@/app/types";
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
    users : User[],
    actions? : React.FC,
    handleFunciton : Function
}

interface DefaultCompProps {
    onClick : Function
}

type Order = "asc" | "desc";


export default function  UserList(props: UserListProps)  {

    const [order, setOrder] = React.useState<Order>("desc");
    const headers = [ "Name"];

    const DefaultComp = (props:DefaultCompProps)=>{
        return (<></>)
    }

    const UserAction = props.actions || DefaultComp
    
    const tableRows = stableSort(props.users, getComparator(order, "id")).map(
        (row: any) => (
            <tr key={row?.id}>
                <td>
                    <Typography level="body-xs">{row?.id}</Typography>
                </td>
                <td>
                    <Typography level="body-xs">{row?.name}</Typography>
                </td>
                <td>
                <Button size={'sm'} onClick={()=>props.handleFunciton(row.id)}>Allocate Job</Button>
                </td>
            </tr>
        )
    );



    return ( <TableSection tableHeaders={headers} tableRows={tableRows} action={true} />)
}