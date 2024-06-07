import Box from "@mui/joy/Box";
import Chip from "@mui/joy/Chip/Chip";
import Typography from "@mui/joy/Typography";
import TableSection from "../Common/TableSection";
import React, {useEffect, useState} from "react";
import Button from "@mui/joy/Button";
import Input from "@mui/joy/Input/Input";
import {createjob} from '../../Reducers/CreateJobSlice';
import {useRouter} from "next/navigation";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useApi} from "@/app/api/hooks/useApi";
import {useAuth} from "@/app/hooks/useAuth";
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import {deepGet} from '@/app/utils'
import {Department, Shift, ChartAttributes} from "@/app/types";
var jmespath = require("jmespath");
var _= require('lodash');



export default function TrendSelectorComponent(props: any) {


    // All List
    // const [departmentList, setDepartmentList] = useState([]);
    // const [sheetList, setSheetList] = useState([]);
    // const [shiftList, setShiftList] = useState([]);
    // const [groupList, setGroupList] = useState([]);
    // const [parameterList, setParameterList] = useState([]);
    // const [fieldList, setFieldList] = useState([]);
    // const [readingList, setReadingList] = useState([]);

    // user selected items

    const [selectedDepartmentId, setSelectedDepartmentId] = useState(0);
    const [selectedSheetId, setSelectedSheetId] = useState(0);
    const [selectedShiftId, setSelectedShiftId] = useState(0);
    const [selectedGroupId, setSelectedGroupId] = useState(0);
    const [selectedParamterId, setSelectedParamterId] = useState(0);
    const [selectedFieldId, setSelectedFieldId] = useState(0);
    const [selectedReadingId, setSelectedReadingId] = useState(0);



    const {
        data: departmentList,
        isLoading: isDepartmentLoading,
        error: departmentError,
        fetchData: fetchDepartmentList
    } = useApi<Department>(`/departments/get`, {method: 'GET'});
    const {
        data: sheetList,
        isLoading: isSheetLoading,
        error: sheetError,
        fetchData: fetchSheetList
    } = useApi<Department>(`/departmentsheets/get-sheets?id=${selectedDepartmentId}`, {method: 'GET'});
    const {
        data: shiftList,
        isLoading: isShiftLoading,
        error: shiftError,
        fetchData: fetchShiftList
    } = useApi<Shift>(`/sheetshiftmaster/get-shift?id=${selectedSheetId}`, {method: 'GET'});
    const {
        data: attributeList,
        isLoading: isAttributeLoading,
        error: attributeError,
        fetchData: fetchAttributeList
    } = useApi<ChartAttributes>(`/charts/getvalues?sheetId=${selectedSheetId}`, {method: 'GET'});



    const groupList = _.uniqWith(jmespath.search(attributeList,'[].{groupId:groupId,groupName:groupMaster.groupName}'),_.isEqual)
    const parameterList = _.uniqWith(jmespath.search(attributeList,`[?groupId==\`${selectedGroupId}\`].{parameterId:parameterMaster.id,parameterName:parameterMaster.parameterName}`),_.isEqual)
    const fieldList = _.uniqWith(jmespath.search(attributeList,`[?parameterId==\`${selectedParamterId}\`].{fieldId:fieldMaster.id,fieldName:fieldMaster.fieldName}`),_.isEqual)
    const readingList = _.uniqWith(jmespath.search(attributeList,`[?parameterId==\`${selectedParamterId}\`].{readingId:readingMaster.id,readingName:readingMaster.readingName}`),_.isEqual)


    useEffect(() => {
        fetchDepartmentList()
    }, [])

    useEffect(() => {
        fetchSheetList()
    }, [selectedDepartmentId])
    
    useEffect(() => {
        fetchAttributeList()
        fetchShiftList()
    }, [selectedSheetId])

    useEffect(() => {
        //update prameter list
    }, [selectedGroupId]);

    useEffect(() => {
        //update Field list
    }, [selectedParamterId]);

    useEffect(() => {
        //update reading list
    }, [selectedReadingId]);
    


    const userSelectItems = [
        {
            formHead: 'Department Name',
            name: 'departmentId',
            selectList: departmentList,
            valueId: 'id',
            optionLabel: 'departmentName',
            selected: selectedDepartmentId,
            handleChange: (
                event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element> | React.FocusEvent<Element, Element> | null,
                newValue: number | null,
            ) => {
                if(newValue)
                setSelectedDepartmentId(newValue)
                setSelectedSheetId(0)
            }
        },
        {
            formHead: 'Sheet Name',
            name: 'sheetId',
            selectList: sheetList,
            valueId: 'sheetId',
            optionLabel: 'sheetMaster.sheetName',
            selected: selectedSheetId,
            handleChange: (
                event:  React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element> | React.FocusEvent<Element, Element> | null,
                newValue: number | null,
            ) => {
                if(newValue)
                setSelectedSheetId(newValue)

            }
        },{
            formHead:'Shift',
            name:'shift',
            selectList:shiftList,
            valueId: 'shiftId',
            optionLabel:'shiftMaster.shiftType',
            selected:selectedShiftId,
            handleChange:(
                event: React.MouseEvent<Element,MouseEvent> | React.KeyboardEvent<Element> | React.FocusEvent<Element, Element> | null,
                newValue: number | null,
            ) => {
                if(newValue)
                    setSelectedShiftId(newValue)
            }
        },
        {
            formHead:'Group',
            name:'group',
            selectList:groupList,
            valueId: 'groupId',
            optionLabel:'groupName',
            selected:selectedGroupId,
            handleChange:(
                event: React.MouseEvent<Element,MouseEvent> | React.KeyboardEvent<Element> | React.FocusEvent<Element, Element> | null,
                newValue: number | null,
            ) => {
                if(newValue)
                    setSelectedGroupId(newValue)
            }
        },
        {
            formHead:'Parameter',
            name:'parameter',
            selectList:parameterList,
            valueId: 'parameterId',
            optionLabel:'parameterName',
            selected:selectedParamterId,
            handleChange:(
                event: React.MouseEvent<Element,MouseEvent> | React.KeyboardEvent<Element> | React.FocusEvent<Element, Element> | null,
                newValue: number | null,
            ) => {
                if(newValue)
                    setSelectedParamterId(newValue)
            }
        },
        {
            formHead:'Field Name',
            name:'field name',
            selectList:fieldList,
            valueId: 'fieldId',
            optionLabel:'fieldName',
            selected:selectedFieldId,
            handleChange:(
                event: React.MouseEvent<Element,MouseEvent> | React.KeyboardEvent<Element> | React.FocusEvent<Element, Element> | null,
                newValue: number | null,
            ) => {
                if(newValue)
                    setSelectedFieldId(newValue)
            }
        },
        {
            formHead:'Reading',
            name:'Reading',
            selectList:readingList,
            valueId: 'readingId',
            optionLabel:'readingName',
            selected:selectedReadingId,
            handleChange:(
                event: React.MouseEvent<Element,MouseEvent> | React.KeyboardEvent<Element> | React.FocusEvent<Element, Element> | null,
                newValue: number | null,
            ) => {
                if(newValue)
                    setSelectedReadingId(newValue)
            }
        },
        
        

    ]


    const handleSubmit = (e: any) => {
        e.preventDefault();
        try {


        } catch (error) {


        }
    }


    return (
        <>
            <ToastContainer/>
                <Box component="div" display="flex" alignItems="center" width={'100%'}
                     flexDirection={{xs: 'column', sm: 'column', md: 'row'}} py={1} gap={2}>

                    {
                        userSelectItems.map(i => (

                            <Box component="div" width={{xs: '100%'}} key={i.name}>
                                <Typography level="h3" fontSize="sm" sx={{mb: 0.5}}>{i.formHead}</Typography>
                                {
                                    i.selectList &&
                                    <Select name={i.name} onChange={i.handleChange}
                                            style={{
                                                padding: '8px',
                                                borderRadius: '5px',
                                                borderColor: '#ccc',
                                                width: '100%'
                                            }} value={i.selected}>
                                        <Option value={0}>Select</Option>
                                        {i.selectList.map((r: any, idx:number) => {
                                            return <Option key={idx}
                                                           value={r[i.valueId]}>{deepGet(r, i.optionLabel.replace(/\[([^\[\]]*)\]/g, '.$1.').split('.').filter(t => t !== ''))}</Option>
                                        })
                                        }
                                    </Select>
                                }
                            </Box>


                        ))
                    }


                </Box>

                <Button type="submit" > Generate Trend</Button>
            <Typography display={"flex"} level="h2" component="h1">Chart</Typography>
            {JSON.stringify(readingList)}

        </>
    )
}