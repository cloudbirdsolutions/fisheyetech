'use client';
import Typography from "@mui/joy/Typography";
import UserJob from "@/app/components/NewJobAllocation/UserJob";
import AddUserJob from "@/app/components/NewJobAllocation/AddUserJob";
import {useCallback, useEffect, useReducer, useState} from "react";
import useUserJobList from "@/app/api/hooks/useUserJobList";
import UserJobList from "@/app/components/NewJobAllocation/UserJobList";


export default function UserJobAllocation({params}: { params: { id: string } }) {

    const {userJobList, fetchUserJobList} = useUserJobList({userId:parseInt(params.id)});

    useEffect(() => {
        fetchUserJobList()
    }, [params.id]);


    return (<>
        <AddUserJob id={params.id} cb={fetchUserJobList} ></AddUserJob>
        {userJobList && <UserJobList userJobs={userJobList}></UserJobList>}
        </>)

}