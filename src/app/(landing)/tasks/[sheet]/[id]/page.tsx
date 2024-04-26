'use client';
import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import { useCallback, useState } from 'react';
import { useParams } from 'next/navigation'
import { AccordionGroup, FormControl, FormLabel, Tab, TabList, TabPanel, Tabs, Typography, Table, Sheet, Button, Stack, Link } from '@mui/joy';
import { Accordion, AccordionDetails, AccordionSummary, Input } from '@mui/joy';
import TableSection from '@/app/components/Common/TableSection';
import { Add } from '@mui/icons-material';

import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@/app/Store/store';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_BASE_URL } from '@/app/config'; 
 

interface LogProps {
  sheetid: string
}


async function getSheetDetails(sheetid: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/sheetmaster/get-sheets?id=${sheetid}`, {
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





export default function Log() {
  const params = useParams<{ sheet: string, id: string }>()
  const [permision,setPermission] = useState({
    "permissionType": {
        "id": 1,
        "createdAt": "2024-04-20T08:38:18.589Z",
        "updatedAt": "2024-04-20T08:38:18.589Z",
        "permissionType": "Operator"
    }
})
  const [sheetName, setSheetName]= useState('');

  const [documentList, setDocumentList] = useState([{
    id: "", createdAt: "", transitionId: "", updatedAt: "", sheetId: "", userId: "", users: { userName: "" }, "transitionMaster": {
      "transitionName": ""
    }
  }])
  const router = useRouter()
  const logintype = useSelector((state: RootState) => state?.user.data);
  const [refreshListIndicator, setRefreshListIndicator] = useState(Date.now())

  async function getUserPermission() {
    try {
  
      const response = await fetch(`${API_BASE_URL}/joballocation/get-permissions?sheetId=${parseInt(params.id)}&userId=${logintype.data.id}`, {
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

  async function createDocument(sheetId: string, userId: number, transitionId: number) {

    try {

      const response = await fetch(`${API_BASE_URL}/sheetdocid/create`, {
        method: 'POST',
        headers: {
          Accept: "application/json",
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "sheetId": parseInt(sheetId), "userId": userId, "transitionId": transitionId }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user details: ' + response.statusText);
      }

      const data = await response.json();
      setRefreshListIndicator(Date.now());
      toast.success("Document Created Succesfuly!");
      return data
    } catch (error) {
      console.error('Error fetching user details:', error);
    }

  }

  const getDocumentList = async(sheetid: string) => {
    try {

      const url = [2, 3].includes(permision.permissionType.id) ? `${API_BASE_URL}/sheetdocid/get-user-docs?sheetId=${sheetid}` : `${API_BASE_URL}/sheetdocid/get-user-docs?sheetId=${sheetid}&userId=${logintype.data.id}`

      const response = await fetch(url, {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }
  



  const RowMenu = (props: any) => {
    return (
      <Button color="primary" variant="outlined" size='sm' onClick={() => router.push(`/tasks/sheet/${props.sheetId}/${props.documentId}`)} >
        Data Entry
      </Button>
    )
  }

  const headers = ["Created At", "Updated At", "Created By", "Status"]
  const rows = documentList.map((o) => (
    <tr key={`document_id_${o.id}`}>
      <td><Typography level="body-xs">{o?.id}</Typography></td>
      <td><Typography level="body-xs">{o?.createdAt}</Typography></td>
      <td><Typography level="body-xs">{o?.updatedAt}</Typography></td>
      <td><Typography level="body-xs">{o?.users.userName}</Typography></td>
      <td><Typography level="body-xs">{o?.transitionMaster.transitionName}</Typography></td>
      <td>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}><RowMenu sheetId={o.sheetId} documentId={o.id} /></Box>
      </td>
    </tr>

  ))

  React.useEffect(() => {

    const fetchData = async () => {
      let resposne = await getDocumentList(params.id)
      let sheetDetails = await getSheetDetails(params.id)
      let permissionResponse = await getUserPermission()

      setDocumentList(resposne.data)
      setSheetName(sheetDetails.data[0].sheetName)
      setPermission(permissionResponse.data[0])
    }
    fetchData()

  //eslint-disable-next-line
  }, [params,refreshListIndicator,permision])


  return (
    <>
      <Box sx={{ display: 'flex' }} marginTop={2}>
        <ToastContainer />
        <div className='flex justify-between items-center flex-col md:flex-row gap-4 w-full' >
          {/* <Stack direction={'row'} justifyContent="space-between" spacing={2} marginBottom={2}> */}
          <Typography level='title-lg' component="h1" sx={{ marginBottom: "12px" }}>{sheetName}</Typography>
          <Typography level='title-sm' component="h1" sx={{ marginBottom: "12px" }}>{permision.permissionType.permissionType}</Typography>
          {/* <Typography level='title-sm' component="h1" sx={{ marginBottom: "12px" }}>{permision.permissionType.id}</Typography> */}
          <Link
            underline="hover"
            color="primary"
            href="/tasks"
            fontSize={14}
            fontWeight={500}
            sx={{ ml: 'auto' }} 
          >
            Go Back to Task List
          </Link>
          <Button size='sm' color='primary' startDecorator={<Add />} onClick={() => createDocument(params.id, logintype.data.id, 1)}>
            Create New Document
          </Button>

          {/* </Stack> */}
        </div>

      </Box>
      <TableSection tableHeaders={headers} tableRows={rows} />
    </>
  );
}