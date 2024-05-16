import Box from "@mui/joy/Box";
import Chip from "@mui/joy/Chip/Chip";
import Typography from "@mui/joy/Typography";
import TableSection from "../Common/TableSection";
import { useEffect, useState } from "react";
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Checkbox from '@/app/components/Checkbox';
import Button from "@mui/joy/Button";
import Input from "@mui/joy/Input/Input";
import { createjob } from '../../Reducers/CreateJobSlice';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/Store/store";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ListPermissionSecLists from "./ListPermissionSecLists";

export default function ListPermission(props: any) {

  const creatjob = useSelector((state: RootState) => state?.createjobs?.data);

  const [department, setDepartment] = useState([]);
  const [permission, setPermision] = useState([{
    "id": 1,
    "createdAt": "2024-04-20T08:38:18.589Z",
    "updatedAt": "2024-04-20T08:38:18.589Z",
    "permissionType": "Operator"
}]);

  const [alljobs, setAlljobs] = useState([]);
  const [formData, setFormData] = useState({
    userId: props?.selectedrows?.id,
    departmentId: 0,
    permissionId: 0,
    sheetId: 0,
    shiftId: 0
  });

  const [sheets, setSheets] = useState([]);

  const [shift, setShift] = useState([]);

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const headers = ["Name", "Department", "Permission", "Sheets", "Shift"];

  const [selectedShiftId,setSelectedShiftd] = useState(1);


  const jobstablerows = alljobs?.map((j: any) => (
    <tr key={j?.id}>
      <td>
        <Typography level="body-xs">{j?.id}</Typography>
      </td>
      <td>
        <Typography level="body-xs">{j?.users?.userName}</Typography>
      </td>
      <td>
        {j?.departments?.departmentName}
      </td>
      <td>
        {j?.permissionType?.permissionType}
      </td>
      <td>
        {j?.sheetMaster?.sheetName}
      </td>
      <td>
        {j?.shiftMaster?.shiftType}
      </td>

      <td>
        {/* <Button type="submit">Delete Job</Button> */}
      </td>
    </tr>
  ))

  useEffect(() => {
    const getalljobs = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/joballocation/get-user-jobs?id=${props?.selectedrows?.id}`, {
          method: 'GET',
          headers: {
            Accept: "application/json",
            'Content-Type': 'application/json',
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user details: ' + response.statusText);
        }

        const data = await response.json();

        setAlljobs(data.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }

    }
    getalljobs();

    const getdepartment = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/departments/get`, {
          method: 'GET',
          headers: {
            Accept: "application/json",
            'Content-Type': 'application/json',
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user details: ' + response.statusText);
        }

        const data = await response.json();

        setDepartment(data.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }

    }
    getdepartment();


    const getPermission = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/permissiontype/get`, {
          method: 'GET',
          headers: {
            Accept: "application/json",
            'Content-Type': 'application/json',
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user details: ' + response.statusText);
        }

        const data = await response.json();

        setPermision(data.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }

    }
    getPermission();


// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [creatjob])

  useEffect(()=>{

    const getshift = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/sheetshiftmaster/get-shift?id=${selectedShiftId}`, {
          method: 'GET',
          headers: {
            Accept: "application/json",
            'Content-Type': 'application/json',
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user details: ' + response.statusText);
        }

        const data = await response.json();

        setShift(data.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }

    }
    getshift();

  },[selectedShiftId])

  const handleChange = async (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: e.target.name === 'departmentId' || e.target.name === 'permissionId' || e.target.name === 'shiftId' || e.target.name === 'sheetId' ? parseInt(value) : value,
    }));

    if (e.target.name === 'departmentId') {
      try {

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/departmentsheets/get-sheets?id=${parseInt(value)}`, {
          method: 'GET',
          headers: {
            Accept: "application/json",
            'Content-Type': 'application/json',
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user details: ' + response.statusText);
        }

        const data = await response.json();

        setSheets(data.data);

      }


      catch {

      }
    }
    if (e.target.name === 'sheetId') {
      setSelectedShiftd(parseInt(value))
      // try {

      //   const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/sheetshiftmaster/get-shift?id=${parseInt(value)}`, {
      //     method: 'GET',
      //     headers: {
      //       Accept: "application/json",
      //       'Content-Type': 'application/json',
      //     }
      //   });

      //   if (!response.ok) {
      //     throw new Error('Failed to fetch user details: ' + response.statusText);
      //   }

      //   const data = await response.json();

      //   // setSheets(data.data);
      //   setShift(data.data)

      // }


      // catch {

      // }
    }

  }
  const handleSubmit = (e: any) => {
    e.preventDefault();
    try {
      // const userData = Object.fromEntries();

      dispatch(createjob(formData)).then((res) => {
        
        res.payload.statusCode === 200 ? (
          toast.success(res.payload.message)
          // router.push('/joballocation')
          ) : 
          (
            toast.error(res.payload.message)
          )
      })

    } catch (error) {
      console.error('Failed to create user:', error);
      // Handle error (e.g., display error message)
    }
  }



  return (
    <>
    <ToastContainer/>
      <form style={{gap: '8'}} onSubmit={handleSubmit}>
      <Box component="div" display="flex" alignItems="center" width={'100%'} flexDirection={{xs: 'column', sm: 'column', md: 'row'}} py={1} gap={2}>
          <Box component="div" width={{xs: '100%', sm: '100%', md: '25%'}}>
          <Typography level="h3" fontSize="sm" sx={{ mb: 0.5 }}>ID</Typography>
            <Input size="sm" disabled name="id" value={props.selectedrows?.id} />
          </Box>
          <Box component="div" width={{xs: '100%', sm: '100%', md: '25%'}}>
          <Typography level="h3" fontSize="sm" sx={{ mb: 0.5 }}>User Name</Typography>
            <Input size="sm" disabled placeholder="userName" name="userName" value={props.selectedrows?.userName} />
          </Box>
          <Box component="div" width={{xs: '100%', sm: '100%', md: '25%'}}>
          <Typography level="h3" fontSize="sm" sx={{ mb: 0.5 }}>Department Name</Typography>
            {
              department &&
              <select name="departmentId" onChange={handleChange} style={{padding: '8px', borderRadius: '5px', borderColor: '#ccc', width: '100%'}}>
                <option value={0}>Select</option>
                {department.map((r: any, i) => {
                  return <option key={i} value={r.id}>{r.departmentName}</option>
                })
                }
              </select>
            }
          </Box>

          <Box component="div" width={{xs: '100%', sm: '100%', md: '25%'}}>
              <Typography level="h3" fontSize="sm" sx={{ mb: 0.5 }}>Permission</Typography>
                 {
                    permission && 
                    <select multiple={false} name="permissionId" onChange={handleChange} style={{padding: '8px', borderRadius: '5px', borderColor: '#ccc', width: '100%'}}>
                        <option value={0}>Select</option>
                        {permission.map((r:any, i) =>(<option key={i} value={r.id}>{r.permissionType}</option>))                }   
                    </select>
                 }
          </Box>

        </Box>
        <Box component="div" display="flex" alignItems="center" flexDirection={{xs: 'column', sm: 'column', md: 'row'}} py={1} gap={2}>
              {sheets &&
              <Box component="div" width={{xs: '100%', sm: '100%', md: '50%'}}>
                <Typography level="h3" fontSize="sm" sx={{ mb: 0.5 }}>Sheet Name</Typography>
                <select multiple={false} name="sheetId" onChange={handleChange} style={{padding: '8px', borderRadius: '5px', borderColor: '#ccc', width: '100%'}}>
                  <option value={0}>Select</option>
                  {sheets.map((r: any, i) => {
                    return <option key={i} value={r.sheetMaster.id}>{r.sheetMaster?.sheetName}</option>
                  })
                  }
                </select>
              </Box>
            }

              <Box component="div" width={{xs: '100%', sm: '100%', md: '50%'}}>
              <Typography level="h3" fontSize="sm" sx={{ mb: 0.5 }}>Shift</Typography>
              <select multiple={false} name="shiftId" onChange={handleChange} style={{padding: '8px', borderRadius: '5px', borderColor: '#ccc', width: '100%'}}>
                <option value={0}>Select</option>
                {shift?.map((r: any, i) => {
                  return <option key={i} value={r.shiftId}>{r.shiftMaster?.shiftType}</option>
                })
                }
              </select>
            </Box>

        </Box>


        <Button type="submit"> Add Job</Button>
      </form>
      <TableSection tableHeaders={headers} tableRows={jobstablerows} />
      <ListPermissionSecLists alljobs={alljobs}/>
    </>
  )
}