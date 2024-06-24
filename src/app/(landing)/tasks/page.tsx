"use client";
import * as React from "react";
import Box from "@mui/joy/Box";
import TasksTable from "@/app/components/Tasks/TasksTable";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/Store/store";
import { useAuth } from "@/app/hooks/useAuth";
import { useEffect } from "react";
import { useApi } from "@/app/api/hooks/useApi";
import { FilterItem, UserJob } from "@/app/types";
import SearchIcon from "@mui/icons-material/Search";
import { SearchComponent } from "@/app/components/Common/search";

export default function Task() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const auth = useAuth();

  const logintype = useSelector((state: RootState) => state?.user.data);
  const baseurl = [2, 3].includes(logintype.data.rolesId)
    ? `/joballocation/get-all-jobs`
    : `/joballocation/get-user-jobs?id=${logintype.data.id}`;

  const [endPoint, setEndPoint] = React.useState<string>(baseurl);

  const {
    data: userJobList,
    isLoading,
    error,
    fetchData,
  } = useApi<UserJob>(endPoint, { method: "GET" });

  const userFilterItems: FilterItem[] = [
    {
      searchLabel: "Assignee",
      filterType: "INPUT",
      handleChange: (value: string) => {
        const separator = baseurl.includes("?") ? "&" : "?";
        setEndPoint(`${baseurl}${separator}users_userName=${value}`);
      },
      placeholder: "Search user by assignee",
      startDecoration: <SearchIcon />,
    },
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
      searchLabel: "Entity",
      filterType: "INPUT",
      handleChange: (value: string) => {
        const separator = baseurl.includes("?") ? "&" : "?";
        setEndPoint(`${baseurl}${separator}sheetMaster_sheetName=${value}`);
      },
      placeholder: "Search user by entity name",
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
    // {
    //   searchLabel: "Shift",
    //   filterType: "INPUT",
    //   handleChange: (value: string) => {
    //     const separator = baseurl.includes("?") ? "&" : "?";
    //     setEndPoint(
    //       `${baseurl}${separator}shiftMaster_shiftType=Shift=${value}`
    //     );
    //   },
    //   placeholder: "Search user by shift",
    //   startDecoration: <SearchIcon />,
    // },
  ];

  useEffect(() => {
    fetchData();
  }, [endPoint]);

  useEffect(() => {
    !auth
      ? (localStorage.removeItem("accessToken"),
        dispatch({ type: "USER_LOGOUT" }),
        //setuser('')
        router.push("/", { scroll: false }))
      : "";
  }, []);
  return (
    <>
      {auth ? (
        <>
          <SearchComponent filterItems={userFilterItems}></SearchComponent>
          <TasksTable userJobList={userJobList} />
        </>
      ) : (
        <>Session Timedout</>
      )}
    </>
  );
}
