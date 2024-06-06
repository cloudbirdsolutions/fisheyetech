import UserJobList from "./UserJobList";
import useUserJobList from "@/app/api/hooks/useUserJobList";
import {useEffect} from "react";




interface UserJobProps {
    id:string
}

export default function UserJobComponent(props:UserJobProps) {

    const {userJobList, fetchUserJobList} = useUserJobList({userId:parseInt(props.id)});

    useEffect(() => {
        fetchUserJobList()
    }, []);


    return <>
        {userJobList && <UserJobList userJobs={userJobList}></UserJobList>}
    </>


}