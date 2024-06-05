import UserList from "@/app/components/Users/UserList";
import {useEffect, useState} from "react";
import {User} from "@/app/types";
import {useApi} from "@/app/api/hooks/useApi";
import {handleAction} from "next/dist/server/app-render/action-handler";


interface UsersProps {

    actions? : React.FC,
    handleFunction : Function

}

export default function Users(props:UsersProps) {

    const {data,isLoading,error, fetchData} = useApi<User>('/users/get',{method:'GET'})

    useEffect(() => {
        fetchData();

    }, []);


    return <>
        { (data&& data.length > 0) && <UserList users={data} actions={props.actions} handleFunciton={props.handleFunction}/>}
    </>


}