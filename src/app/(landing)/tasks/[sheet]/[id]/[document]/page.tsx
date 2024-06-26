"use client";
import * as React from "react";
import Box from "@mui/joy/Box";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  Tab,
  TabList,
  TabPanel,
  Tabs,
  Typography,
  Sheet,
  Button,
  Stack,
  Link,
  Card,
  CardContent,
  CardActions,
} from "@mui/joy";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/Store/store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MyMessages from "@/app/components/MyMessages";
import {
  ChatProps,
  DesignationAction,
  DocShift,
  JobAllocationDesignation,
  AllowedTransitionAction,
  AllowedTransitionAudit,
} from "@/app/types";
import LogForm from "@/app/components/Forms/LogForm";
import { FormData, Reccod, RecordReading, SheetDocId } from "@/app/types";
import {
  fieldMappingInitialState,
  recordMasterInitialState,
} from "@/app/InitialStates/initialState";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/hooks/useAuth";
import TransitionTable from "@/app/components/TransitionAudit/TransitionTable";
import TransitionList from "@/app/components/TransitionAudit/TransitionList";
import { useApi } from "@/app/api/hooks/useApi";
// var _array = require('lodash/array');

var jmespath = require("jmespath");

const accessToken = window.localStorage.getItem("accessToken");

interface Operator {
  id: number;
  type: string;
}

async function getsheetName(documentId: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/sheetdocid/get-user-docs?id=${documentId}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch user details: " + response.statusText);
    }

    let data_json = await response.json();
    return data_json;
  } catch (error) {
    console.error("Error fetching user details:", error);
  }
}

async function getDocumentRecords(documentId: string, shiftId: number) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/recordmaster/get-records?docId=${documentId}&shiftId=${shiftId}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch user details: " + response.statusText);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user details:", error);
  }
}
async function getDocumentReviews(documentId: string, shiftId: number) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/review/get?id=${documentId}&shiftId=${shiftId}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch user details: " + response.statusText);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user details:", error);
  }
}
// async function getUserPermission(sheetId: string, userId: number) {
//   try {
//
//     const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/joballocation/get-permissions?userId=${userId}&sheetId=${sheetId}`, {
//       method: 'GET',
//       headers: {
//         Accept: "application/json",
//         'Content-Type': 'application/json',
//         Authorization: "Bearer "  + accessToken,
//       }
//     });
//
//     if (!response.ok) {
//       throw new Error('Failed to fetch user details: ' + response.statusText);
//     }
//     const data = await response.json();
//     return data
//   } catch (error) {
//     console.error('Error fetching user details:', error);
//   }
// }
async function getDocumentTransitionId(documentId: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/sheetdocid/get-transition?docId=${documentId}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        "Failed to fetch document Transition: " + response.statusText
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user details:", error);
  }
}
async function getFieldMapping(sheetId: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/sheetdependency/get?sheetId=${sheetId}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        "Failed to fetch document Transition: " + response.statusText
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user details:", error);
  }
}

// const prepareFields = (formData: FormData[]):RecordReading[] => {
//   const arr:any = []
//   formData.forEach(gr => {
//     gr.groupMaster.groupParameters.forEach(gp => {
//       gp.parameterMaster.paramterFields.forEach(pf => {
//         pf.fieldMaster.fieldReading.forEach(read => {
//           arr.push({ readingId: read.readingId, fieldId: read.fieldId, parameterId: gp.parameterMaster.id, groupId: gr.id})
//         })
//       })
//     })
//   })
//
//   return arr.flat()
//
// }

