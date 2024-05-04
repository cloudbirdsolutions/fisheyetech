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

    formData: FormData,
    recordMasterData : Reccod[],
    setDocumentRecord : React.Dispatch<React.SetStateAction<Reccod[]>>

}

export default function LogForm(props: LogFormProps) {

    const getFieldValue = (fieldId: string, readingId: string) => {
        const matchedRecord = props.recordMasterData.find((rec:Reccod) => rec.fieldId === parseInt(fieldId) && rec.readingId === parseInt(readingId))
        return matchedRecord?.fieldValue
      }

    const getMatchedFieldRecord = (fieldId: string, readingId: string) => {
        const matchedRecord = props.recordMasterData.find((rec:Reccod) => rec.fieldId === parseInt(fieldId) && rec.readingId === parseInt(readingId))
        return matchedRecord
      }

    const updateValue = (e: React.ChangeEvent<HTMLInputElement>, fieldId: string, readingId: string) => {
        console.log("Value Updated")
        let newDocumentRecord = props.recordMasterData.map((rec:Reccod) => (rec.fieldId === parseInt(fieldId) && rec.readingId === parseInt(readingId) ? Object.assign({}, rec, { "fieldValue": e.target.value }) : rec))
        props.setDocumentRecord(newDocumentRecord)
        // console.log(e.target.value)
      }

    return (
        <Box>

            <Tabs
                aria-label="Vertical tabs"
                orientation="vertical"
            >
                <TabList>
                    {props.formData.groupMaster.map(group => (
                        <Tab key={`group_id_${group.id}`}>{group.groupName}</Tab>
                    ))}
                </TabList>
                {
                    props.formData.groupMaster.map((group, index) => (
                        <TabPanel key={`tab_panel_id_${group.id}`} value={index}>
                            <AccordionGroup key={`accordion_group_id${group.id}`}>
                                {
                                    group.parameterMaster.map((parameter, index) => (
                                        <Accordion key={`accordion_id_${parameter.id}`}>
                                            <AccordionSummary>{parameter.parameterName}</AccordionSummary>
                                            <AccordionDetails>
                                                <table>
                                                    <tbody>
                                                        {
                                                            parameter.fieldMaster.map((field, findex) => (
                                                                <tr key={`field_id_${field.fieldId}`}>
                                                                    <td>{field.fieldName}</td>
                                                                    <td>{field.fieldValue}</td>
                                                                    {
                                                                        field.readingMaster.map((reading,index) => (
                                                                            <td key={index}>
                                                                                <FormControl>
                                                                                   { findex == 0 && <FormLabel>
                                                                                        {reading.readingName}
                                                                                    </FormLabel>}
                                                                                    <input />
                                                                                </FormControl>
                                                                            </td>
                                                                        ))
                                                                    }
                                                                </tr>
                                                            ))
                                                        }
                                                    </tbody>
                                                </table>
                                            </AccordionDetails>
                                        </Accordion>
                                    ))
                                }
                            </AccordionGroup>
                        </TabPanel>
                    ))
                }
            </Tabs>

        </Box>
    )


}