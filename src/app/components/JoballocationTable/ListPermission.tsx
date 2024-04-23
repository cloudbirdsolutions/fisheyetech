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
    userId: props.selectedrows.id,
    departmentId: 0,
    permissionId: 0,
    sheetId: 0,
    shiftId: 0
  });

  const [sheets, setSheets] = useState([]);

  const [shift, setShift] = useState([]);

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const headers = ["Name", "Department", "Permission", "Sheets"];



  const jobstablerows = alljobs?.map((j: any) => (
    <tr key={j?.id}>
      <td>
        <Typography level="body-xs">{props.selectedrows?.id}</Typography>
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
        <Button type="submit">Delete Job</Button>
      </td>
    </tr>
  ))

  useEffect(() => {
    const getalljobs = async () => {
      try {
        const response = await fetch(`http://51.79.147.139:3000/joballocation/get-user-jobs?id=${props?.selectedrows?.id}`, {
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
        const response = await fetch('http://51.79.147.139:3000/departments/get', {
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
        const response = await fetch('http://51.79.147.139:3000/permissiontype/get', {
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

    const getshift = async () => {
      try {
        const response = await fetch(`http://51.79.147.139:3000/sheetshiftmaster/get-shift?id=${props?.selectedrows?.id}`, {
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

  }, [creatjob])

  const handleChange = async (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: e.target.name === 'departmentId' || e.target.name === 'permissionId' || e.target.name === 'shiftId' || e.target.name === 'sheetId' ? parseInt(value) : value,
    }));

    if (e.target.name === 'departmentId') {
      try {

        const response = await fetch(`http://51.79.147.139:3000/departmentsheets/get-sheets?id=${parseInt(value)}`, {
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
      try {

        const response = await fetch(`http://51.79.147.139:3000/sheetshiftmaster/get-shift?id=${parseInt(value)}`, {
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

        // setSheets(data.data);
        setShift(data.data)

      }


      catch {

      }
    }

  }
  const handleSubmit = (e: any) => {
    e.preventDefault();
    try {
      // const userData = Object.fromEntries();

      dispatch(createjob(formData)).then(() => {
        router.push('/joballocation');
      }).then(() => {
        alert("Job Created");
      })

    } catch (error) {
      console.error('Failed to create user:', error);
      // Handle error (e.g., display error message)
    }
  }



  return (
    <>
      <form className='gap-8 flex flex-wrap flex-row' onSubmit={handleSubmit}>
        <div className='flex justify-between items-center flex-col md:flex-row gap-4 w-full' >
          <div className='space-y-[2px]'>
            <h3 className='text-textdull text-xs mb-2'>ID</h3>
            <Input size="sm" disabled name="id" value={props.selectedrows?.id} />
          </div>
          <div className='space-y-[2px]'>
            <h3 className='text-textdull text-xs mb-2'>User Name</h3>
            <Input size="sm" disabled placeholder="userName" name="userName" value={props.selectedrows?.userName} />
          </div>
          <div className='space-y-[2px]'>
            <h3 className='text-textdull text-xs mb-2'>Department Name</h3>
            {
              department &&
              <select name="departmentId" onChange={handleChange}>
                <option value={0}>Select</option>
                {department.map((r: any) => {
                  return <option value={r.id}>{r.departmentName}</option>
                })
                }
              </select>
            }
          </div>

          <div className='space-y-[2px]'>
            <h3 className='text-textdull text-xs mb-2'>Permission</h3>
            {
                    permission && 
                    <select multiple={false} name="permissionId" onChange={handleChange}>
                        <option value={0}>Select</option>
                        {permission.map((r:any) =>(<option value={r.id}>{r.permissionType}</option>))                }   
                    </select>
                 }

            
          </div>

        </div>
        <div className='flex justify-between items-center flex-col md:flex-row gap-4 w-full'>
        {sheets &&
              <div className='space-y-[2px]'>
                <h3 className='text-textdull text-xs mb-2'>Sheet Name</h3>
                <select multiple={false} name="sheetId" onChange={handleChange}>
                  <option value={0}>Select</option>
                  {sheets.map((r: any) => {
                    return <option value={r.sheetMaster.id}>{r.sheetMaster?.sheetName}</option>
                  })
                  }
                </select>
              </div>
            }

            <div className='space-y-[2px] w-full'>
              <h3 className='text-textdull text-xs mb-2'>Shift</h3>
              <select multiple={false} name="shiftId" onChange={handleChange}>
                <option value={0}>Select</option>
                {shift?.map((r: any) => {
                  return <option value={r.shiftId}>{r.shiftMaster?.shiftType}</option>
                })
                }
              </select>
            </div>

        </div>


        <Button type="submit"> Add Job</Button>
      </form>
      <TableSection tableHeaders={headers} tableRows={jobstablerows} />
    </>
  )
}