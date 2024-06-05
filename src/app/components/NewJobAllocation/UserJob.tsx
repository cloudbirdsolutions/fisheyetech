import {useEffect, useState} from "react";
import {UserJob} from "@/app/types";
import {useApi} from "@/app/api/hooks/useApi";
import UserJobList from "./UserJobList";




interface UserJobProps {
    id:string
}

export default function UserJobComponent(props:UserJobProps) {

    const {data,isLoading,error, fetchData} = useApi<UserJob>(`/joballocation/get-user-jobs?id=${parseInt(props.id)}`,{method:'GET'})

    useEffect(() => {
        fetchData();

    }, []);


    return <>
        {data && <UserJobList userJobs={data}></UserJobList>}
    </>


}