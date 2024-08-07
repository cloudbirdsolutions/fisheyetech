"use client";
import * as React from "react";
import Box from "@mui/joy/Box";
import {
  AccordionGroup,
  FormControl,
  FormLabel,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  Table,
  Sheet,
  Input,
  Tooltip,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Select,
  TextField,
  Textarea,
  Option,
} from "@mui/joy";
import {
  FormData, FormFieldType,
  Reccod,
  RecordReading,
  SheetDocId,
  TransitionAudit,
} from "@/app/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/Store/store";

interface LogFormProps {
  formData: FormData[];
  recordMasterData: Reccod[];
  setDocumentRecord: React.Dispatch<React.SetStateAction<Reccod[]>>;
  documentTransitionState: number;
  fieldMapping: RecordReading[];
  sheetPermissionId: number;
  isInputDisabled: boolean;
  documentDetails: SheetDocId[];
  transitionAudit: TransitionAudit[];
  formFields : FormFieldType[];
}

const LogForm: React.FC<LogFormProps> = (props: LogFormProps) => {
  const [expandIndex, setExpandIndex] = React.useState<number | null>(0);
  // console.log(props.documentTransitionState);
  const getMatchedFieldRecord = (
    groupId: number,
    parameterId: number,
    fieldId: number,
    readingId: number
  ) => {
    return props.recordMasterData.find(
      (rec: Reccod) =>
        rec.fieldId === fieldId &&
        rec.readingId === readingId &&
        rec.groupId === groupId &&
        rec.parameterId === parameterId
    );
  };
  const userdetails = useSelector((state: RootState) => state?.user?.data);

  const updateValue = (
    e: React.ChangeEvent<HTMLInputElement>,
    groupId: number,
    parameterId: number,
    fieldId: number,
    readingId: number
  ) => {
    let newDocumentRecord = props.recordMasterData.map((rec: Reccod) =>
      rec.fieldId === fieldId &&
      rec.readingId === readingId &&
      rec.groupId === groupId &&
      rec.parameterId === parameterId
        ? { ...rec, fieldValue: e?.target.value }
        : rec
    );
    props.setDocumentRecord(newDocumentRecord);
  };

  const checkGroupParamExistence = (groupId: number, parameterId: number) => {
    return props.fieldMapping.find(
      (m) => m.groupId === groupId && m.parameterId === parameterId
    );
  };

  const checkGroupParamFieldExistence = (
    groupId: number,
    parameterId: number,
    fieldId: number
  ) => {
    return props.fieldMapping.find(
      (m) =>
        m.groupId === groupId &&
        m.fieldId === fieldId &&
        m.parameterId === parameterId
    );
  };

  const checkGroupParamFieldReadingExistence = (
    groupId: number,
    parameterId: number,
    fieldId: number,
    readingId: number
  ) => {
    return props.fieldMapping.find(
      (m) =>
        m.groupId === groupId &&
        m.fieldId === fieldId &&
        m.parameterId === parameterId &&
        m.readingId === readingId
    );
  };

  const filteredOperator = props.transitionAudit.filter(
    (doc) => doc.transitionId === 2
  );
  const filteredOperatorDraft = props.transitionAudit.filter(
    (doc) => doc.transitionId === 1
  );
  const sortedOperatorDraft = filteredOperatorDraft.sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
  const sortedOperator = filteredOperator.sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
  const latestOperator = sortedOperatorDraft[0];

  const latestDraft = sortedOperator[0];
  // console.log(latestDraft, latestOperator, "latest operator");

  const filteredReviewer = props.transitionAudit.filter(
    (doc) => doc.transitionId === 3
  );
  const sortedReviewer = filteredReviewer.sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
  const latestReviewer = sortedReviewer[0];
  // console.log(latestReviewer, "latestReviewer");

  const renderInputField = (
    paramField: any,
    group: any,
    groupParam: any,
    fieldReading: any,
    pfindex: number
  ) => {
    const matchedRecord = getMatchedFieldRecord(
      group.groupId,
      groupParam.parameterId,
      paramField.fieldId,
      fieldReading.readingId
    );
    const fieldValue = matchedRecord?.fieldValue || "";

    let inputElement: JSX.Element | null = null;

    switch (paramField.fieldMaster.filedValueType) {
      case "string":
        inputElement = (
          <Input
            value={fieldValue}

            onChange={(e) =>
              updateValue(
                e,
                group.groupId,
                groupParam.parameterId,
                paramField.fieldId,
                fieldReading.readingId
              )
            }
            disabled={props.isInputDisabled}
          />
        );
        break;
      case "textbox":
        inputElement = (
          <Textarea
            placeholder={fieldValue}
            minRows={20}
            required
            onChange={(e) =>
              updateValue(
                e as unknown as React.ChangeEvent<HTMLInputElement>,
                group.groupId,
                groupParam.parameterId,
                paramField.fieldId,
                fieldReading.readingId
              )
            }
            disabled={props.isInputDisabled}
            sx={{ mb: 1 }}
          />
        );
        break;

      case "dropdown_user":
        let fieldValues = latestDraft
          ? latestDraft.users.name
          : latestOperator
          ? latestOperator.users.name
          : fieldValue;
        inputElement = (
          <Select
            defaultValue={fieldValues}
            disabled={props.isInputDisabled}
            onChange={(e) =>
              updateValue(
                e as unknown as React.ChangeEvent<HTMLInputElement>,
                group.groupId,
                groupParam.parameterId,
                paramField.fieldId,
                fieldReading.readingId
              )
            }
          >
            <Option value={fieldValues}>{fieldValues}</Option>
          </Select>
        );
        break;
      case "dropdown_reviewer":
        let fieldValueReviewer = latestReviewer
          ? latestReviewer.users.name
          : fieldValue;
        let newDocumentRecord = props.recordMasterData.map((rec: Reccod) =>
      rec.fieldId ===  paramField.fieldId &&
      rec.readingId === fieldReading.readingId &&
      rec.groupId === group.groupId &&
      rec.parameterId === groupParam.parameterId
        ? { ...rec, fieldValue: fieldValueReviewer }
        : rec
    );
    // props.setDocumentRecord(newDocumentRecord);

        inputElement = (
          <Select
            defaultValue={fieldValueReviewer}
            disabled={props.isInputDisabled}
            onChange={(e) =>
              updateValue(
                e as unknown as React.ChangeEvent<HTMLInputElement>,
                group.groupId,
                groupParam.parameterId,
                paramField.fieldId,
                fieldReading.readingId
              )
            }
          >
            <Option value={fieldValueReviewer}>{fieldValueReviewer}</Option>
          </Select>
        );
        break;
      case "dropdown_approver":
        let fieldValueapprover = latestReviewer
          ? userdetails.data.name
          : fieldValue;

        inputElement = (
          <Select
            defaultValue={fieldValueapprover}
            onChange={(e) =>
              updateValue(
                e as unknown as React.ChangeEvent<HTMLInputElement>,
                group.groupId,
                groupParam.parameterId,
                paramField.fieldId,
                fieldReading.readingId
              )
            }
            disabled={props.isInputDisabled}
          >
            <Option value={fieldValueapprover}>{fieldValueapprover}</Option>
          </Select>
        );
        break;
      default:
        inputElement = null;
        break;
    }

    return (
      inputElement && (
        <Tooltip variant="soft" title={fieldValue}>
          {inputElement}
        </Tooltip>
      )
    );
  };

  return (
    <Box>
      <Tabs aria-label="Vertical tabs" orientation="vertical">
        <TabList>
          {props.formData.map((group, gindex) => (
            <Tab
              key={`tabp_id_${group.groupId}`}
              variant="solid"
              color={"primary"}
            >
              {group.groupMaster.groupName}
            </Tab>
          ))}
        </TabList>

        {props.formData.map((group, gindex) => (
          <TabPanel key={`tabpanel_id_${group.groupId}`} value={gindex}>
            <AccordionGroup>
              {group.groupMaster.groupParameters.map(
                (groupParam, gpindex) =>
                  checkGroupParamExistence(
                    group.groupId,
                    groupParam.parameterId
                  ) && (
                    <Accordion
                      key={`accordion_id_${gpindex}`}
                      expanded={gpindex === expandIndex}
                      onChange={(event, expanded) => {
                        setExpandIndex(expanded ? gpindex : null);
                      }}
                      variant="soft"
                      sx={{ borderRadius: "md" }}
                    >
                      <AccordionSummary
                        variant="solid"
                        sx={{ borderRadius: "md" }}
                        color="primary"
                      >
                        {groupParam.parameterMaster.parameterName}
                      </AccordionSummary>
                      <AccordionDetails>
                        <Sheet variant="outlined" sx={{ overflow: "auto" }}>
                          <Table
                            variant="soft"
                            color="primary"
                            size="sm"
                            hoverRow
                            // sx={{
                            //   '& tr > *:first-child': {
                            //     position: 'sticky',
                            //     left: 0,
                            //     boxShadow: '1px 0 var(--TableCell-borderColor)',
                            //     bgcolor: 'background.surface',
                            //   }
                            // }}
                          >

                            <tbody>
                              {groupParam.parameterMaster.paramterFields.filter(
                                (paramField, pfIndex) =>
                                  checkGroupParamFieldExistence(
                                    group.groupId,
                                    groupParam.parameterId,
                                    paramField.fieldId
                                  )).map( (paramField, pfIndex) => (
                                        <>
                                          { pfIndex == 0 &&
                                            <tr>
                                              {props.formFields.filter(item => item.groupId == group.groupId && item.parameterId == groupParam.parameterId && item.fieldId == paramField.fieldId)
                                                    .map((field, index) => {
                                                      return <> {index == 0 &&
                                                          <th style={{width:200}} scope={'row'} key={'field__' + field.fieldId}>{field.fieldColName}</th>}
                                                        <th  style={{width:200}} scope={'row'} key={'field' + field.fieldId}>{field.fieldValueColName}</th>

                                                      </>
                                              })}
                                              {paramField.fieldMaster.filedValueType !=='none' && paramField.fieldMaster.fieldReading.filter(
                                                  (fieldReading, findex) => checkGroupParamFieldReadingExistence(
                                                      group.groupId,
                                                      groupParam.parameterId,
                                                      paramField.fieldId,
                                                      fieldReading.readingId
                                                  )).map( (fieldReading, findex) =>(
                                                  <th style={{width:200,whiteSpace: 'normal',  
                                                    overflow: 'visible',   
                                                    wordWrap: 'break-word',  }} key={`header+key_${findex}`} > {fieldReading.readingMaster
                                                      .readingName}</th>))}
                                            </tr>
                                          }

                                          <tr key={`trow_id_${pfIndex}`}>
                                            <th  scope={'row'}   style={{
                                                  whiteSpace: 'normal',  
                                                  overflow: 'visible',   
                                                  wordWrap: 'break-word', 
                                                  // padding: '8px',        
                                                  // border: '1px solid #ddd' 
                                                }}>
                                              {paramField.fieldMaster.fieldName}
                                            </th>
                                            {/*<td style={{ width: 200 }}>*/}
                                            {/*  {paramField.fieldMaster.fieldValue}*/}
                                            {/*</td>*/}
                                            {props.formFields.filter(item => item.groupId == group.groupId && item.parameterId == groupParam.parameterId && item.fieldId == paramField.fieldId)
                                                .map(field => (
                                                <th scope={'row'} key={'field' + field.fieldId} 
                                                style={{
                                                  whiteSpace: 'normal',  
                                                  overflow: 'visible',   
                                                  wordWrap: 'break-word', 
                                                  // padding: '8px',        
                                                  // border: '1px solid #ddd' 
                                                }}
                                                >{field.fieldValue}</th>
                                                ))}
                                            {paramField.fieldMaster.filedValueType !=='none' && paramField.fieldMaster.fieldReading.filter(
                                                (fieldReading, findex) => checkGroupParamFieldReadingExistence(
                                                    group.groupId,
                                                    groupParam.parameterId,
                                                    paramField.fieldId,
                                                    fieldReading.readingId
                                                )).map( (fieldReading, findex) =>(
                                                <>
                                                  <td
                                                      key={`td_id_${fieldReading.readingId}`}
                                                      style={{ width: 400 }}
                                                  >
                                                    <FormControl >
                                                      {renderInputField(
                                                          paramField,
                                                          group,
                                                          groupParam,
                                                          fieldReading,
                                                          pfIndex
                                                      )}
                                                    </FormControl>
                                                  </td>
                                                </>
                                                )
                                            )}
                                          </tr>
                                        </>

                                  )
                              )}
                            </tbody>
                          </Table>
                        </Sheet>
                      </AccordionDetails>
                    </Accordion>
                  )
              )}
            </AccordionGroup>
          </TabPanel>
        ))}
      </Tabs>
    </Box>
  );
};

export default LogForm;
