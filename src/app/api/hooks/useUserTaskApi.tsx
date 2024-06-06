import {useApi} from './useApi'
import {UserJob} from "@/app/types";
import {useCallback, useEffect, useState} from "react";
import { useSelector } from 'react-redux';
import { RootState } from "@/app/Store/store";


interface UserJobListProps {
    userId: number
}
export default function useUserTaskApi(props:UserJobListProps) {

    const logintype = useSelector((state: RootState) => state?.user.data);
    const url = [2,3].includes(logintype.data.rolesId) ? `/joballocation/get-all-jobs` : `/joballocation/get-user-jobs?id=${logintype.data.id}`


    const {data:userJobList,isLoading,error, fetchData} = useApi<UserJob>(`${url}`,{method:'GET'})

    useEffect(() => {
        fetchData()
    }, []);

    return {userJobList, fetchData}
}