export default function Log() {
  const params = useParams<{ id: string; document: string }>();
  const router = useRouter();
  const logintype = useSelector((state: RootState) => state?.user.data);
  const [designationId, setDesignationId] = useState(0);

  const [sheetPermissionId, setSheetPermissionId] = React.useState<number>(0);

  // const [formData, setFormData] = React.useState<FormData[]>(formDataInitalState);

  const { data: formData, fetchData: fetchFormData } = useApi<FormData>(
    `/forms/get?id=${parseInt(params.id)}`,
    { method: "GET" }
  );
  const { data: shiftDetails, fetchData: fetchShiftDetails } = useApi<DocShift>(
    `/docshiftstate/get?id=${parseInt(params.document)}`,
    { method: "GET" }
  );
  const { data: designationList, fetchData: fetchDesignationList } =
    useApi<JobAllocationDesignation>(
      `/joballocation/designation?userId=${
        logintype.data.id
      }&sheetId=${parseInt(params.id)}`,
      { method: "GET" }
    );
  const { data: actionList, fetchData: fetchActionList } =
    useApi<DesignationAction>(
      `/designation/actions?sheetId=${parseInt(
        params.id
      )}&designationId=${designationId}`,
      { method: "GET" }
    );
  const { data: documentDetails, fetchData: fetchDocumentDetails } =
    useApi<SheetDocId>(
      `/sheetdocid/get-user-docs?id=${parseInt(params.document)}`,
      { method: "GET" }
    );
  const { data: allowedTransition, fetchData: fetchAllowedTransitions } =
    useApi<AllowedTransitionAction>(
      `/transitionaction/document/${parseInt(params.document)}`,
      { method: "GET" }
    );
  const { data: transitionAudit, fetchData: fetchTransitionAudit } =
    useApi<AllowedTransitionAudit>(
      `/transitionaudit?docId=${parseInt(params.document)}`,
      { method: "GET" }
    );

  const [index, setIndex] = React.useState(0);
  const allowedActionPerTransition = allowedTransition[index]
    ? allowedTransition[index].transitionMaster.transitionActions.map(
        (action) => action.actionMaster.actionName
      )
    : [];
  const checkAddNewReviewPermission = actionList
    .map((action) => action.actionMaster.actionName)
    .some((action) => ["SEND_FOR_APPROVAL", "COMPLETE"].includes(action));

  const [isUserInputDisabled, setIsUserInoutDisabled] = React.useState(true);

  const [documentTransitionId, setDocumentTransistionId] = useState({
    id: 0,
    createdAt: "",
    updatedAt: "",
    sheetId: 0,
    userId: 0,
    transitionId: 1,
    transitionMaster: {
      transitionName: "Draft",
    },
  });

  const [showReview, setShowReview] = useState(false);

  const [selectedShift, setSelectedShift] = useState(shiftDetails[0]);

  const [currentShift, setCurrentShift] = useState(shiftDetails[0]?.shiftId);
  const [documentRecord, setDocumentRecord] = useState<Reccod[]>(
    recordMasterInitialState
  );

  const [fieldRecord, setFieldRecord] = useState<RecordReading[]>(
    fieldMappingInitialState
  );

  const [sheetNames, setSheetName] = useState([
    {
      id: 271,
      createdAt: "2024-05-04T07:39:05.206Z",
      updatedAt: "2024-05-06T12:52:16.238Z",
      sheetId: 1,
      userId: 25,
      transitionId: 1,
      users: {
        userName: "no user",
      },
      transitionMaster: {
        transitionName: "Draft",
      },
      sheetMaster: {
        sheetName: "Loading...",
      },
    },
  ]);

  const [reviews, setReivews] = useState<ChatProps[]>([
    {
      id: "1",
      createdAt: "2024-04-26T05:26:59.637Z",
      updatedAt: "2024-04-26T05:26:59.637Z",
      docId: 232,
      createdBy: 2,
      summary: "Pls check temperature limit",
      users: {
        userName: "",
      },
      comments: [
        {
          id: 1,
          createdAt: "",
          updatedAt: "",
          reviewId: 1,
          comments: "",
          createdBy: 1,
          users: {
            userName: "",
          },
        },
      ],
    },
  ]);

  const dispatch = useDispatch<AppDispatch>();

  const auth = useAuth();
  useEffect(() => {
    !auth
      ? (localStorage.removeItem("accessToken"),
        dispatch({ type: "USER_LOGOUT" }),
        //setuser('')
        router.push("/", { scroll: false }))
      : "";
  }, []);

  const decideShowReview = () => {
    // Permission operator and review length < 1 don't show

    let show = reviews.length > 0 ? true : checkAddNewReviewPermission;
    setShowReview(show);
  };

  React.useEffect(() => {
    if (designationList.length > 0)
      setDesignationId(designationList[0].designationId);
  }, [designationList]);

  useEffect(() => {
    fetchActionList();
  }, [designationId]);

  React.useEffect(() => {
    decideShowReview();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sheetPermissionId, currentShift, reviews]);

  React.useEffect(() => {
    fetchFormData();
    fetchShiftDetails();
    fetchDesignationList();
    fetchDocumentDetails();
    fetchAllowedTransitions();
    fetchTransitionAudit();

    let fetchFromServer = async () => {
      let reviewResp = await getDocumentReviews(params.document, currentShift);
      // let permissionData = await getUserPermission(params.id, logintype.data.id)

      // let permissionData = await getUserPermission(params.id, logintype.data.id)
      let sheetdet = await getsheetName(params.document);
      let fieldMappingResp = await getFieldMapping(params.id);
      let documentTransitioResp = await getDocumentTransitionId(
        params.document
      );

      // setParameters(fieldResp.data)

      setFieldRecord(fieldMappingResp.data);

      // setCurrentShift((shiftResp.data[0]?.shiftId))
      // setSheetPermissionId(permissionData.data[0]?.permissionType.id)
      setSheetName(sheetdet.data);
      setReivews(reviewResp.data);
      setDocumentTransistionId(documentTransitioResp.data[0]);
      decideShowReview();
    };
    fetchFromServer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  React.useEffect(() => {
    setCurrentShift(shiftDetails[0]?.shiftId);
  }, [shiftDetails]);

  const decideDisable = () => {
    return (
      documentTransitionId.transitionId != 1 ||
      sheetPermissionId != 1 ||
      shiftDetails[index].shiftStatus != "Active"
    );
  };

  React.useEffect(() => {
    // decideShowReview();
    if (shiftDetails[index]) {
      setCurrentShift(shiftDetails[index]?.shiftId);
      // setIsInputDisabled(decideDisable())
      setSelectedShift(shiftDetails[index]);
      const fetchReview = async () => {
        let reviewResp = await getDocumentReviews(
          params.document,
          shiftDetails[index].shiftId
        );
        setReivews(reviewResp.data);
        decideShowReview();
      };
      fetchReview();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shiftDetails, index]);

  React.useEffect(() => {
    const fetchData = async () => {
      let documentRecordResp = await getDocumentRecords(
        params.document,
        currentShift
      );
      let reviewResp = await getDocumentReviews(params.document, currentShift);

      let mergedFiledDocumentRecord = fieldRecord.map((f: RecordReading) => {
        delete f.id;
        let initialObject = {
          createdBy: logintype.data.id,
          updatedBy: logintype.data.id,
          transitionId: 1,
          fieldValue: "",
          documentId: parseInt(params.document),
          shiftId: currentShift,
        };
        let combinedInitialFiled = Object.assign(initialObject, f);
        let matchedRecord = documentRecordResp?.data.find(
          (rec: Reccod) =>
            rec.readingId === f.readingId &&
            rec.fieldId === f.fieldId &&
            rec.groupId === f.groupId &&
            rec.parameterId === f.parameterId
        );
        let finalFiledDocumentRecord = Object.assign(
          combinedInitialFiled,
          matchedRecord
        );
        return finalFiledDocumentRecord;
      });
      // console.log(documentRecordResp);
      setDocumentRecord(mergedFiledDocumentRecord);
      setReivews(reviewResp.data);
      decideShowReview();
    };
    fetchData();
    // if (currentShift) fetchData();
    // setIsInputDisabled(decideDisable())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentShift, fieldRecord]);

  React.useEffect(() => {
    let inputDisabled =
      allowedActionPerTransition.includes("SAVE_DRAFT") &&
      actionList
        .map((action) => action.actionMaster.actionName)
        .includes("SAVE_DRAFT");

    setIsUserInoutDisabled(!inputDisabled);
  }, [allowedTransition, actionList]);

  React.useEffect(() => {
    // fetchAllowedTransitions()
    const allowedActionPerTransition =
      allowedTransition
        .find((t) => t.shiftId == selectedShift.shiftId)
        ?.transitionMaster.transitionActions.map(
          (action) => action.actionMaster.actionName
        ) || [];

    let inputDisabled =
      allowedActionPerTransition.includes("SAVE_DRAFT") &&
      actionList
        .map((action) => action.actionMaster.actionName)
        .includes("SAVE_DRAFT");

    setIsUserInoutDisabled(!inputDisabled);
  }, [selectedShift]);
  const latestOperator = jmespath.search(
    formData,
    `[].groupMaster.groupParameters[].parameterMaster.paramterFields[].fieldMaster[]|[?filedValueType=='dropdown_user']|[].{id:id,type:filedValueType}`
  );
  const latestReviewer = jmespath.search(
    formData,
    `[].groupMaster.groupParameters[].parameterMaster.paramterFields[].fieldMaster[]|[?filedValueType=='dropdown_approver']|[].{id:id,type:filedValueType}`
  );
  const latestApprover = jmespath.search(
    formData,
    `[].groupMaster.groupParameters[].parameterMaster.paramterFields[].fieldMaster[]|[?filedValueType=='dropdown_reviewer']|[].{id:id,type:filedValueType}`
  );
  console.log(latestOperator, "document");
  const saveRecordChnages = async (transistionId: number) => {
    try {
      let setDocumentRecordTransitionState = documentRecord.map((rec) => {
        let matchingOperator = latestOperator.find(
          (op: Operator) => op.id === rec.fieldId
        );
  
        let matchingReviewer = latestReviewer.find(
          (reviewer: Operator) => reviewer.id === rec.fieldId
        );
  
        let matchingApprover = latestApprover.find(
          (approver: Operator) => approver.id === rec.fieldId
        );
  
        if (matchingOperator) {
          rec.fieldValue = matchingOperator.fieldValue;
        } else if (matchingReviewer) {
          rec.fieldValue = matchingReviewer.fieldValue;
        } else if (matchingApprover) {
          rec.fieldValue = matchingApprover.fieldValue;
        }
  
        return Object.assign({}, rec, {
          transitionId: transistionId,
          updatedBy: logintype.data.id,
        });
      });
  
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_HOST}/forms/save`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + accessToken,
          },
          body: JSON.stringify({ data: setDocumentRecordTransitionState }),
        }
      );
  
      if (!response.ok) {
        throw new Error(
          "Failed to save record changes: " + response.statusText
        );
      }
  
      const data = await response.json();
      toast.success("Record Changes Saved Successfully");
      router.push("/tasks", { scroll: false });
      return data;
    } catch (error) {
      console.error("Error saving record changes:", error);
      toast.error("Error saving record changes");
    }
  };
  

  // const saveRecordChnages = async (transistionId: number) => {
  //   try {
  //     let setDocumentRecordTransitionState = documentRecord.map((rec) =>
  //       Object.assign({}, rec, {
  //         transitionId: transistionId,
  //         updatedBy: logintype.data.id,
  //       })
  //     );
  //     const response = await fetch(
  //       `${process.env.NEXT_PUBLIC_API_HOST}/forms/save`,
  //       {
  //         method: "POST",
  //         headers: {
  //           Accept: "application/json",
  //           "Content-Type": "application/json",
  //           Authorization: "Bearer " + accessToken,
  //         },
  //         body: JSON.stringify({ data: setDocumentRecordTransitionState }),
  //       }
  //     );

  //     toast.success("Record Changes Saved Successfully");
  //     router.push("/tasks", { scroll: false });

  //     if (!response.ok) {
  //       throw new Error(
  //         "Failed to save record changes: " + response.statusText
  //       );
  //     }

  //     const data = await response.json();
  //     return data;
  //   } catch (error) {
  //     console.error("Error fetching user details:", error);
  //   }
  // };
  const sendForApproval = async (transitionId: number) => {
    saveRecordChnages(transitionId).then(async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_HOST}/sheetdocid/send-approval`,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + accessToken,
            },
            body: JSON.stringify({
              docId: parseInt(params.document),
              shiftId: currentShift,
              transitionId,
              userId: logintype.data.id,
            }),
          }
        );

        toast.success("Moved Document to next Level");
        router.push("/tasks", { scroll: false });

        if (!response.ok) {
          throw new Error(
            "Failed to change document status: " + response.statusText
          );
        }

        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    });
  };

  const ACTION_FUNC_MAP: { [key: string]: Function } = {
    SAVE_DRAFT: saveRecordChnages,
    SEND_FOR_REVIEW: sendForApproval,
    SEND_FOR_APPROVAL: sendForApproval,
    COMPLETE: sendForApproval,
  };

  return (
    <>
      {auth ? (
        <Sheet variant="outlined" sx={{ px: 2, py: 2, borderRadius: "sm" }}>
          <Box marginTop={2}>
            <ToastContainer />

            <Box>
              <Stack
                direction={"row"}
                justifyContent="space-between"
                spacing={2}
                marginBottom={2}
              >
                <Typography
                  level="title-lg"
                  component="h1"
                  sx={{ marginBottom: "12px" }}
                >
                  {documentDetails[0]?.sheetMaster.sheetName}
                </Typography>
                <Typography
                  level="title-sm"
                  component="h4"
                  sx={{ marginBottom: "12px" }}
                >
                  {documentDetails[0]?.transitionMaster.transitionName}
                </Typography>

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
                  sx={{ textTransform: "capitalize" }}
                >
                  Data Entry
                </Typography>
                <CardContent>
                  <Tabs
                    value={index}
                    onChange={(event, value) => setIndex(value as number)}
                  >
                    <TabList>
                      {shiftDetails &&
                        shiftDetails.map((s) => (
                          <Tab
                            key={`tab_shift_${s.shiftId}`}
                            disabled={
                              s.shiftStatus.toLowerCase() === "inactive"
                            }
                            variant="solid"
                            color="primary"
                            indicatorInset
                          >
                            {s.shiftMaster.shiftType}
                          </Tab>
                        ))}
                    </TabList>
                    <TabPanel value={index} variant="soft" color="primary">
                      <LogForm
                        formData={formData}
                        recordMasterData={documentRecord}
                        setDocumentRecord={setDocumentRecord}
                        documentTransitionState={
                          documentTransitionId.transitionId
                        }
                        documentDetails={documentDetails}
                        fieldMapping={fieldRecord}
                        sheetPermissionId={sheetPermissionId}
                        isInputDisabled={isUserInputDisabled}
                        transitionAudit={transitionAudit}
                      />
                    </TabPanel>
                  </Tabs>
                </CardContent>
                <CardActions buttonFlex="0 1 220px">
                  {actionList.length > 0 &&
                    actionList.map((action, index) => (
                      <Button
                        size="sm"
                        variant="solid"
                        key={action.actionId + action.actionMaster.actionName}
                        disabled={
                          !allowedActionPerTransition.includes(
                            action.actionMaster.actionName
                          )
                        }
                        onClick={() => {
                          ACTION_FUNC_MAP[action.actionMaster.actionName](
                            action.actionMaster.transitionMaster.id
                          );
                        }}
                      >
                        {action.actionMaster.buttonName}
                      </Button>
                    ))}
                </CardActions>
              </Card>
            </Box>
            {/* <Divider /> */}
            <Box marginTop={2}>
              <Card invertedColors size="sm">
                <Typography
                  level="title-md"
                  textColor="inherit"
                  sx={{ textTransform: "capitalize" }}
                >
                  Audit Info
                </Typography>
                {/* <Typography
              level="title-md"
              textColor="inherit"
              sx={{ textTransform: 'capitalize' }}
            >{JSON.stringify(showReview)}</Typography>
            <Typography
              level="title-md"
              textColor="inherit"
              sx={{ textTransform: 'capitalize' }}
            >{JSON.stringify(reviews.length)}</Typography>
            <Typography
              level="title-md"
              textColor="inherit"
              sx={{ textTransform: 'capitalize' }}
            >{JSON.stringify(sheetPermissionId)}</Typography> */}
                <CardContent>
                  <Tabs
                    aria-label="tabs"
                    defaultValue={0}
                    // value={index}
                    // onChange={(event, newValue) => setIndex(newValue as number)}
                  >
                    <TabList>
                      <Tab
                        indicatorPlacement="top"
                        variant="soft"
                        color="neutral"
                      >
                        {/* <Badge badgeContent={reviews.length} variant='solid' color='danger'> */}
                        <Typography> Reviews</Typography>
                        {/* </Badge> */}
                      </Tab>
                      <Tab
                        indicatorPlacement="top"
                        variant="soft"
                        color="neutral"
                      >
                        {/* <Badge badgeContent={reviews.length} variant='solid' color='danger'> */}
                        <Typography> Transition Audit</Typography>
                        {/* </Badge> */}
                      </Tab>
                    </TabList>
                    <TabPanel value={0}>
                      {showReview && (
                        <MyMessages
                          chats={reviews}
                          permissionId={sheetPermissionId}
                          allowAddNew={checkAddNewReviewPermission}
                          docId={parseInt(params.document)}
                          selectedShift={selectedShift}
                        />
                      )}
                    </TabPanel>
                    <TabPanel value={1}>
                      {
                        <>
                          <TransitionTable
                            docId={parseInt(params.document)}
                            transitionAudit={transitionAudit}
                          />
                          <TransitionList docId={parseInt(params.document)} />
                        </>
                      }
                    </TabPanel>
                  </Tabs>
                </CardContent>
              </Card>
            </Box>
          </Box>
        </Sheet>
      ) : (
        "Session Timed Out"
      )}
    </>
  );
}
