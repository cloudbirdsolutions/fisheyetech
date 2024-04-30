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

export default function Followups() {
    const [userRemarks, setUserRemarks] = React.useState('');
    const [rows, setRows] = React.useState();
    const [departmentRemarks, setDepartmentRemark] = React.useState([
        {
            "id": 1,
            "createdAt": "",
            "updatedAt": "",
            "createdBy": 1,
            "departmentId": 1,
            "remarks": "",
            "departments": {
                "id": 1,
                "createdAt": "",
                "updatedAt": "",
                "departmentName": ""
            }
        }
    ])
    const [remarksDepartment, setRemarksDepartment] = React.useState(0);

    const [departmentList, setDepartmentList] = React.useState([
        {
            "departments": {
                "id": 1,
                "createdAt": "2024-04-20T08:20:59.096Z",
                "updatedAt": "2024-04-20T08:20:59.096Z",
                "departmentName": "CHP"
            }
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
            const response = await fetch(`${API_BASE_URL}/remarks/get-user-remarks?userId=${logintype.data.id}`, {
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
                },
                body: JSON.stringify({ departmentId: remarksDepartment, remarks: userRemarks, createdBy: logintype.data.id })
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

    const followUpHeader = ["Department", "CreatedAt", "UpdatedAt", "Remarks", "Status"]

    const followUpRow = departmentRemarks.map(rem => (
        <tr key={`document_id_${rem.id}`}>
            <td><Typography level="body-xs">{rem?.id}</Typography></td>
            {/* <td><Typography level="body-xs">{rem?.departments.departmentName}</Typography></td> */}
            <td><Typography level="body-xs">{rem?.createdAt}</Typography></td>
            <td><Typography level="body-xs">{rem?.updatedAt}</Typography></td>
            <td><Typography level="body-xs">{rem?.remarks}</Typography></td>
            <td><Typography level="body-xs">New</Typography></td>
        </tr>
    ))
    React.useEffect(() => {
        const getData = async () => {
            try {

                const url = [4].includes(logintype.data.rolesId) ? `${API_BASE_URL}/joballocation/get-all-jobs` : `${API_BASE_URL}/joballocation/get-user-jobs?id=${logintype.data.id}`
                // const url = `http://51.79.147.139:3000/joballocation/get-user-jobs?id=${logintype.data.id}`
                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error(
                        "Failed to fetch user details: " + response.statusText
                    );
                }
                const data = await response.json();
                setRows(data.data);
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        };

        getData();

        const fetchRemarks = async () => {
            let depRem = await getRemarksByUser()
            let departments = await getDepartmentsByUser()
            setDepartmentRemark(depRem.data)
            setDepartmentList(departments.data)
        }

        fetchRemarks();

    },
        []);

    return (
        <React.Fragment>
            <Sheet>
                <Stack direction={'row'} marginBottom={1}>
                    <Typography level="h2">Follow Ups</Typography>

                </Stack>

                <Box margin={2}>
                    {/* <Typography level="title-sm" >Add New Remarks</Typography> */}
                    <Stack gap={2} >
                        <FormControl orientation="horizontal">
                            <FormLabel>Department</FormLabel>
                            <Select placeholder="Select a department" onChange={handleChange}>
                                {departmentList.map(dep => (<Option value={dep.departments.id}>
                                    {dep.departments.departmentName}
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

                <TableSection tableHeaders={followUpHeader} tableRows={followUpRow} />
            </Sheet>
        </React.Fragment>



    )
}
