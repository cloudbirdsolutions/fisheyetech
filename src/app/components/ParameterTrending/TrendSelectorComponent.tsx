'use client'
import React, {useEffect, useRef, useState} from "react";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useApi} from "@/app/api/hooks/useApi";
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import {deepGet} from '@/app/utils'
import {ChartAttributes, ChartFieldValue, Department, Sheet, Shift} from "@/app/types";
import TrendChartComponent from "@/app/components/ParameterTrending/TrendChartComponent";
import {Card, CardContent} from "@mui/joy";
import Grid from "@mui/joy/Grid";
import moment from "moment";
let twix = require('twix');

var jmespath = require("jmespath");
var _ = require('lodash');
type SeriesType = {
    type: "line";
    dataKey: string;
    label: string;
} | {
    type: "bar";
    dataKey: string;
    label: string;
};

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
    const [selectedSecondFieldId, setSelectedSecondFieldId] = useState(0);
    const [selectedFieldIds, setSelectedFieldIds] = useState<number[]>([]);


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
    } = useApi<Sheet>(`/departmentsheets/get-sheets?id=${selectedDepartmentId}`, {method: 'GET'});
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
        error: fieldAttributeError,
        fetchData: fetchFieldAttributeList
    } = useApi<ChartFieldValue>(`/charts/getchart?sheetId=${selectedSheetId}&fieldId=${selectedFieldId}`, {method: 'GET'});
   
    const groupList = _.uniqWith(jmespath.search(attributeList, '[].{groupId:groupId,groupName:groupMaster.groupName}'), _.isEqual)
    const parameterList = _.uniqWith(jmespath.search(attributeList, `[?groupId==\`${selectedGroupId}\`].{parameterId:parameterMaster.id,parameterName:parameterMaster.parameterName}`), _.isEqual)
    const fieldList = _.uniqWith(jmespath.search(attributeList, `[?parameterId==\`${selectedParameterId}\`].{fieldId:fieldMaster.id,fieldName:fieldMaster.fieldName, fieldValue:fieldMaster.fieldValue}`), _.isEqual)
    const readingList = _.uniqWith(jmespath.search(attributeList, `[?parameterId==\`${selectedParameterId}\`].{readingId:readingMaster.id,readingName:readingMaster.readingName}`), _.isEqual)

    const resetValuesToDefault = () => {

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
        if(selectedSheetId > 0){
            let title = sheetList.find(s=>s.sheetId==selectedSheetId)?.sheetMaster.sheetName

            setChartTitle(title? title: 'No Title')
        }

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
        fetchFieldAttributeList();
        if(selectedFieldId > 0){
            let found = fieldList.find((s:any)=>s.fieldId==selectedFieldId);
            setChartSeriesLabel(found.fieldName)
            setChartYAxisLabel(found.fieldValue)
        }

    }, [selectedFieldId]);
   

    const userSelectItems = [
        {
            formHead: 'Department Name',
            name: 'departmentId',
            selectList: departmentList,
            valueId: 'id',
            optionLabel: 'departmentName',
            gridSize : {xs:12, md:4},
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
            gridSize : {xs:12,md:8},
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
            multiple:true,
            handleChange: (
                event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element> | React.FocusEvent<Element, Element> | null,
                newValue: number | null,
            ) => {
                if (newValue)
                    setSelectedReadingId(newValue)
            }
        },
       
        
    ]

    const [chartStartDate, setChartStartDate] = useState<string>(moment().format('YYYY-MM-DD'))
    const [chartEndDate, setChartEndDate] = useState<string>(moment().format('YYYY-MM-DD'))
    const [chartRange,setChartRange] = useState<string[]>([])
    const [chartDataSet,setChartDataSet] = useState<any[]>([])
    const [chartTitle, setChartTitle] = useState<string>("Please select a sheet")
    const [chartSeriesLabel,setChartSeriesLabel] = useState<string>("index")
    const [chartYAxisLabel,setChartYAxisLabel] = useState<string>("Number")



    useEffect(() => {
        const itr = (moment(chartStartDate) as any).twix(chartEndDate).iterate("days")
        let range = []
        while (itr.hasNext()){
            range.push(moment(itr.next()).format('YYYY-MM-DD'))
        }
        setChartRange(range)
    }, [chartStartDate, chartEndDate]);

    useEffect(() => {
        let recordMasterFirst = jmespath.search(fieldAttributeList, '[].recordMaster[].{date:updatedAt,value:fieldValue}');
        recordMasterFirst = recordMasterFirst.map((r: any) => ({ date: moment(r.date).format('YYYY-MM-DD'), value: r.value }));
    
        
        let dataset = chartRange.map((date, indx) => {
            let itemFirst = recordMasterFirst.find((r: any) => r.date === date);
            let valueFirst = itemFirst ? Number.isInteger(parseInt(itemFirst.value)) ? parseInt(itemFirst.value) : 0 : 0;
    
           
            return { a: valueFirst,  date: date };
        });
    
        setChartDataSet(dataset);
    }, [chartRange, fieldAttributeList, ]);
    
    const series: SeriesType[] = Array.from({ length: fieldList.length }, (_, index) => ({
        type: "line",
        dataKey: String.fromCharCode(97 + index), // Assuming 'a', 'b', 'c', ... based on index
        label: chartSeriesLabel
    }));
    
    const xAxis = [
        {
            scaleType: 'band',
            dataKey: 'date',
            label: 'Date',

        },
    ]
    const yAxis = [
        { id: 'leftAxis', label: chartYAxisLabel }, // Label for the first field
        
    ];
    
    
    return (
        <>
            <ToastContainer/>
            <Card variant='outlined' color='neutral'>
                <Typography level={"title-lg"} sx={{mb:2}}>Entity</Typography>
                <CardContent>
                    <Grid container spacing={2} sx={{flexGrow: 1}}>
                        {
                            userSelectItems.map(i => (
                                <Grid  {...(i.gridSize? i.gridSize : {xs:true})}  key={i.name} >
                                    <Typography level="title-md"  sx={{mb: 1}}>{i.formHead}</Typography>
                                    {
                                        i.selectList &&
                                        <Select 
                                        // {...(i.multiple?{multiple:i.multiple}:{})}
                                        name={i.name} 
                                        onChange={i.handleChange}
                                                size={'sm'}
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
                                </Grid>


                            ))
                        }
                    </Grid>
                </CardContent>
            </Card>

            {/*<Button type="submit"> Generate Trend</Button>*/}

            <TrendChartComponent chartTitle={chartTitle} dataset={chartDataSet} series={series} xAxis={xAxis} yAxis={yAxis} setChartStartDate={setChartStartDate} setChartEndDate={setChartEndDate}/>

        </>
    )
}