'use client';
import * as React from 'react';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Followups from '@/app/components/Tasks/Followups';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/hooks/useAuth';
import { AppDispatch } from '@/app/Store/store';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {Department, FilterItem} from "@/app/types";
import {useApi} from "@/app/api/hooks/useApi";
import SearchIcon from "@mui/icons-material/Search";
import {SearchComponent} from "@/app/components/Common/search";
import { useSelector} from 'react-redux';
import {RootState} from '@/app/Store/store';
import { Remarks } from "@/app/types";

export default function Dashboard() {
    const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
const auth =  useAuth();

const logintype = useSelector((state: RootState) => state?.user.data);
// const baseurl = [2, 3].includes(logintype.data.rolesId) ? `/joballocation/get-user-departments?userId=${logintype.data.id}` : '/departments/get'; 
const baseurl = `/joballocation/get-user-departments?userId=${logintype.data.id}`;
// const baseurl = `/joballocation/get-user-departments`;

const [endPoint, setEndPoint] = React.useState<string>(baseurl);

// const [endPoint, setEndPoint] = React.useState<string>('/departments/get');
  const {data,isLoading,error,fetchData} = useApi<Remarks>(endPoint,{method:'GET'})

  // const {data:userJobList,isLoading,error, fetchData} = useApi<UserJob>(endPoint,{method:'GET'})


  const userFilterItems:FilterItem[] = [
    {
      searchLabel : 'Search',
      filterType : 'INPUT',
      handleChange : (value:string)=>{
        // setEndPoint(`/joballocation/get-user-departments?departmentName=${value}`);
        setEndPoint(`/joballocation/get-user-departments?userId=${logintype.data.id}&departments_departmentName=${value}`);

      },
      placeholder : "Search user by department name",
      startDecoration : <SearchIcon/>
    }
  ]

  useEffect(() => {
    fetchData()
  }, [endPoint]);

useEffect(() => {
  !auth ? (
  localStorage.removeItem('accessToken'),
  dispatch({ type: "USER_LOGOUT" }),
  //setuser('')
  router.push("/", { scroll: false }) ): ( '' )
}, [])
    return (
        <>
        {auth ? (
            <>
                    <SearchComponent filterItems={userFilterItems}></SearchComponent>

            <Followups departmentList={data} />
            </>
    ) : ('Session Timed Out')
  }
        </>)

}
