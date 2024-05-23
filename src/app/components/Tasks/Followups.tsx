"use client";

import * as React from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Table from "@mui/joy/Table";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import { API_BASE_URL } from '@/app/config';
import { Stack } from "@mui/joy";
import TableSection from "../Common/TableSection";
import { useSelector } from "react-redux";
import { RootState } from "@/app/Store/store";
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "@/app/hooks/useAuth";

const jmespath = require('jmespath');

export default function Followups() {
    const auth = useAuth();

    const [userRemarks, setUserRemarks] = React.useState('');
    // const [rows, setRows] = React.useState();
    const [departmentRemarks, setDepartmentRemark] = React.useState([
        {
            
        }])
    const [remarksDepartment, setRemarksDepartment] = React.useState(0);

    const [departmentList, setDepartmentList] = React.useState([
        {
        
            "id": 1,
            "departmentName": ""
        }
      ])
      const [department, setDepartment] = React.useState([
        {
            "id": 1,
            "createdAt": "",
            "updatedAt": "",
            "departmentName": ""
        }
      ])
    const handleChange = (
        event: React.SyntheticEvent | null,
        newValue: string | null,
    ) => {
        setRemarksDepartment(parseInt(newValue ? newValue : "0"));
    };

    const logintype = useSelector((state: RootState) => state?.user.data);

    const getRemarksByUser = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/remarks/get-user-remarks?userId=${logintype.data.rolesId}`,
                {
                    method: 'GET',
                    headers: {
                        Accept: "application/json",
                        'Content-Type': 'application/json',
                        Authorization: "Bearer "  + auth,
                    }
                });

            if (!response.ok) {
                throw new Error('Failed to fetch user details: ' + response.statusText);
            }

            const data = await response.json();
            return data
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    }
    const getDepartmentsByUser = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/joballocation/get-user-departments?userId=${logintype.data.id}`, {
                method: 'GET',
                headers: {
                    Accept: "application/json",
                    'Content-Type': 'application/json',
                    Authorization: "Bearer "  + auth,
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch user details: ' + response.statusText);
            }

            const data = await response.json();
            return data
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    }
    const savedepartmentRemarks = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/remarks/create`, {
                method: 'POST',
                headers: {
                    Accept: "application/json",
                    'Content-Type': 'application/json',
                    Authorization: "Bearer "  + auth,
                },
                body: JSON.stringify({ departmentId: remarksDepartment, remarks: userRemarks, createdBy: logintype.data.id, status:'new',updatedBy: logintype.data.id })
            });
            if(response.ok){
                toast.success('Follow Up created successfully')
                window.location.reload();
            }
            if (!response.ok) {
                toast.info('Failed to create')
                throw new Error('Failed to fetch user details: ' + response.statusText);
            }

            const data = await response.json();
            return data
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    }

    const getDepartment = async () => {
        try {
          const response = await fetch(`${API_BASE_URL}/departments/get`, {
            method: 'GET',
            headers: {
              Accept: "application/json",
              'Content-Type': 'application/json',
              Authorization: "Bearer "  + auth,
            }
          });
    
          if (!response.ok) {
            throw new Error('Failed to fetch user details: ' + response.statusText);
          }
    
          const data = await response.json();
          return data;
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      }

    const followUpHeader = ["Department", "CreatedAt", "UpdatedAt", "CreatedBy","UpdatedBy","Remarks", "Status"]

    const followUpRow = departmentRemarks?.map(dep => (
        dep?.departments?.remarks.map(rem => (
            <tr key={`document_id_${rem?.id}`}>
                <td><Typography level="body-xs">{rem?.id}</Typography></td>
                <td><Typography level="body-xs">{dep?.departments?.departmentName}</Typography></td>
                <td><Typography level="body-xs">{rem?.createdAt}</Typography></td>
                <td><Typography level="body-xs">{rem?.updatedAt}</Typography></td>
                <td><Typography level="body-xs">{rem?.createdUser.userName}</Typography></td>
                <td><Typography level="body-xs">{rem?.updatedUser.userName}</Typography></td>
                <td><Typography level="body-xs">{rem?.remarks}</Typography></td>
                <td><Typography level="body-xs">{rem?.status}</Typography></td>
            </tr>
        ))

    ))
    React.useEffect(() => {
        const fetchRemarks = async () => {
            // let depRem = await getRemarksByUser()
            let department = await getDepartment();
            let departments = await getDepartmentsByUser();

            setDepartmentList(jmespath.search(departments.data,'[].departments.{id:id,departmentName:departmentName}'))
            setDepartment(department.data);
            setDepartmentRemark(departments.data)
        }

        fetchRemarks();


        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <React.Fragment>
            <Stack direction={'row'} marginBottom={1}>
                <Typography level="h2">Follow Ups</Typography>

            </Stack>
            <Box component={'div'} sx={{ width: '100%' }}>
            <ToastContainer/>

                {/* <Typography level="title-sm" >Add New Remarks</Typography> */}
                <Stack gap={2} flexDirection={'row'}>
                    <FormControl orientation="horizontal">
                        <FormLabel>Department</FormLabel>
                        <Select placeholder="Select a department" onChange={handleChange}>
                            {department.map(dep => (<Option key={dep?.id} value={dep?.id}>
                                {dep?.departmentName}
                            </Option>))}
                        </Select>
                    </FormControl>
                    <FormControl orientation="horizontal">
                        <FormLabel>Remarks</FormLabel>
                        <Input value={userRemarks} onChange={(e) => { setUserRemarks(e.target.value) }} ></Input>
                        <Button variant="solid" sx={{ ml: 2 }} onClick={(e) => { savedepartmentRemarks() }}>Add New Remarks</Button>
                    </FormControl>

                </Stack>
            </Box>

            <TableSection tableHeaders={followUpHeader} tableRows={followUpRow} action={true}/>
        </React.Fragment>



    )
}
