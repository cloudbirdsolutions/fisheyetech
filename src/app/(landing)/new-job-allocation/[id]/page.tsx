'use client';
import Typography from "@mui/joy/Typography";
import UserJob from "@/app/components/NewJobAllocation/UserJob";
import AddUserJob from "@/app/components/NewJobAllocation/AddUserJob";
import {useCallback, useEffect, useReducer, useState} from "react";


export default function UserJobAllocation({params}: { params: { id: string } }) {

    return (<>
        <AddUserJob id={params.id} ></AddUserJob>
        <UserJob id={params.id}></UserJob>
        </>)

}