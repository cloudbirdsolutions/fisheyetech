'use client';
import * as React from 'react';
import Box from '@mui/joy/Box';
import { useParams } from 'next/navigation'
import { Typography, Button, Stack, Link, Divider, Chip, ModalDialog } from '@mui/joy';
import TableSection from '@/app/components/Common/TableSection';
import { Add } from '@mui/icons-material';
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/Store/store';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createdocument } from '@/app/Reducers/CreateDocumentSlice';
import IconButton from '@mui/joy/IconButton';
import DownloadIcon from '@mui/icons-material/Download';
import EditIcon from '@mui/icons-material/Edit';
import { saveAs } from 'file-saver';
import { useAuth } from '@/app/hooks/useAuth';
import { useState, useEffect } from 'react';
import { useApi } from "@/app/api/hooks/useApi";
import { SheetRaw } from "@/app/types";
import { Document, JobAllocationDesignation, DesignationAction } from "@/app/types";
import { log } from "node:util";
import DateControlSearch from '@/app/components/Tasks/Dateseaerch';
import moment from "moment";
import Modal from '@mui/joy/Modal';
import Radio from '@mui/joy/Radio';
import { Shift } from "@/app/types"
export default function Log() {
  const auth = useAuth();
  const params = useParams<{ sheet: string, id: string }>()
  const logintype = useSelector((state: RootState) => state?.user.data);
  const [designationId, setDesignationId] = useState(0)

  const createdocuments = useSelector((state: any) => state?.createdocuments?.data);

  const { data: sheetMaster, isLoading, fetchData: fetchSheetMaster } = useApi<SheetRaw>(`/sheetmaster/get-sheets?id=${parseInt(params.id)}`, { method: "GET" })

  // const {data:documentList, fetchData:fetchDocumentList } = useApi<Document>(`/sheetdocid/get-user-docs?sheetId=${parseInt(params.id)}`, {method:"GET"})
  const { data: designationList, fetchData: fetchDesignationList } = useApi<JobAllocationDesignation>(`/joballocation/designation?userId=${logintype.data.id}&sheetId=${parseInt(params.id)}`, { method: "GET" })
  const { data: actionList, fetchData: fetchActionList } = useApi<DesignationAction>(`/designation/actions?sheetId=${parseInt(params.id)}&designationId=${designationId}`, { method: "GET" })

  // const [searchStartDate,setSearchStartDate]=React.useState<string>(moment().format("YYYY-MM-DD"))
  // const [searchEndDate,setSearchEndDate]=React.useState<string>(moment().format("YYYY-MM-DD"))


  const [searchStartDate, setSearchStartDate] = useState<string>('');
  const [searchEndDate, setSearchEndDate] = useState<string>('');

  const { data: documentList, fetchData: fetchDocumentList } = useApi<Document>(
    `/sheetdocid/get-user-docs?sheetId=${parseInt(params.id)}${searchStartDate ? `&createdAt=${searchStartDate}` : ''}${searchEndDate ? `&updatedAt=${searchEndDate}` : ''}`,
    { method: "GET" }
  );
  const {
    data: shifts, isLoading: isShiftLoading, error: shiftError, fetchData: fetchShiftList
  } = useApi<Shift>(`/sheetshiftmaster/get-shift?id=${parseInt(params.id)}`, { method: 'GET' });

  const actionArray = actionList.map(i => (i.actionMaster.actionName))
  const dispatch: any = useDispatch<AppDispatch>();

  const router = useRouter()

  useEffect(() => {
    !auth ? (
      localStorage.removeItem('accessToken'),
      dispatch({ type: "USER_LOGOUT" }),
      //setuser('')
      router.push("/", { scroll: false })) : ('')
  }, [])

  React.useEffect(() => {
    fetchSheetMaster()
    fetchDocumentList()
    fetchDesignationList()
    fetchShiftList()
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params, searchStartDate, searchEndDate])

  React.useEffect(() => {
    if (designationList.length > 0)
      setDesignationId(designationList[0].designationId)
  }, [designationList])

  useEffect(() => {
    fetchActionList()
  }, [designationId]);


  async function createDocument(sheetId: string, userId: number, transitionId: number) {
    const passData = {
      'sheetId': sheetId,
      'userId': userId,
      'transitionId': transitionId
    }
    dispatch(createdocument(passData)).then((res: any) => {

      res.payload.status == 200 ? (
        toast.success(res.payload.message),
        fetchDocumentList()
      ) : (

        toast.error(res.payload.message)
      )

    })
  }

  const handleReset = () => {
    setSearchEndDate('');
    setSearchStartDate('');
    fetchDocumentList();

  }



  const RowMenu = (props: any) => {
    const isDisabled = props.transitionId === 5;
    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = React.useState('');

    const [documentssId, setDocumentssId] = React.useState(0)
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedValue(event.target.value);
      setOpen(true);
    };

    const handleDownload = async (documentId: any, selectedValue: string) => {
      // Perform download action here based on selectedValue
      console.log(`Downloading sheet with ID: ${selectedValue}`);
      setOpen(false); // Close modal after download
      // await downloadfn(documentId, selectedValue, auth);

    };
    const downloadfn = async (documentId: any) => {
      
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/downloadexcel?documentId=${documentId}&shiftType=${selectedValue}`, {
          method: 'GET',
          // headers: {
          //   Accept: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          //   'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          // },
          headers: {
            Authorization: "Bearer " + auth,
          } 
        });
        if (!response.ok) {
          throw new Error('Failed to download details: ' + response.statusText);
        }
        const filename = response.headers.get("Content-Disposition")?.split('=')[1];
        const blob = await response.blob();

        // console.log(response.headers.get("Content-Disposition"))
        saveAs(blob, filename);
        setOpen(false); 
      } catch (error) {
        console.error('Failed to download file:', error);
      }
    }
    return (
      <>
        <Button
          slots={{ root: IconButton }}
          slotProps={{ root: { variant: 'plain', color: 'neutral', size: 'sm', disabled: isDisabled } }}
        >
          <EditIcon onClick={() => !isDisabled && router.push(`/tasks/sheet/${props.sheetId}/${props.documentId}`)} />
        </Button>

        {/* <Button
          slots={{ root: IconButton }}
          slotProps={{ root: { variant: 'plain', color: 'neutral', size: 'sm' } }}
        >
          <DownloadIcon onClick={() => downloadfn(props.documentId)} />
        </Button> */}
        <Button
          slots={{ root: IconButton }}
          slotProps={{ root: { variant: 'plain', color: 'neutral', size: 'sm' } }}
        >
          <DownloadIcon onClick={() => setOpen(true)} />
        </Button>
        <Modal open={open} onClose={() => setOpen(false)}>
          <ModalDialog
            aria-labelledby="nested-modal-title"
            aria-describedby="nested-modal-description"
            sx={(theme) => ({
              [theme.breakpoints.only('xs')]: { top: 'unset', bottom: 0, left: 0, right: 0, borderRadius: 0, transform: 'none', maxWidth: 'unset', },
            })}
          >
            <Typography sx={{ fontWeight: 'bold' }}>Download Sheet</Typography>
            {/* Mapping over shifts */}
            {shifts.map((shift) => (
              <Box key={shift.id}>
                {/* Conditionally rendering based on shiftId */}
                {shift.shiftId == 4 && (
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Radio
                      checked={selectedValue == '4'}
                      onChange={handleChange}
                      value="4"
                      name="radio-buttons"
                      slotProps={{ input: { 'aria-label': '4' } }}
                    />
                    <Typography>General</Typography>
                  </Box>
                )}
                {(shift.shiftId == 1 || shift.shiftId == 2 || shift.shiftId == 3 ) && (
                  <Box sx={{ display: 'flex', gap: 6 }}>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      {shift.shiftId == 1 && (
                        <Radio
                          checked={selectedValue == '1'}  onChange={handleChange}
                          value="1"
                          name="radio-buttons"
                          slotProps={{ input: { 'aria-label': '1' } }}
                        />
                      )}
                      {shift.shiftId == 2 && (
                        <Radio
                          checked={selectedValue == '2'} onChange={handleChange} value="2" name="radio-buttons"
                          slotProps={{ input: { 'aria-label': '2' } }}
                        />
                      )}
                      {shift.shiftId == 3 && (
                        <Radio
                          checked={selectedValue == '3'} onChange={handleChange} value="3"
                          name="radio-buttons"
                          slotProps={{ input: { 'aria-label': '3' } }}
                        />
                      )}
                     
                      <Typography>
                        {shift.shiftId === 1 ? 'Shift A' : (shift.shiftId === 2 ? 'Shift B' : 'Shift C')}
                        {/* {shift.shiftId === 1 ? 'Shift A' : shift.shiftId === 2 ? 'Shift B' : 
                          shift.shiftId === 3 ? 'Shift C' : 'Shift D'} */}

                      </Typography>
                    </Box>
                   
                  </Box>
                  
                )}
              </Box>  
            ))}
            <Box
              sx={{
                mt: 1,
                display: 'flex',
                gap: 1,
                flexDirection: { xs: 'column', sm: 'row-reverse' },
              }}
            >
              {/* <Button
                slots={{ root: IconButton }}
                slotProps={{ root: { variant: 'plain', color: 'neutral', size: 'sm' } }}
              > Download
                <DownloadIcon onClick={() => downloadfn(props.documentId)} />
                  
              </Button> */}
              <Button
          slots={{ root: IconButton }}
          slotProps={{ root: { variant: 'plain', color: 'neutral', size: 'sm' } }}
        >
          <DownloadIcon onClick={() => downloadfn(props.documentId)} />
            
        </Button>
        {/* <Button
        variant="solid"
        color="primary"
        onClick={() => setSelectedValue('AllShifts')}
      >
        Download All Shifts
      </Button> */}
              {/* <Button variant="solid" color="primary" onClick={() => handleDownload(props.documentId)}>
                Download
              </Button> */}
              <Button variant="outlined" color="neutral" onClick={() => setOpen(false)}>
                Cancel
              </Button>

            </Box>
          </ModalDialog>
        </Modal>

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
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          {/* <RowMenu sheetId={o.sheetId} documentId={o.id} /> */}
          <RowMenu sheetId={o.sheetId} documentId={o.id} transitionId={o.transitionId} />

        </Box>
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

            <Stack marginBottom={2}>
              <DateControlSearch setSearchStartDate={setSearchStartDate} setSearchEndDate={setSearchEndDate} handleReset={handleReset} />
            </Stack>

            <Divider />
            <Stack direction={'row'} justifyContent="space-between" spacing={3} marginBottom={2} marginTop={2}>
              <Stack>
                {sheetMaster.length > 0 && <Typography level='title-sm' component="h1">{sheetMaster[0].sheetName}</Typography>}
                {designationList.length > 0 && <Chip variant={'solid'} size={'sm'} color={'primary'}> {designationList[0].designationMaster.designationName}</Chip>}
              </Stack>
              <Stack direction={'row'} spacing={2} justifyContent={'flex-end'} alignItems={'flex-end'}>
                {actionArray.includes('SAVE_DRAFT') && <Button size='sm' color='primary' startDecorator={<Add />} onClick={() => createDocument(params.id, logintype.data.id, 1)}>
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
            <Divider />
          </Box>
          <TableSection tableHeaders={headers} tableRows={rows} action={true} />
        </>
      )
        :
        ('Session Timed Out')
      }
    </>

  );
}