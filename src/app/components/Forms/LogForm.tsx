'use client';
import * as React from 'react';
import Box from '@mui/joy/Box';
import { useState } from 'react';
import {
    AccordionGroup,
    FormControl,
    FormLabel,
    Tab,
    TabList,
    TabPanel,
    Tabs,
    Typography,
    Table,
    Sheet,
    Button,
    Stack,
    Link,
    Divider,
    Card,
    CardContent,
    CardActions,
    ListItemDecorator,
    Badge,
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Input,
    Tooltip
} from '@mui/joy';


import { FormData, Reccod, RecordReading } from '@/app/types';


interface LogFormProps {

    formData: FormData[],
    recordMasterData: Reccod[],
    setDocumentRecord: React.Dispatch<React.SetStateAction<Reccod[]>>,
    documentTransitionState: number,
    fieldMapping: RecordReading[],
    sheetPermissionId:number

}

export default function LogForm(props: LogFormProps) {

    const getMatchedFieldRecord = (
        groupId: number,
        paramterId: number,
        fieldId: number,
        readingId: number
    ) => {
        return props.recordMasterData.find((rec: Reccod) => rec.fieldId === fieldId && rec.readingId === readingId && rec.groupId === groupId && rec.parameterId == paramterId)
        // return matchedRecord
    }

    const updateValue = (e: React.ChangeEvent<HTMLInputElement>,
        groupId: number,
        paramterId: number,
        fieldId: number,
        readingId: number
    ) => {
        // console.log("Value Updated")
        let newDocumentRecord = props.recordMasterData.map((rec: Reccod) => (rec.fieldId === fieldId && rec.readingId === readingId && rec.groupId === groupId && rec.parameterId == paramterId ? Object.assign({}, rec, { "fieldValue": e.target.value }) : rec))
        props.setDocumentRecord(newDocumentRecord)
        console.log(newDocumentRecord)
    }

    const checkGroupParamFieldExistence = (groupId: number, parameterId: number, fieldId: number) => {
        return props.fieldMapping.find((m) => m.groupId === groupId && m.fieldId === fieldId && m.parameterId === parameterId)
    }
    const checkGroupParamFieldReadingExistence = (groupId: number, parameterId: number, fieldId: number, readingId:number) => {
        return props.fieldMapping.find((m) => m.groupId === groupId && m.fieldId === fieldId && m.parameterId === parameterId && m.readingId===readingId)
    }

    const [expandIndex, setExpandIndex] = React.useState<number | null>(0);

    return (
        <Box>
                {/* {props.documentTransitionState}
                {props.sheetPermissionId} */}
            <Tabs
                aria-label="Vertical tabs"
                orientation="vertical"
            >
                <TabList>
                    {props.formData.map((group, gindex) => (
                        <Tab key={`tabp_id_${group.groupId}`}>{group.groupMaster.groupName}</Tab>

                    ))}
                </TabList>

                {props.formData.map((group, gindex) => (
                    <TabPanel key={`tabpanel_id_${group.groupId}`} value={gindex}>
                        <AccordionGroup>
                            {group.groupMaster.groupParameters.map((groupParam, gpindex) => (
                                <Accordion key={`accordion_id_${gpindex}`}
                                    expanded={gpindex === expandIndex}
                                    onChange={(event, expanded) => {
                                        setExpandIndex(expanded ? gpindex : null);
                                    }}
                                    variant='soft'
                                    sx={{ borderRadius: 'md' }}

                                >
                                    <AccordionSummary>
                                        {groupParam.parameterMaster.parameterName}
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Sheet variant='outlined'>
                                            <Table variant='soft' color='primary' size='sm' hoverRow>
                                                {/* <thead>
                                                <tr>
                                                    <th>Description</th>
                                                    <th>Desired Observation</th>
                                                </tr>
                                            </thead> */}
                                                <tbody>
                                                    {groupParam.parameterMaster.paramterFields.map((paramField, pfindex) => {
                                                        return (
                                                            <> {checkGroupParamFieldExistence(group.groupId, groupParam.parameterId, paramField.fieldId) && <tr key={`trow_id_${pfindex}`}>
                                                                <td>{paramField.fieldMaster.fieldName}</td>
                                                                <td>{paramField.fieldMaster.fieldValue}</td>
                                                                {paramField.fieldMaster.fieldReading.map((fieldReading) => {
                                                                  return (<> { checkGroupParamFieldReadingExistence(group.groupId, groupParam.parameterId, paramField.fieldId,fieldReading.readingId) &&<td key={`td_id_${fieldReading.readingId}`}>
                                                                        <FormControl>
                                                                            {pfindex == 0 && <FormLabel>{fieldReading.readingMaster.readingName}</FormLabel>}
                                                                            <Tooltip variant='soft' title={getMatchedFieldRecord(group.groupId, groupParam.parameterId, paramField.fieldId, fieldReading.readingId)?.fieldValue}>
                                                                            <Input
                                                                                value={getMatchedFieldRecord(group.groupId, groupParam.parameterId, paramField.fieldId, fieldReading.readingId)?.fieldValue}
                                                                                onChange={(e) => { updateValue(e, group.groupId, groupParam.parameterId, paramField.fieldId, fieldReading.readingId) }}
                                                                                disabled={props.documentTransitionState != 1 || props.sheetPermissionId!=1} />
                                                                                </Tooltip>
                                                                        </FormControl>
                                                                    </td>}</>)
                                                                 })}
                                                            </tr>}
                                                            </>
                                                        )
                                                    })}
                                                </tbody>
                                            </Table>
                                        </Sheet>
                                    </AccordionDetails>
                                </Accordion>
                            ))}
                        </AccordionGroup>
                    </TabPanel>
                ))}

            </Tabs>

        </Box>
    )


}