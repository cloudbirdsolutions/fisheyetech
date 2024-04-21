'use client';
import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import { useState } from 'react';
import { useParams } from 'next/navigation'
import { AccordionGroup, FormControl, FormLabel, Tab, TabList, TabPanel, Tabs, Typography, Table, Sheet, Button, Stack, Link } from '@mui/joy';
import { Accordion, AccordionDetails, AccordionSummary, Input } from '@mui/joy';
import TableSection from '@/app/components/Common/TableSection';
import { Add } from '@mui/icons-material';

import { useRouter } from 'next/navigation'


interface LogProps {
  sheetid: string
}

async function getDocumentList(sheetid: string) {
  try {

    const response = await fetch(`http://51.79.147.139:3000/sheetdocid/get?sheetId=${sheetid}`, {
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

async function  createDocument(sheetId: string,userId: number){

  try {

    const response = await fetch(`http://51.79.147.139:3000/sheetdocid/create`, {
      method: 'POST',
      headers: {
        Accept: "application/json",
        'Content-Type': 'application/json',
      },
      body : JSON.stringify({"sheetId":parseInt(sheetId),"userId":userId}),
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
  const [documentList,setDocumentList] = useState([{id:"",createdAt:"",updatedAt:"",sheetId:"",userId:"",users:{userName:""}}])
  const router = useRouter()
  const RowMenu = (props:any)=>{
    return(
      <Button color="primary" variant="outlined" size='sm' startDecorator={<Add />} onClick={() => router.push(`/tasks/sheet/${props.sheetId}/${props.documentId}`)} >
    Log Data
  </Button>
    )
  }
  
  const headers = ["Created At","Updated At","Created By"]
  const rows = documentList.map((o)=>(
    <tr key={`document_id_${o.id}`}>
     <td><Typography level="body-xs">{o?.id}</Typography></td>
     <td><Typography level="body-xs">{o?.createdAt}</Typography></td>
     <td><Typography level="body-xs">{o?.updatedAt}</Typography></td>
     <td><Typography level="body-xs">{o?.users.userName}</Typography></td>
     <td>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}><RowMenu sheetId={o.sheetId} documentId={o.id} /></Box>
     </td>
    </tr>

  ))

  React.useEffect(() => {

    const fetchData = async () => {
      let resposne = await getDocumentList(params.id)
      setDocumentList(resposne.data)
    }
    fetchData()


  }, [params])


  return (
    <>
    <Box sx={{ display: 'flex' }} marginTop={2}>
      <Box>
        <Stack direction={'row'} justifyContent="space-between" spacing={2} marginBottom={2}>
        <Typography level='title-lg' component="h1" sx={{ marginBottom: "12px" }}>{params.id}</Typography>
        <Button size='sm' color='primary' startDecorator={<Add />} onClick={() => createDocument(params.id,2)}>
            Create New Document
        </Button>
        <Link
              underline="hover"
              color="neutral"
              href="/tasks"
              fontSize={12}
              fontWeight={500}
            >
              Go Back to Task List
            </Link>
        </Stack>
      </Box>
      
    </Box>
    <TableSection tableHeaders={headers} tableRows={rows}/>
    </>
  );
}
