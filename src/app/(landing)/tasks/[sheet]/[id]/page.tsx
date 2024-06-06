'use client';
import * as React from 'react';
import Box from '@mui/joy/Box';
import { useParams } from 'next/navigation'
import { Typography, Button, Stack, Link, Divider, Chip } from '@mui/joy';
import TableSection from '@/app/components/Common/TableSection';
import { Add } from '@mui/icons-material';
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/Store/store';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {createdocument} from '@/app/Reducers/CreateDocumentSlice';
import IconButton from '@mui/joy/IconButton';
import DownloadIcon from '@mui/icons-material/Download';
import EditIcon from '@mui/icons-material/Edit';
import { saveAs } from 'file-saver';
import {useAuth} from '@/app/hooks/useAuth';
import { useState,useEffect } from 'react';
import {useApi} from "@/app/api/hooks/useApi";
import {SheetRaw} from "@/app/types";
import {Document, JobAllocationDesignation,DesignationAction} from "@/app/types";
import {log} from "node:util";


export default function Log() {
  const auth =  useAuth();
  const params = useParams<{ sheet: string, id: string }>()
  const logintype = useSelector((state: RootState) => state?.user.data);
  const [designationId, setDesignationId] = useState(0)

  const createdocuments = useSelector((state:any) => state?.createdocuments?.data);

  const {data:sheetMaster, isLoading, fetchData:fetchSheetMaster } = useApi<SheetRaw>(`/sheetmaster/get-sheets?id=${parseInt(params.id)}`,{method:"GET"})
  const {data:documentList, fetchData:fetchDocumentList } = useApi<Document>(`/sheetdocid/get-user-docs?sheetId=${parseInt(params.id)}`, {method:"GET"})
  const {data:designationList, fetchData:fetchDesignationList } = useApi<JobAllocationDesignation>(`/joballocation/designation?userId=${logintype.data.id}&sheetId=${parseInt(params.id)}`,{method:"GET"})
  const {data:actionList, fetchData:fetchActionList } = useApi<DesignationAction>(`/designation/actions?sheetId=${parseInt(params.id)}&designationId=${designationId}`,{method:"GET"})


  const actionArray = actionList.map(i=> (i.actionMaster.actionName))
  const dispatch:any = useDispatch<AppDispatch>();


  const router = useRouter()



  useEffect(() => {
    !auth ? (
    localStorage.removeItem('accessToken'),
    dispatch({ type: "USER_LOGOUT" }),
    //setuser('')
    router.push("/", { scroll: false }) ): ( '' )
  }, [])


  React.useEffect(() => {

    fetchSheetMaster()
    fetchDocumentList()
    fetchDesignationList()
        //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params])


  React.useEffect(()=>{
    if(designationList.length > 0)
    setDesignationId(designationList[0].designationId)
  },[designationList])

  useEffect(() => {
    fetchActionList()
  }, [designationId]);


  async function createDocument(sheetId: string, userId: number, transitionId: number) {
    const passData = {
      'sheetId' : sheetId,
      'userId' : userId,
      'transitionId' : transitionId
    }
    dispatch(createdocument(passData)).then((res:any) => {
     alert(res.payload.status)
      res.payload.status == 200 ? (
        toast.success(res.payload.message),
        fetchDocumentList()
      ) : (

        toast.error(res.payload.message)
      )

    })
  }


  const downloadfn = async(documentId:any) => {

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/downloadexcel?documentId=${documentId}`, {
        method: 'GET',
        // headers: {
        //   Accept: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        //   'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        // },
        headers: {
          
          Authorization: "Bearer "  + auth,
        }
      
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
  const rows = documentList?.map((o) => (
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




  return (
    <>
    {auth ? (
      <>
      <Box marginTop={2}>
        <ToastContainer />
        <Typography level='title-lg' color='warning'>Document List</Typography>
        <Divider/>
        <Stack direction={'row'}  justifyContent="space-between"  spacing={3} marginBottom={2} marginTop={2}>
        <Stack>
          {sheetMaster.length > 0 && <Typography level='title-sm' component="h1">{sheetMaster[0].sheetName}</Typography>}
          {designationList.length > 0 && <Chip variant={'solid'} size={'sm'} color={'primary'}> {designationList[0].designationMaster.designationName}</Chip>}
        </Stack>
        <Stack direction={'row'} spacing={2} justifyContent={'flex-end'} alignItems={'flex-end'}>
        { actionArray.includes('SAVE_DRAFT') && <Button size='sm' color='primary' startDecorator={<Add />} onClick={() => createDocument(params.id, logintype.data.id, 1)}>
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
      <TableSection tableHeaders={headers} tableRows={rows} action={true}/>
      </>
    )
    : 
    ('Session Timed Out')
    }
    </>
    
  );
}