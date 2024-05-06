'use client';
import * as React from 'react';
import Box from '@mui/joy/Box';

import { useState } from 'react';
import { Button, Select, Table, Typography, Option, FormLabel } from '@mui/joy';
import { SheetRaw, GroupRaw, ParameterRaw, FieldRaw, ReadingRaw } from '@/app/types';
import { allFieldInitialState, allGroupsInitialState, allParamterInitialState, allReadingInitialState, allSheetsInitialState } from '@/app/InitialStates/initialState';
import { getAllGroups, getAllSheets, getAllFields, getAllParameters, getAllReadings,saveMapping } from '@/app/api/FieldMapping/mapping_api';
import { FormControl } from '@mui/joy';
import { group } from 'console';

interface FormCtrl {
    state: any,
    value: string
}

export default function SheetField() {

    const headers = ['Entries', 'Action']
    const [allSheets, setAllSheets] = useState<SheetRaw[]>(allSheetsInitialState)
    const [allGroups, setAllGroups] = useState<GroupRaw[]>(allGroupsInitialState)
    const [allParameters, setAllParameters] = useState<ParameterRaw[]>(allParamterInitialState)
    const [allFields, setAllFields] = useState<FieldRaw[]>(allFieldInitialState)
    const [allReadings, setAllReadings] = useState<ReadingRaw[]>(allReadingInitialState)

    const [selectedSheet, setSelectedSheet] = useState<number|null>(allSheets[0].id)
    const [selectedGroup, setSelectedGroup] = useState<number |null>(allGroups[0].id)
    const [selectedParamter, setSelectedParamter] = useState<number |null>(allParameters[0].id)
    const [selectedField, setSelectedField] = useState<number|null>(allFields[0].id)
    const [selectedReading, setSelectedReading] = useState<number|null>(allReadings[0].id)

    React.useEffect(() => {

        const fetchRawData = async () => {
            let sheetResp = await getAllSheets()
            let groupResp = await getAllGroups()
            let parameterRes = await getAllParameters()
            let fieldRes = await getAllFields()
            let readingResp = await getAllReadings()
            setAllSheets(sheetResp.data)
            setAllGroups(groupResp.data)
            setAllParameters(parameterRes.data)
            setAllFields(fieldRes.data)
            setAllReadings(readingResp.data)
        }

        fetchRawData()

    }, [])

    const handleSave = async ()=>{

        let data = {
            sheetId:selectedSheet,
            groupId: selectedGroup,
            paramterId: selectedParamter,
            fieldId: selectedField,
            readingId:selectedReading
        }

        saveMapping(data)
    }

    return (<Box width={'100%'} display={'flex'} flexDirection={'column'} alignItems={'center'} gap={4}>
       <Table>
            <tbody>
                <tr>

                    <td>
                        Sheets
                    </td>
                    <td>
                        <Select defaultValue={allSheets[0].id} onChange={(e,val)=>(setSelectedSheet(val))}>
                            {
                                allSheets.map(sheet => (
                                    <Option key={`sheet_option_${sheet.id}`} value={sheet.id}>
                                        {sheet.sheetName}
                                    </Option>))
                            }
                        </Select>
                    </td>

                </tr>
                <tr>

                    <td>
                        Groups
                    </td>
                    <td>
                        <Select defaultValue={allGroups[0].id} onChange={(e,val)=>(setSelectedGroup(val))}>
                            {
                                allGroups.map(group => (
                                    <Option key={`group_option_${group.id}`} value={group.id}>
                                        {group.groupName}
                                    </Option>))
                            }
                        </Select>
                    </td>

                </tr>
                <tr>

                    <td>
                        Paramters
                    </td>
                    <td>
                        <Select defaultValue={allParameters[0].id} onChange={(e,val)=>(setSelectedParamter(val))}>
                            {
                                allParameters.map(o => (
                                    <Option key={`param_option_${o.id}`} value={o.id}>
                                        {o.parameterName}
                                    </Option>))
                            }
                        </Select>
                    </td>

                </tr>
                <tr>

                    <td>Fields</td>
                    <td>
                        <Select defaultValue={allFields[0].id} onChange={(e,val)=>(setSelectedField(val))}>
                            {
                                allFields.map(o => (
                                    <Option  key={`field_option_${o.id}`} value={o.id}>
                                        {o.fieldName}
                                    </Option>))
                            }
                        </Select>
                    </td>

                </tr>
                <tr>
                    <td>Reading</td>
                    <td>
                        <Select defaultValue={allReadings[0].id} onChange={(e,val)=>(setSelectedReading(val))}>
                            {
                                allReadings.map(o => (
                                    <Option key={`reading_option_${o.id}`} value={o.id}>
                                        {o.readingName}
                                    </Option>))
                            }
                        </Select>
                    </td>
                </tr>
            </tbody>
        </Table>
        <Box>
            <Typography> Selected Sheet {selectedSheet}</Typography>
            <Typography> Selected Group {selectedGroup}</Typography>
            <Typography> Selected Paramter {selectedParamter}</Typography>
            <Typography> Selected Field {selectedField}</Typography>
            <Typography> Selected Reading {selectedReading}</Typography>
        </Box>
        <Button color='success' onClick={handleSave}>Save</Button>

    </Box>)
}