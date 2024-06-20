import UserList from "@/app/components/Users/UserList";
import {useEffect, useState} from "react";
import {FilterItem, User} from "@/app/types";
import {useApi} from "@/app/api/hooks/useApi";
import {handleAction} from "next/dist/server/app-render/action-handler";
import {SearchComponent} from "@/app/components/Common/search";
import SearchIcon from "@mui/icons-material/Search";
import * as React from "react";
import {end} from "@popperjs/core";


interface UsersProps {

    actions? : React.FC,
    handleFunction : Function

}

export default function Users(props:UsersProps) {

    const [endPoint, setEndPoint] = React.useState<string>('/users/get');
    const {data,isLoading,error, fetchData} = useApi<User>(endPoint,{method:'GET'})
    const userFilterItems:FilterItem[] = [
        {
            searchLabel : 'Search',
            filterType : 'INPUT',
            handleChange : (value:string)=>{
                setEndPoint(`/users/get?name=${value}`);
            },
            placeholder : "Search user by name",
            startDecoration : <SearchIcon/>
        }
    ]
    useEffect(() => {
        fetchData();

    }, [endPoint]);


    return <>
        <SearchComponent filterItems={userFilterItems}/>
        { (data&& data.length > 0) ?
            <UserList users={data} actions={props.actions} handleFunciton={props.handleFunction}/>
        :<>No Data Found</>}
        </>



}