'use client';
import * as React from 'react';
import {useEffect} from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import UserTable from '../../components/UserTable';
import UserList from '../../components/UserList';
import Stack from '@mui/joy/Stack';
import UserModalForm from '@/app/components/UserModalForm/UserModalForm';
import modalContext from '@/app/context/modalContext';
import {ToastContainer} from 'react-toastify';
import Loader from '@/app/components/Loader/Loader';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch} from '../../Store/store';
import {useRouter} from "next/navigation";
import {useAuth} from "@/app/hooks/useAuth";
import {SearchComponent} from "@/app/components/Common/search";
import {FilterItem, User} from "@/app/types";
import SearchIcon from "@mui/icons-material/Search";
import {useApi} from "@/app/api/hooks/useApi";


export default function Users() {


  const [open, setOpen] = React.useState<boolean>(false);
  const [label, setLabel] = React.useState<string>('');
  const [row, setRow] = React.useState(null!);
  const loadingState = useSelector((state:any) => state?.deleteusers?.status === 'loading' || state?.createusers?.status === 'loading' || state?.editusers?.status === 'loading' ? 'loading' : '');
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const auth =  useAuth();

  const [endPoint, setEndPoint] = React.useState<string>('/users/get');

  const {data,isLoading,error,fetchData} = useApi<User>(endPoint,{method:'GET'})

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
          <ToastContainer/>
          {auth ? (
            <>
          <Box
            sx={{
              display: 'flex',
              mb: 1,
              gap: 1,
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: { xs: 'start', sm: 'center' },
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            }}
          >
            <Typography level="h2" component="h1">
              Users
            </Typography>
            <Stack spacing={2} direction="row">
              <Button
                color="success"
                startDecorator={<PersonAddIcon />}
                size="sm"
                onClick={() => {setOpen(true); setLabel('Add New User'); setRow(null!)}}
              >
                Add New User
              </Button>
              {/* <Button
                color="primary"
                startDecorator={<DownloadRoundedIcon />}
                size="sm"
              >
                Download Excel
              </Button> */}
            </Stack>
          </Box>
          <SearchComponent filterItems={userFilterItems}></SearchComponent>
          <UserTable open={open} setOpen={setOpen} label={label} setLabel={setLabel} setRow={setRow} userList={data} fetchUers={fetchData}/>

          <UserList open={open} setOpen={setOpen} label={label} setLabel={setLabel} setRow={setRow}/>
          <modalContext.Provider value={row}>
          <UserModalForm open={open} setOpen={setOpen} label={label} setLabel={setLabel} setRow={setRow}/>
          </modalContext.Provider>
            </>
      )
      : 
      ('Session Timed Out')
      }
    </>
  );
}