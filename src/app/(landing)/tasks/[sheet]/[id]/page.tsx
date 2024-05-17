'use client';
import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import { useCallback, useState } from 'react';
import { useParams } from 'next/navigation'
import { AccordionGroup, FormControl, FormLabel, Tab, TabList, TabPanel, Tabs, Typography, Table, Sheet, Button, Stack, Link, Divider, Chip } from '@mui/joy';
import { Accordion, AccordionDetails, AccordionSummary, Input } from '@mui/joy';
import TableSection from '@/app/components/Common/TableSection';
import { Add } from '@mui/icons-material';

import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from '@/app/Store/store';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_BASE_URL } from '@/app/config'; 
import {createdocument} from '@/app/Reducers/CreateDocumentSlice';
import IconButton from '@mui/joy/IconButton';
import DownloadIcon from '@mui/icons-material/Download';
import EditIcon from '@mui/icons-material/Edit';
import { saveAs } from 'file-saver';

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
  const createdocuments = useSelector((state:any) => state?.createdocuments?.data);

  const dispatch:any = useDispatch<AppDispatch>();
  const params = useParams<{ sheet: string, id: string }>()
  const [permision,setPermission] = useState({
    "permissionType": {
        "id": 0,
        "createdAt": "",
        "updatedAt": "",
        "permissionType": ""
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
    const passData = {
      'sheetId' : sheetId,
      'userId' : userId,
      'transitionId' : transitionId
    }
    dispatch(createdocument(passData)).then((res:any) => {
     
      res.payload.status == 200 ? (
        toast.success(res.payload.message),
        setRefreshListIndicator(Date.now()),
        router.push(`/tasks/sheet/${sheetId}`) 
      ) : (
        toast.error(res.payload.message)
      )

    })
  }

  const getDocumentList = async(sheetid: string) => {
    try {

      // const url = [2, 3].includes(permision.permissionType.id) ? `${API_BASE_URL}/sheetdocid/get-user-docs?sheetId=${sheetid}` : `${API_BASE_URL}/sheetdocid/get-user-docs?sheetId=${sheetid}&userId=${logintype.data.id}`
      const url = `${API_BASE_URL}/sheetdocid/get-user-docs?sheetId=${sheetid}`

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
  
  const downloadfn = async(documentId:any) => {

    try {
      const response = await fetch(`${API_BASE_URL}/downloadexcel?documentId=${documentId}`, {
        method: 'GET',
        headers: {
          // Accept: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          'Content-Type': 'application/octet-stream',
        },
      
      });

      if (!response.ok) {
        throw new Error('Failed to download details: ' + response.statusText);
      }

      const filename = response.headers.get("Content-Disposition")?.split('=')[1];

      const blob = await response.blob();

      // console.log(response.headers.get("Content-Disposition"))
      saveAs(blob, filename);
    } catch (error) {
      console.error('Failed to download file:', error);
    }
  }


  const RowMenu = (props: any) => {
    return (
    <>
      <Button 
      slots={{ root: IconButton }}
      slotProps={{ root: { variant: 'plain', color: 'neutral', size: 'sm' } }}
    >
      <EditIcon onClick={() => router.push(`/tasks/sheet/${props.sheetId}/${props.documentId}`)}/>
    </Button>
    <Button 
      slots={{ root: IconButton }}
      slotProps={{ root: { variant: 'plain', color: 'neutral', size: 'sm' } }}
    >
      <DownloadIcon onClick={() => downloadfn(props.documentId)}/>
    </Button>
    </>
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

  React.useEffect(()=>{

    let fetchData = async () =>{
      let sheetDetails = await getSheetDetails(params.id)
      let permissionResponse = await getUserPermission()
      setSheetName(sheetDetails.data[0].sheetName)
      setPermission(permissionResponse.data[0])
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[createdocuments])


  React.useEffect(() => {

    const fetchData = async () => {
      let resposne = await getDocumentList(params.id)
      setDocumentList(resposne.data)
    }
    fetchData()

  //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params,permision,refreshListIndicator])


  return (
    <>
      <Box marginTop={2}>
        <ToastContainer />
        <Typography level='title-lg' color='warning'>Document List</Typography>
        <Divider/>
        <Stack direction={'row'}  justifyContent="space-between"  spacing={3} marginBottom={2} marginTop={2}>
        <Stack>
          <Typography level='title-sm' component="h1">{sheetName}</Typography>
          <Chip variant='soft' color="primary">{permision?.permissionType.permissionType}</Chip>
          {/* <Typography level='title-sm' component="h1" sx={{ marginBottom: "12px" }}>{permision.permissionType.id}</Typography> */}
        </Stack>
        <Stack direction={'row'} spacing={2} justifyContent={'flex-end'} alignItems={'flex-end'}>
        { [1].includes(permision?.permissionType.id) && <Button size='sm' color='primary' startDecorator={<Add />} onClick={() => createDocument(params.id, logintype.data.id, 1)}>
            Create New Document
          </Button>}
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
         
        </Stack>
        </Stack>
        <Divider/>
      </Box>
      <TableSection tableHeaders={headers} tableRows={rows} />
    </>
  );
}