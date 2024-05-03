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


import { FormData } from '@/app/types';


interface LogFormProps {

    formData: FormData

}

export default function LogForm(props: LogFormProps) {

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