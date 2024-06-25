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
  FormData,
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
        ? { ...rec, fieldValue: e.target.value }
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
                          >
                            <tbody>
                              {groupParam.parameterMaster.paramterFields.map(
                                (paramField, pfindex) =>
                                  checkGroupParamFieldExistence(
                                    group.groupId,
                                    groupParam.parameterId,
                                    paramField.fieldId
                                  ) && (
                                    <tr key={`trow_id_${pfindex}`}>
                                      <td style={{ width: 200 }}>
                                        {paramField.fieldMaster.fieldName}
                                      </td>
                                      <td style={{ width: 200 }}>
                                        {paramField.fieldMaster.fieldValue}
                                      </td>
                                      {paramField.fieldMaster.fieldReading.map(
                                        (fieldReading, findex) =>
                                          checkGroupParamFieldReadingExistence(
                                            group.groupId,
                                            groupParam.parameterId,
                                            paramField.fieldId,
                                            fieldReading.readingId
                                          ) && (
                                            <td
                                              key={`td_id_${fieldReading.readingId}`}
                                              style={{ width: 200 }}
                                            >
                                              <FormControl>
                                                {/* {pfindex === 0 && ( */}
                                                <FormLabel>
                                                  {
                                                    fieldReading.readingMaster
                                                      .readingName
                                                  }
                                                </FormLabel>
                                                {/* )}  */}
                                                {renderInputField(
                                                  paramField,
                                                  group,
                                                  groupParam,
                                                  fieldReading,
                                                  pfindex
                                                )}
                                              </FormControl>
                                            </td>
                                          )
                                      )}
                                    </tr>
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
