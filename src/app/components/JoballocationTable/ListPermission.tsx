import Box from "@mui/joy/Box";
import Chip from "@mui/joy/Chip/Chip";
import Typography from "@mui/joy/Typography";
import TableSection from "../Common/TableSection";
import { useEffect, useState } from "react";
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Checkbox from '@/app/components/Checkbox';
import Button from "@mui/joy/Button";

export default function ListPermission(props:any) {

    const [department, setDepartment] = useState();
    const [role, setRole] = useState([{
        "id": 4,
      "createdAt": "2024-04-20T08:42:38.910Z",
      "updatedAt": "2024-04-20T08:42:38.910Z",
      "roleName": "admin",
      "roleStatus": 1,
      "permissionId": 1,
      "statusMaster": {
        "statusName": "ACTIVE"
      },
      "permissionType": {
        "permissionType": "Data Entry"
      }

    }]);

    useEffect(() => {
        const getdepartment = async () => {
        try {
        const response = await fetch('http://51.79.147.139:3000/departments/get', {
            method: 'GET',
            headers: {
              Accept : "application/json",
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


    const getrole = async () => {
        try {
        const response = await fetch('http://51.79.147.139:3000/roles/get', {
            method: 'GET',
            headers: {
              Accept : "application/json",
              'Content-Type': 'application/json',
            }
          });
    
          if (!response.ok) {
            throw new Error('Failed to fetch user details: ' + response.statusText);
          }
    
          const data = await response.json();
          
          setRole(data.data);
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
        
    }
    getrole();

    }, [])
    
    const handleChange = (
        event: React.SyntheticEvent | null,
        newValue: Array<string> | null,
      ) => {
        console.log(`You have choosen "${newValue}"`);
      };

    const headers = ["Name", "Department", "Role", "sheets", "Shift-A", "Shift-B", "Shift-C", "Shift-D", "Shift-General"];

    const tablerows:any =  [
      <tr key={props.selectedrows?.id}>
        <td>
          <Typography level="body-xs">{props.selectedrows?.id}</Typography>
        </td>
        <td>
          <Typography level="body-xs">{props.selectedrows?.userName}</Typography>
        </td>  
        <td>
          {
            department && 
            <Select multiple={false} onChange={handleChange}>
                {department.map((r:any) => {
                    return <Option value={r.id}>{r.departmentName}</Option>
                })                
                }   
            </Select>
          }
        </td>
        <td>
          {
            role && 
            <Select multiple={false} onChange={handleChange}>
                {role.map((r:any) => {
                    return <Option value={r.id}>{r.roleName}</Option>
                })                
                }   
            </Select>
          }
        </td>
        <td>
        {
            role && 
            <Select multiple onChange={handleChange}>
                {role.map((r:any) => {
                    return <Option value={r.id}>{r.roleName}</Option>
                })                
                }   
            </Select>
          }
        </td>  
        <td>
          <Checkbox label={'Shift-A'}/>
        </td>
        <td>
        <Checkbox label={'Shift-B'}/>
        </td>     
        <td>
        <Checkbox label={'Shift-C'}/>
        </td>
        <td>
        <Checkbox label={'Shift-D'}/>
        </td>     
        <td>
        <Checkbox label={'General Shift'}/>
        </td>
        <td>
            <Button>Add Job</Button>
        </td>        
      </tr>
    ]

    return (
        <>
        <TableSection tableHeaders={headers} tableRows={tablerows} />
        
        </>
    )
}