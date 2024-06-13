import React, {useEffect, useRef, useState} from "react";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useApi} from "@/app/api/hooks/useApi";
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import {deepGet} from '@/app/utils'
import {ChartAttributes, ChartFieldValue, Department, Shift} from "@/app/types";
import TrendChartComponent from "@/app/components/ParameterTrending/TrendChartComponent";

var jmespath = require("jmespath");
var _ = require('lodash');


export default function TrendSelectorComponent(props: any) {


    const initialRenderState = useRef({
        departmentEffect: true,
        sheetEffect: true,
        shiftEffect: true,
        groupEffect: true,
        parameterEffect: true,
        fieldEffect: true,
        readingEffect: true
    });

    const [selectedDepartmentId, setSelectedDepartmentId] = useState(0);
    const [selectedSheetId, setSelectedSheetId] = useState(0);
    const [selectedShiftId, setSelectedShiftId] = useState(0);
    const [selectedGroupId, setSelectedGroupId] = useState(0);
    const [selectedParameterId, setSelectedParameterId] = useState(0);
    const [selectedFieldId, setSelectedFieldId] = useState(0);
    const [selectedReadingId, setSelectedReadingId] = useState(0);
    const [selectedValueId, setSelectedValueId] = useState(0)


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
    const {
        data: fieldAttributeList,
        isLoading: isFieldAttributeLoading,
        error: fieldattributeError,
        fetchData: fetchFieldttributeList
    } = useApi<ChartFieldValue>(`/charts/getchart?sheetId=${selectedSheetId}&fieldId=${selectedFieldId}`, {method: 'GET'});

    const groupList = _.uniqWith(jmespath.search(attributeList, '[].{groupId:groupId,groupName:groupMaster.groupName}'), _.isEqual)
    const parameterList = _.uniqWith(jmespath.search(attributeList, `[?groupId==\`${selectedGroupId}\`].{parameterId:parameterMaster.id,parameterName:parameterMaster.parameterName}`), _.isEqual)
    const fieldList = _.uniqWith(jmespath.search(attributeList, `[?parameterId==\`${selectedParameterId}\`].{fieldId:fieldMaster.id,fieldName:fieldMaster.fieldName}`), _.isEqual)
    const readingList = _.uniqWith(jmespath.search(attributeList, `[?parameterId==\`${selectedParameterId}\`].{readingId:readingMaster.id,readingName:readingMaster.readingName}`), _.isEqual)

    const resetValuesToDefault = ()=>{

        setSelectedShiftId(0);
        setSelectedGroupId(0);
        setSelectedParameterId(0);
        setSelectedFieldId(0);
        setSelectedReadingId(0);
    }

    useEffect(() => {
        fetchDepartmentList()
    }, [])

    useEffect(() => {
        if (initialRenderState.current.departmentEffect) {
            initialRenderState.current.departmentEffect = false
            return

        }
        fetchSheetList()
    }, [selectedDepartmentId])

    useEffect(() => {
        if (initialRenderState.current.sheetEffect) {
            initialRenderState.current.sheetEffect = false
            return

        }
        fetchAttributeList()
        fetchShiftList()

    }, [selectedSheetId])

    useEffect(() => {
        //update prameter list
    }, [selectedGroupId]);

    useEffect(() => {
        //update Field list
    }, [selectedParameterId]);

    useEffect(() => {
        //update reading list
    }, [selectedReadingId]);

    useEffect(() => {
        if (initialRenderState.current.fieldEffect) {
            initialRenderState.current.fieldEffect = false
            return
        }
        fetchFieldttributeList();

    }, [selectedFieldId]);


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
                if (newValue)
                    setSelectedDepartmentId(newValue)
                    setSelectedSheetId(0)
                    resetValuesToDefault()

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
                event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element> | React.FocusEvent<Element, Element> | null,
                newValue: number | null,
            ) => {
                if (newValue)
                    setSelectedSheetId(newValue);
                    resetValuesToDefault()

            }
        }, {
            formHead: 'Shift',
            name: 'shift',
            selectList: shiftList,
            valueId: 'shiftId',
            optionLabel: 'shiftMaster.shiftType',
            selected: selectedShiftId,
            handleChange: (
                event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element> | React.FocusEvent<Element, Element> | null,
                newValue: number | null,
            ) => {
                if (newValue)
                    setSelectedShiftId(newValue)
            }
        },
        {
            formHead: 'Group',
            name: 'group',
            selectList: groupList,
            valueId: 'groupId',
            optionLabel: 'groupName',
            selected: selectedGroupId,
            handleChange: (
                event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element> | React.FocusEvent<Element, Element> | null,
                newValue: number | null,
            ) => {
                if (newValue)
                    setSelectedGroupId(newValue)
            }
        },
        {
            formHead: 'Parameter',
            name: 'parameter',
            selectList: parameterList,
            valueId: 'parameterId',
            optionLabel: 'parameterName',
            selected: selectedParameterId,
            handleChange: (
                event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element> | React.FocusEvent<Element, Element> | null,
                newValue: number | null,
            ) => {
                if (newValue)
                    setSelectedParameterId(newValue)
            }
        },
        {
            formHead: 'Field Name',
            name: 'field name',
            selectList: fieldList,
            valueId: 'fieldId',
            optionLabel: 'fieldName',
            selected: selectedFieldId,
            handleChange: (
                event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element> | React.FocusEvent<Element, Element> | null,
                newValue: number | null,
            ) => {
                if (newValue)
                    setSelectedFieldId(newValue)
            }
        },
        {
            formHead: 'Reading',
            name: 'Reading',
            selectList: readingList,
            valueId: 'readingId',
            optionLabel: 'readingName',
            selected: selectedReadingId,
            handleChange: (
                event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element> | React.FocusEvent<Element, Element> | null,
                newValue: number | null,
            ) => {
                if (newValue)
                    setSelectedReadingId(newValue)
            }
        }
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
                                    {i.selectList.map((r: any, idx: number) => {
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
            {/*<Button type="submit"> Generate Trend</Button>*/}

            <TrendChartComponent />

            </>
    )
}