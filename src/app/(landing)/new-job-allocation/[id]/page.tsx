"use client";
import Typography from "@mui/joy/Typography";
// import UserJob from "@/app/components/NewJobAllocation/UserJob";
import AddUserJob from "@/app/components/NewJobAllocation/AddUserJob";
import { useCallback, useEffect, useReducer, useState } from "react";
import useUserJobList from "@/app/api/hooks/useUserJobList";
import UserJobList from "@/app/components/NewJobAllocation/UserJobList";
import { AppDispatch, RootState } from "@/app/Store/store";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "@/app/hooks/useAuth";
import { useRouter } from "next/navigation";
import { FilterItem, UserJob } from "@/app/types";
import { useApi } from "@/app/api/hooks/useApi";
import SearchIcon from "@mui/icons-material/Search";
import { SearchComponent } from "@/app/components/Common/search";

export default function UserJobAllocation({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const auth = useAuth();
  const logintype = useSelector((state: RootState) => state?.user.data);
  const baseurl = `/joballocation/get-user-jobs?id=${params.id}`;

  const [endPoint, setEndPoint] = useState<string>(baseurl);

  const {
    data: userJobList,
    isLoading,
    error,
    fetchData,
  } = useApi<UserJob>(endPoint, { method: "GET" });

  const userFilterItems: FilterItem[] = [
    {
      searchLabel: "Department",
      filterType: "INPUT",
      handleChange: (value: string) => {
        const separator = baseurl.includes("?") ? "&" : "?";
        setEndPoint(
          `${baseurl}${separator}departments_departmentName=${value}`
        );
      },
      placeholder: "Search user by department name",
      startDecoration: <SearchIcon />,
    },
    {
      searchLabel: "Sheet",
      filterType: "INPUT",
      handleChange: (value: string) => {
        const separator = baseurl.includes("?") ? "&" : "?";
        setEndPoint(`${baseurl}${separator}sheetMaster_sheetName=${value}`);
      },
      placeholder: "Search user by Sheet Name",
      startDecoration: <SearchIcon />,
    },
    {
      searchLabel: "Designation",
      filterType: "INPUT",
      handleChange: (value: string) => {
        const separator = baseurl.includes("?") ? "&" : "?";
        setEndPoint(
          `${baseurl}${separator}designationMaster_designationName=${value}`
        );
      },
      placeholder: "Search user by designation",
      startDecoration: <SearchIcon />,
    },
    {
      searchLabel: "Shift",
      filterType: "INPUT",
      handleChange: (value: string) => {
        const separator = baseurl.includes("?") ? "&" : "?";
        setEndPoint(`${baseurl}${separator}shiftMaster_shiftType=${value}`);
      },
      placeholder: "Search user by Shift",
      startDecoration: <SearchIcon />,
    },
  ];
  useEffect(() => {
    // fetchUserJobList()
    fetchData();
  }, [params.id, endPoint]);

  return (
    <>
      <SearchComponent filterItems={userFilterItems}></SearchComponent>

      <AddUserJob id={params.id} cb={fetchData}></AddUserJob>
      {userJobList && <UserJobList userJobs={userJobList}></UserJobList>}
    </>
  );
}
