import React, {useEffect} from "react";
import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";
import Input from "@mui/joy/Input/Input";
import Button from "@mui/joy/Button";
import {Sheet} from "@mui/joy";
import {useApi} from "@/app/api/hooks/useApi";
import {Department, Designation, Shift} from "@/app/types"
import {useState} from "react";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import {deepGet} from "@/app/utils";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface AddUserJobProps {
    id: string,
}

export default function AddUserJob(props: AddUserJobProps) {


    const [selectedDepartmentId, setSelectedDepartmentId] = useState<number>(0);
    const [selectedSheetId, setSelectedSheetId] = useState<number>(0);
    const [selectedDesignationId, setSelectedDesignationId] = useState<number>(0);
    const [selectedShiftId, setSelectedShiftId] = useState<number>(0);

    const {
        data: departments,
        isLoading: isDepartmentLoading,
        error: departmentError,
        fetchData: fetchDepartmentList
    } = useApi<Department>(`/departments/get`, {method: 'GET'});
    const {
        data: sheets,
        isLoading: isSheetLoading,
        error: sheetError,
        fetchData: fetchSheetList
    } = useApi<Department>(`/departmentsheets/get-sheets?id=${selectedDepartmentId}`, {method: 'GET'});
    const {
        data: designations,
        isLoading: isDesignationLoading,
        error: designationError,
        fetchData: fetchDesignationList
    } = useApi<Designation>(`/designation/sheet/${selectedSheetId}`, {method: 'GET'});
    const {
        data: shifts,
        isLoading: isShiftLoading,
        error: shiftError,
        fetchData: fetchShiftList
    } = useApi<Shift>(`/sheetshiftmaster/get-shift?id=${selectedSheetId}`, {method: 'GET'});
    const {
        data: createJob,
        isLoading: isCreateJobLoading,
        error: createJObError,
        fetchData: createJobApi
    } = useApi<any>(`/joballocation/create`, {
        method: 'POST', data: {
            userId: parseInt(props.id),
            departmentId: selectedDepartmentId,
            designationId: selectedDesignationId,
            sheetId: selectedSheetId,
            shiftId: selectedShiftId
        }
    });


    useEffect(() => {
        fetchDepartmentList()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        fetchSheetList()
    }, [selectedDepartmentId]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        fetchDesignationList();
        fetchShiftList()
    }, [selectedSheetId]); // eslint-disable-line react-hooks/exhaustive-deps


    const handleSubmit = () => {
        createJobApi().then(r=>{
            toast.success("Job allocaition success")
          window.location.reload();
        })
    }

    const userSelectItems = [
        {
            formHead: 'Department Name',
            name: 'departmentId',
            selectList: departments,
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
            }
        },
        {
            formHead: 'Sheet Name',
            name: 'sheetId',
            selectList: sheets,
            valueId: 'sheetId',
            optionLabel: 'sheetMaster.sheetName',
            selected: selectedSheetId,
            handleChange: (
                event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element> | React.FocusEvent<Element, Element> | null,
                newValue: number | null,
            ) => {
                if (newValue)
                    setSelectedSheetId(newValue)
                setSelectedDesignationId(0)
                setSelectedShiftId(0)
            }
        },
        {
            formHead: 'Designation',
            name: 'designation',
            selectList: designations,
            valueId: 'designationId',
            optionLabel: 'designationMaster.designationName',
            selected: selectedDesignationId,
            handleChange: (
                event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element> | React.FocusEvent<Element, Element> | null,
                newValue: number | null,
            ) => {
                if (newValue)
                    setSelectedDesignationId(newValue)
            }
        }, {
            formHead: 'Shift',
            name: 'shift',
            selectList: shifts,
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

    ]


    return (
        <>
        <ToastContainer/>
        <Sheet variant="outlined" color="neutral" sx={{p: 4, borderRadius: "lg"}}>

            <Typography level={"title-lg"}>Add New Job</Typography>

            <Box component="div" display="flex" alignItems="center" width={'100%'}
                 flexDirection={{xs: 'column', sm: 'column', md: 'row'}} py={1} gap={2}>
                <Box component="div" width={{xs: '100%', sm: '100%', md: '25%'}}>
                    <Typography level="h3" fontSize="sm" sx={{mb: 0.5}}>ID</Typography>
                    <Input size="sm" disabled name="id" value={props.id}/>
                </Box>
                <Box component="div" width={{xs: '100%', sm: '100%', md: '25%'}}>
                    <Typography level="h3" fontSize="sm" sx={{mb: 0.5}}>User Name</Typography>
                    <Input size="sm" disabled placeholder="userName" name="userName"/>
                </Box>

                {
                    userSelectItems.map(i => (

                        <Box component="div" width={{xs: '100%'}} key={i.name}>
                            <Typography level="h3" fontSize="sm" sx={{mb: 0.5}}>{i.formHead}</Typography>
                            {
                                i.selectList &&
                                <Select size={'sm'} name={i.name} onChange={i.handleChange}
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
            <Box component="div" >
                <Button onClick={() => {
                    handleSubmit()
                }} loading={isCreateJobLoading}> Add Job</Button>
            </Box>

        </Sheet>
        </>)
}