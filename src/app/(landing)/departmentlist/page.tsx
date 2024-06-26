'use client';
import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';

import PersonAddIcon from '@mui/icons-material/PersonAdd';

import DepartmentTable from '../../components/DepartmentTable';
import DepartmentLists from '../../components/DepartmentLists';
import Stack from '@mui/joy/Stack';
import modalContext from '@/app/context/modalContext';
import DepartmentModalForm from '@/app/components/DepartmentModalForm/DepartmentModalForm';
import { ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
import Loader from '@/app/components/Loader/Loader';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/hooks/useAuth';
import { AppDispatch } from '@/app/Store/store';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {Department, FilterItem} from "@/app/types";
import {useApi} from "@/app/api/hooks/useApi";
import SearchIcon from "@mui/icons-material/Search";
import {SearchComponent} from "@/app/components/Common/search";

export default function DepartmentList() {
  const [label, setLabel] = React.useState<string>('');
  const [open, setOpen] = React.useState<boolean>(false);
  const [row, setRow] = React.useState(null!);
  const loadingState = useSelector((state:any) => state?.createdepartments?.status === 'loading' || state?.deletedepartments?.status === 'loading' || state?.editdepartments?.status === 'loading' ? 'loading' : '');
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const auth =  useAuth();

  const [endPoint, setEndPoint] = React.useState<string>('/departments/get');
  const {data,isLoading,error,fetchData} = useApi<Department>(endPoint,{method:'GET'})

  const userFilterItems:FilterItem[] = [
    {
      searchLabel : 'Search',
      filterType : 'INPUT',
      handleChange : (value:string)=>{
        setEndPoint(`/departments/get?departmentName=${value}`);
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
    <Loader open={loadingState === 'loading'? true : false}/>
    {auth ? (
            <>
          <Box
            sx={{
              display: 'flex',
              mb: 1,
              gap: 1,
              flexDirection: "row",
              alignItems: { xs: 'start', sm: 'center' },
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            }}
          >
            <Typography level="h2" component="h1">
              Departments
            </Typography>
            <Stack spacing={2} direction="row">
              <Button
                color="success"
                startDecorator={<PersonAddIcon />}
                size="sm"
                onClick={() => {setOpen(true); setLabel('Add'); setRow(null!)}}
              >
                Add New Department
              </Button>
            </Stack>

          </Box>
              <SearchComponent filterItems={userFilterItems}/>
          <DepartmentTable open={open} setOpen={setOpen} label={label} setLabel={setLabel} setRow={setRow} departmentList={data} fetchDepartments={fetchData}/>
          <DepartmentLists open={open} setOpen={setOpen} label={label} setLabel={setLabel} setRow={setRow}/>
    
          <modalContext.Provider value={row}>
          <DepartmentModalForm open={open} setOpen={setOpen} label={label} setLabel={setLabel} setRow={setRow}/>
          </modalContext.Provider>
      <ToastContainer/>
      </>
    ) : ('Session Timed Out')
  }
      </>
  );
}
