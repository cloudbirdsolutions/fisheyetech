import {useApi} from './useApi'
import {UserJob} from "@/app/types";
import {useCallback, useEffect, useState} from "react";


interface UserJobListProps {
    userId: number
}
export default function useUserJobList(props:UserJobListProps) {

    const url =`/joballocation/get-user-jobs?id=${props.userId}`

    const {data:userJobList,isLoading,error, fetchData} = useApi<UserJob>(`${url}`,{method:'GET'})

    const fetchUserJobList =  useCallback(() => {
        fetchData()
    }, []);

    return {userJobList, fetchUserJobList}
}