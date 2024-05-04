'use client';
import * as React from 'react';
import Box from '@mui/joy/Box';
import { useState } from 'react';
import { useParams } from 'next/navigation'
import { AccordionGroup, FormControl, FormLabel, Tab, TabList, TabPanel, Tabs, Typography, Table, Sheet, Button, Stack, Link, Divider, Card, CardContent, CardActions, ListItemDecorator, Badge } from '@mui/joy';
import { Accordion, AccordionDetails, AccordionSummary, Input } from '@mui/joy';
import { useSelector } from 'react-redux';

import { RootState } from "@/app/Store/store";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MyMessages from '@/app/components/MyMessages';
import { API_BASE_URL } from '@/app/config';
import { ChatProps } from '@/app/types';

import LogForm from '@/app/components/Forms/LogForm'
import { FormData, Reccod,RecordReading } from '@/app/types';
import { formDataInitalState, recordMasterInitialState } from '@/app/InitialStates/initialState';

var _array = require('lodash/array');

var jmespath = require("jmespath");

interface LogProps {
  sheetid: string;
}



async function getSheetFields(sheetid: string) {
  try {

    const response = await fetch(`${API_BASE_URL}/forms/get?id=${sheetid}`, {
      method: 'GET',
      headers: {
        Accept: "application/json",
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user details: " + response.statusText);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user details:", error);
  }
}
async function getDocumentShift(documentId: string) {
  try {

    const response = await fetch(`${API_BASE_URL}/docshiftstate/get?id=${documentId}`, {
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
async function getDocumentRecords(documentId: string, shiftId: number) {
  try {

    const response = await fetch(`${API_BASE_URL}/recordmaster/get-records?docId=${documentId}&shiftId=${shiftId}`, {
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
async function getDocumentReviews(documentId: string) {
  try {

    const response = await fetch(`${API_BASE_URL}/review/get?id=${documentId}`, {
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
async function getUserPermission(sheetId: string, userId: number) {
  try {

    const response = await fetch(`${API_BASE_URL}/joballocation/get-permissions?userId=${userId}&sheetId=${sheetId}`, {
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
async function getDocumentTransitionId(documentId: string) {
  try {

    const response = await fetch(`${API_BASE_URL}/sheetdocid/get-transition?docId=${documentId}`, {
      method: 'GET',
      headers: {
        Accept: "application/json",
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch document Transition: ' + response.statusText);
    }
    const data = await response.json();
    return data
  } catch (error) {
    console.error('Error fetching user details:', error);
  }
}

const prepareFields = (formData: FormData[]):RecordReading[] => {
  const arr:any = []
  formData.forEach(gr => {
    gr.groupMaster.groupParameters.forEach(gp => {
      gp.parameterMaster.paramterFields.forEach(pf => {
        pf.fieldMaster.fieldReading.forEach(read => {
          arr.push({ readingId: read.readingId, fieldId: read.fieldId, parameterId: gp.parameterMaster.id, groupId: gr.id })
        })
      })
    })
  })

  return arr.flat()

}


export default function Log() {

  const [index, setIndex] = React.useState(0);
  const [expandIndex, setExpandIndex] = React.useState<number | null>(0);
  const [sheetPermissionId, setSheetPermissionId] = React.useState<number>(0);



  const [formData, setFormData] = React.useState<FormData[]>(formDataInitalState);

  const params = useParams<{ id: string, document: string }>()
  const [documentTransitionId, setDocumentTransistionId] = useState({
    "id": 0,
    "createdAt": "",
    "updatedAt": "",
    "sheetId": 0,
    "userId": 0,
    "transitionId": 1,
    "transitionMaster": {
      "transitionName": "Draft"
    }
  });
  const [parameters, setParameters] = useState({ id: "", sheetName: "", description: "", parameterMaster: [{ id: "", parameterName: "", fieldMaster: [{ id: "", fieldName: "", fieldId: "" }] }] });

  const logintype = useSelector((state: RootState) => state?.user.data);

  const [relaodData, setReloadData] = useState(Date.now());

  const [showReview, setShowReview] = useState(false);


  const [shiftDetails, setShiftDetails] = useState([{

    "id": 1,
    "createdAt": "2024-04-21T13:20:09.387Z",
    "updatedAt": "2024-04-21T13:20:09.387Z",
    "docId": 1,
    "shiftId": 1,
    "shiftStatus": "Active",
    "shiftMaster": {
      "shiftType": "Shift A"
    }
  }])

  const [currentShift, setCurrentShift] = useState(shiftDetails[0].shiftId)
  const [documentRecord, setDocumentRecord] = useState<Reccod[]>(recordMasterInitialState)

  const [fieldRecord, setFieldRecord] = useState<RecordReading[]>(prepareFields(formData))

  const [reviews, setReivews] = useState<ChatProps[]>([
    {
      "id": "1",
      "createdAt": "2024-04-26T05:26:59.637Z",
      "updatedAt": "2024-04-26T05:26:59.637Z",
      "docId": 232,
      "createdBy": 2,
      "summary": "Pls check temperature limit",
      "users": {
        "userName": "Bharani1"
      },
      "comments": [
        {
          "id": 1,
          "createdAt": "",
          "updatedAt": "",
          "reviewId": 1,
          "comments": "",
          "createdBy": 1,
          "users": {
            "userName": ""
          }
        }
      ]
    }
  ])

  const decideShowReview = () => {

    // Permission operator and review length < 1 don't show
    // operator 1, // shift 2 // sec 3
    let show = false;
    show = [2, 3].includes(sheetPermissionId) ? true : [1].includes(sheetPermissionId) && reviews.length > 0 ? true : false
    setShowReview(show)

  }

  React.useEffect(() => {
    decideShowReview();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sheetPermissionId])

  React.useEffect(() => {

    let fetchFromServer = async () => {
      let reviewResp = await getDocumentReviews(params.document);
      // let permissionData = await getUserPermission(params.id, logintype.data.id)

      let fieldResp = await getSheetFields(params.id)
      let shiftResp = await getDocumentShift(params.document)
      let permissionData = await getUserPermission(params.id, logintype.data.id)

      let documentTransitioResp = await getDocumentTransitionId(params.document)

      // setParameters(fieldResp.data)
      setFormData(fieldResp.data)
      setFieldRecord(prepareFields(fieldResp.data))
      setShiftDetails(shiftResp.data)
      setSheetPermissionId(permissionData.data[0].permissionType.id)

      setReivews(reviewResp.data)
      setDocumentTransistionId(documentTransitioResp.data[0])

    }
    fetchFromServer()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params])


  // React.useEffect(() => {

  //   const fetchData = async () => {
  //     let fieldResp = await getSheetFields(params.id)
  //     let shiftResp = await getDocumentShift(params.document)
  //     let permissionData = await getUserPermission(params.id, logintype.data.id)

  //     setParameters(fieldResp.data)
  //     setShiftDetails(shiftResp.data)
  //     setSheetPermissionId(permissionData.data[0].permissionType.id)
  //   }
  //   fetchData();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [params])

  React.useEffect(() => {
    setCurrentShift(shiftDetails[index].shiftId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index])

  React.useEffect(() => {
    let records = jmespath.search(parameters, "parameterMaster[].fieldMaster[].{fieldId:id,parameterId:parameterId}")
    setFieldRecord(records)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parameters])

  React.useEffect(() => {

    const fetchData = async () => {

      let documentRecordResp = await getDocumentRecords(params.document, currentShift)

      let mergedFiledDocumentRecord = fieldRecord.map((f: RecordReading) => {
        let initialObject = { "createdBy": logintype.data.id, "updatedBy": logintype.data.id, "transitionId": 1, "fieldValue": "", "documentId": parseInt(params.document), "shiftId": currentShift }
        let combinedInitialFiled = Object.assign(initialObject, f)
        let matchedRecord = documentRecordResp.data.find((rec: Reccod) => rec.readingId === f.readingId && rec.fieldId === f.fieldId && rec.groupId===f.groupId && rec.parameterId===f.parameterId)
        let finalFiledDocumentRecord = Object.assign(combinedInitialFiled, matchedRecord)
        return finalFiledDocumentRecord
      })
      console.log(fieldRecord);
      setDocumentRecord(mergedFiledDocumentRecord)

    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentShift, fieldRecord, relaodData])




  const saveRecordChnages = async (transistionId: number) => {
    try {
      let setDocumentRecordTransitionState = documentRecord.map((rec) => (Object.assign({}, rec, { "transitionId": transistionId, "updatedBy": logintype.data.id })))
      const response = await fetch(`${API_BASE_URL}/forms/save`, {
        method: 'POST',
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ "data": setDocumentRecordTransitionState })
      });
      setReloadData(Date.now());
      toast.success("Record Changes Saved Successfully");
      if (!response.ok) {
        throw new Error(
          "Failed to save record changes: " + response.statusText
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  return (
    <Sheet variant='outlined' sx={{ px: 2, py: 2, borderRadius: 'sm' }}>
      <Box marginTop={2}>
        <ToastContainer />
        <Box>
          <Stack direction={'row'} justifyContent="space-between" spacing={2} marginBottom={2}>
            <Typography level='title-lg' component="h1" sx={{ marginBottom: "12px" }}>{formData[0].sheetId}</Typography>
            {/* <Typography level='title-lg' component="h1" sx={{ marginBottom: "12px" }}>{sheetPermissionId}</Typography> */}

            <Link
              underline="hover"
              color="primary"
              href={`/tasks/sheet/${params.id}`}
              fontSize={12}
              fontWeight={500}
            >
              Go Back to Document List
            </Link>
          </Stack>
          <Card variant="soft" color="primary">
            <Typography
              level="title-md"
              textColor="inherit"
              sx={{ textTransform: 'capitalize' }}
            >Data Entry</Typography>
            <CardContent>
              <Tabs
                value={index}
                onChange={(event, value) => setIndex(value as number)}
              >
                <TabList>
                  {
                    shiftDetails && shiftDetails.map((s) => (
                      <Tab key={`tab_shift_${s.shiftId}`} disabled={s.shiftStatus != 'Active'} variant='solid' color='primary' indicatorInset>{s.shiftMaster.shiftType}</Tab>
                    ))
                  }
                </TabList>
                <TabPanel value={index} variant='soft' color='primary' >
                  {/* {parameters.parameterMaster && <AccordionGroup size='sm' sx={{ minWidth: "60dvw", borderRadius: 'md', }} variant="outlined"
                    transition="0.2s" color='neutral' >
                    {
                      parameters.parameterMaster.map((paramter, index) => (
                        <Accordion key={`paramater_${paramter.id}`}
                          expanded={index === expandIndex}
                          onChange={(event, expanded) => {
                            setExpandIndex(expanded ? index : null);
                          }}
                          variant='soft'
                          sx={{ borderRadius: 'md' }}
                        >
                          <AccordionSummary >
                            {paramter.parameterName}
                          </AccordionSummary>
                          <AccordionDetails>
                            <Sheet sx={{ height: 400, overflow: 'auto' }}>
                              <Table hoverRow >
                                <tbody>
                                  {

                                    paramter.fieldMaster && paramter.fieldMaster.map((field) => (

                                      <tr key={`field_${field.fieldId}`}>
                                        <td>
                                          {field.fieldName}
                                        </td>
                                        <td>
                                          <Input key={`input_key_${field.id}`} size='sm' value={getFieldValue(field.id, paramter.id)} onChange={(e) => updateValue(e, field.id, paramter.id)} disabled={documentTransitionId.transitionId!=1} />
                                        </td>
                                      </tr>

                                    ))

                                  }
                                </tbody>
                              </Table>
                            </Sheet>
                          </AccordionDetails>
                        </Accordion>
                      ))
                    }

                  </AccordionGroup>
                  } */}

                  <LogForm formData={formData} recordMasterData={documentRecord} setDocumentRecord={setDocumentRecord} documentTransitionState={documentTransitionId.transitionId}/>
                </TabPanel>
              </Tabs>
            </CardContent>
            <CardActions buttonFlex="0 1 220px">

              {[1].includes(documentTransitionId.transitionId) && <Button size='sm' variant='outlined' color='primary' onClick={() => { saveRecordChnages(1) }} sx={{ ml: 'auto' }}>
                Save draft
              </Button>}
              {sheetPermissionId == 1 && <Button size='sm' color='success' onClick={() => { saveRecordChnages(2) }} disabled={documentTransitionId.transitionId != 1} sx={{ ml: 'auto' }}>
                Send for Supervisor Approval
              </Button>}
              {sheetPermissionId == 2 && <Button size='sm' color='success' onClick={() => { saveRecordChnages(3) }} disabled={documentTransitionId.transitionId != 2} sx={{ ml: 'auto' }}>
                Send for Engineer Approval
              </Button>}
              {sheetPermissionId == 3 && <Button size='sm' color='success' onClick={() => { saveRecordChnages(4) }} sx={{ ml: 'auto' }}>
                Approve Document
              </Button>}
            </CardActions>


          </Card>
        </Box>
        {/* <Divider /> */}
        <Box marginTop={2}>
          <Card invertedColors size='sm' >
            <Typography
              level="title-md"
              textColor="inherit"
              sx={{ textTransform: 'capitalize' }}
            >Audit Info</Typography>
            <CardContent>
              <Tabs
                aria-label="tabs"
              // value={index}
              // onChange={(event, newValue) => setIndex(newValue as number)}
              >
                <TabList >
                  <Tab indicatorPlacement="top" variant='soft' color='neutral'>
                    {/* <Badge badgeContent={reviews.length} variant='solid' color='danger'> */}
                    <Typography> Reviews</Typography>
                    {/* </Badge> */}
                  </Tab>
                </TabList>
                <TabPanel>
                  {showReview && <MyMessages chats={reviews} permissionId={sheetPermissionId} docId={parseInt(params.document)} />}
                </TabPanel>
              </Tabs>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Sheet>
  );
}
