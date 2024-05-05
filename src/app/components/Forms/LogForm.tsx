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
    Input
} from '@mui/joy';


import { FormData,Reccod } from '@/app/types';


interface LogFormProps {

    formData: FormData[],
    recordMasterData : Reccod[],
    setDocumentRecord : React.Dispatch<React.SetStateAction<Reccod[]>>,
    documentTransitionState : number

}

export default function LogForm(props: LogFormProps) {

    const getFieldValue = (fieldId: string, readingId: string) => {
        const matchedRecord = props.recordMasterData.find((rec:Reccod) => rec.fieldId === parseInt(fieldId) && rec.readingId === parseInt(readingId))
        return matchedRecord?.fieldValue
      }

    const getMatchedFieldRecord = (
        groupId: number, 
        paramterId: number,
        fieldId:number,
        readingId:number
    ) => {
        return props.recordMasterData.find((rec:Reccod) => rec.fieldId === fieldId && rec.readingId === readingId && rec.groupId===groupId && rec.parameterId==paramterId)
        // return matchedRecord
      }

    const updateValue = (e: React.ChangeEvent<HTMLInputElement>, 
        groupId: number, 
        paramterId: number,
        fieldId:number,
        readingId:number
    ) => {
        // console.log("Value Updated")
        let newDocumentRecord = props.recordMasterData.map((rec:Reccod) => (rec.fieldId === fieldId && rec.readingId === readingId && rec.groupId===groupId && rec.parameterId==paramterId ? Object.assign({}, rec, { "fieldValue": e.target.value }) : rec))
        props.setDocumentRecord(newDocumentRecord)
        console.log(newDocumentRecord)
      }

    return (
        <Box>

            <Tabs
                aria-label="Vertical tabs"
                orientation="vertical"
            >
            <TabList>
                    {props.formData.map((group,gindex)=>(
                            <Tab key={`tabp_id_${group.groupId}`}>{group.groupMaster.groupName}</Tab>

                    ))}
            </TabList>

                    {props.formData.map((group,gindex)=>(
                        <TabPanel key={`tabpanel_id_${group.groupId}`}  value={gindex}>
                            <AccordionGroup>
                            {group.groupMaster.groupParameters.map((groupParam,gpindex)=>(
                                <Accordion key={`accordion_id_${gpindex}`}>
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
                                        {groupParam.parameterMaster.paramterFields.map((paramField,pfindex)=>(
                                            <tr key={`trow_id_${pfindex}`}>
                                                <th scope='row'>{paramField.fieldMaster.fieldName}</th>
                                                <th scope='row'>{paramField.fieldMaster.fieldValue}</th>
                                                {paramField.fieldMaster.fieldReading.map((fieldReading)=>(
                                                    <td key={`td_id_${fieldReading.readingId}`}>
                                                        <FormControl>
                                                            {pfindex==0 && <FormLabel>{fieldReading.readingMaster.readingName}</FormLabel>}
                                                            <Input 
                                                            value={getMatchedFieldRecord(group.groupId,groupParam.parameterId,paramField.fieldId,fieldReading.readingId)?.fieldValue}  
                                                            onChange={(e)=>{updateValue(e,group.groupId,groupParam.parameterId,paramField.fieldId,fieldReading.readingId)}} 
                                                            disabled={props.documentTransitionState !=1} />
                                                        </FormControl>
                                                    </td>
                                                ))}
                                            </tr>

                                        ))}
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