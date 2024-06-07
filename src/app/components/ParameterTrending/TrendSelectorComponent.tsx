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
import {useAuth} from "@/app/hooks/useAuth";
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import {deepGet} from '@/app/utils'


export default function TrendSelectorComponent(props: any) {


    // All List
    const [departmentList, setDepartmentList] = useState([]);
    const [sheetList, setSheetList] = useState([]);
    const [shiftList, setShiftList] = useState([]);
    const [groupList, setGroupList] = useState([]);
    const [parameterList, setParameterList] = useState([]);
    const [fieldList, setFieldList] = useState([]);
    const [readingList, setReadingList] = useState([]);

    // user selected items

    const [selectedDepartmentId, setSelectedDepartmentId] = useState(0);
    const [selectedSheetId, setSelectedSheetId] = useState(0);
    const [selectedShiftId, setSelectedShiftId] = useState(0);
    const [selectedGroupId, setSelectedGroupId] = useState(0);
    const [selectedParamterId, setSelectedParamterId] = useState(0);
    const [selectedFieldId, setSelectedFieldId] = useState(0);
    const [selectedReadingId, setSelectedReadingId] = useState(0);


    // const [formData, setFormData] = useState({
    //     userId: props?.selectedrows?.id,
    //     departmentId: 0,
    //     permissionId: 0,
    //     sheetId: 0,
    //     shiftId: 0
    // });


    const auth = useAuth();

    useEffect(() => {

        const getDepartment = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/departments/get`, {
                    method: 'GET',
                    headers: {
                        Accept: "application/json",
                        'Content-Type': 'application/json',
                        Authorization: "Bearer " + auth,
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch user details: ' + response.statusText);
                }

                const data = await response.json();

                setDepartmentList(data.data);
            } catch (error) {
                console.error('Error fetching user details:', error);
            }

        }
        getDepartment();


    }, [])

    useEffect(() => {

        const getSheetList = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/departmentsheets/get-sheets?id=${selectedDepartmentId}`, {
                    method: 'GET',
                    headers: {
                        Accept: "application/json",
                        'Content-Type': 'application/json',
                        Authorization: "Bearer " + auth,
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch sheet details: ' + response.statusText);
                }
                const data = await response.json();
                setSheetList(data.data);
            } catch {

            }

        }

        getSheetList();


    }, [selectedDepartmentId])
    
    useEffect(() => {

        const getShiftList = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/sheetshiftmaster/get-shift?id=${selectedSheetId}`, {
                    method: 'GET',
                    headers: {
                        Accept: "application/json",
                        'Content-Type': 'application/json',
                        Authorization: "Bearer " + auth,
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch sheet details: ' + response.statusText);
                }
                const data = await response.json();
                setShiftList(data.data);
            } catch {

            }

        }

        getShiftList();


    }, [selectedSheetId])
    
    useEffect(() => {

        const getSheetGroupList = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/charts/getvalues?sheetId=${selectedSheetId}`, {
                    method: 'GET',
                    headers: {
                        Accept: "application/json",
                        'Content-Type': 'application/json',
                        Authorization: "Bearer " + auth,
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch sheet details: ' + response.statusText);
                }
                const data = await response.json();
                setGroupList(data.data);
                setParameterList(data.data);
                setFieldList(data.data);
                setReadingList(data.data);
            } catch {

            }

        }

        getSheetGroupList();


    }, [selectedSheetId])

    const uniqueGroupList = Array.from(new Set(groupList.map((item: any) => item.groupMaster.id)))
    .map(groupId => groupList.find((item: any) => item.groupMaster.id === groupId))
    .filter(item => item !== undefined);

    const uniqueParameterList = Array.from(new Set(parameterList.map((item: any) => item.parameterMaster.id)))
    .map(parameterId => parameterList.find((item: any) => item.parameterMaster.id === parameterId))
    .filter(item => item !== undefined);

    const uniqueFieldList = Array.from(new Set(fieldList.map((item: any) => item.fieldMaster.id)))
    .map(fieldId => fieldList.find((item: any) => item.fieldMaster.id === fieldId))
    .filter(item => item !== undefined);

    // useEffect(() => {
    //     if (selectedGroupId) {
    //         const filteredParameters = groupList.find(group => group.id === selectedGroupId)?.data?.filter(
    //             item => item.groupId === selectedGroupId
    //         );
    //         setParameterList(filteredParameters || []); // Set filtered parameters or empty array if no group selected
    //     } else {
    //         setParameterList(groupList.flatMap(group => group.data) || []); // Use all parameters if no group selected
    //     }
    // }, [selectedGroupId]
    // )
    const uniqueReadingList = Array.from(new Set(readingList.map((item: any) => item.readingMaster.id)))
    .map(readingId => readingList.find((item: any) => item.readingMaster.id === readingId))
    .filter(item => item !== undefined);

    // useEffect(() => {

    //     const getShiftGroupParameterReadingList = async()=>{
    //         try {
    //         }
    //         catch {
    //         }
    //     }
    //     getShiftGroupParameterReadingList()
    //  }, [selectedSheetId])


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
            selectList:uniqueGroupList,
            valueId: 'groupId',
            optionLabel:'groupMaster.groupName',
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
            selectList:uniqueParameterList,
            valueId: 'parameterId',
            optionLabel:'parameterMaster.parameterName',
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
            selectList:uniqueFieldList,
            valueId: 'fieldId',
            optionLabel:'fieldMaster.fieldName',
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
            selectList:uniqueReadingList,
            valueId: 'readingId',
            optionLabel:'readingMaster.readingName',
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
            <form style={{gap: '8'}} onSubmit={handleSubmit}>
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
                                        {i.selectList.map((r: any, idx) => {
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
            </form>
            <Typography display={"flex"} level="h2" component="h1">Chart</Typography>
        </>
    )
}