import Box from "@mui/joy/Box";
import Chip from "@mui/joy/Chip/Chip";
import Typography from "@mui/joy/Typography";
import TableSection from "../Common/TableSection";
import { useEffect, useState } from "react";
import Button from "@mui/joy/Button";
import Input from "@mui/joy/Input/Input";
import { createjob } from '../../Reducers/CreateJobSlice';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/Store/store";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "@/app/hooks/useAuth";
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import {deepGet} from '@/app/utils'


export default function TrendingChoose(props: any) {


    // All List
    const [departmentList, setDepartmentList] = useState([]);
    const [sheetList, setSheetList] = useState([]);
    const [shiftList, setShiftList] = useState([]);
    const [groupList, setGroupList] = useState([]);
    const [parameterList, setPrameterList] = useState([]);
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

        const getdepartment = async () => {
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
        getdepartment();


    }, [])

    // useEffect(() => {

    //     const getSheetList = async () => {
    //         try {
    //             const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/departmentsheets/get-sheets?id=${selectedDepartmentId}`, {
    //                 method: 'GET',
    //                 headers: {
    //                     Accept: "application/json",
    //                     'Content-Type': 'application/json',
    //                     Authorization: "Bearer " + auth,
    //                 }
    //             });

    //             if (!response.ok) {
    //                 throw new Error('Failed to fetch sheet details: ' + response.statusText);
    //             }
    //             const data = await response.json();
    //             setSheetList(data.data);
    //         }
    //         catch {

    //         }

    //     }

    //     getSheetList();


    // }, [selectedDepartmentId])

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
        formHead : 'Department Name',
        name: 'departmentId',
        selectList: departmentList,
        vauleId: 'id',
        optionLabel: 'departmentName',
        handleChange : (
            event: React.SyntheticEvent | null,
            newValue: number,
          ) => {
            setSelectedDepartmentId(newValue)
          }
        },
        {
            formHead : 'Sheet Name',
            name: 'sheetId',
            selectList: sheetList,
            vauleId: 'id',
            optionLabel: 'sheetMaster.sheetName',
            handleChange : (
                event: React.SyntheticEvent | null,
                newValue: number,
              ) => {
                setSelectedSheetId(newValue)
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
            <ToastContainer />
            <form style={{ gap: '8' }} onSubmit={handleSubmit}>
                <Box component="div" display="flex" alignItems="center" width={'100%'} flexDirection={{ xs: 'column', sm: 'column', md: 'row' }} py={1} gap={2}>
                    {/* <Box component="div" width={{ xs: '100%', sm: '100%', md: '25%' }}>
                        <Typography level="h3" fontSize="sm" sx={{ mb: 0.5 }}>Department Name</Typography>
                        {
                            departmentList &&
                            <select name="departmentId" onChange={handleChange} style={{ padding: '8px', borderRadius: '5px', borderColor: '#ccc', width: '100%' }}>
                                <option value={0}>Select</option>
                                {departmentList.map((r: any, i) => {
                                    return <option key={i} value={r.id}>{r.departmentName}</option>
                                })
                                }
                            </select>
                        }
                    </Box> */}

                    {
                        userSelectItems.map(i => (

                            <Box component="div" width={{ xs: '100%', sm: '100%', md: '25%' }}>
                                <Typography level="h3" fontSize="sm" sx={{ mb: 0.5 }}>{i.formHead}</Typography>
                                {
                                    i.selectList &&
                                    <Select name={i.name} onChange={i.handleChange} style={{ padding: '8px', borderRadius: '5px', borderColor: '#ccc', width: '100%' }}>
                                        <Option value={0}>Select</Option>
                                        {i.selectList.map((r: any, idx) => {
                                            return <Option key={idx} value={r[i.vauleId]}>{deepGet(r,i.optionLabel.replace(/\[([^\[\]]*)\]/g, '.$1.').split('.').filter(t => t !== ''))}</Option>
                                        })
                                        }
                                    </Select>
                                }
                            </Box>


                        ))
                    }


                </Box>

                <Button type="submit"> See Trending</Button>
            </form>
            <Typography display={"flex"} justifyContent={"center"} level="h2" component="h1">Chart</Typography>
            {/* <Typography display={"flex"} justifyContent={"center"} level="h2" component="h1">{selectedSheetId}</Typography> */}
        </>
    )
}