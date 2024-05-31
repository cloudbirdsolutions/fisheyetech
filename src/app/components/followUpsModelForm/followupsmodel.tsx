'use client';
import * as React from 'react';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';
import { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../Store/store';
import { createuser } from '../../Reducers/CreateUserSlice';
import { edituser } from '../../Reducers/editUserSlice';
import ModalClose from '@mui/joy/ModalClose';
import Sheet from '@mui/joy/Sheet';
import Input from '@mui/joy/Input';
import { useRouter } from 'next/navigation';
import modalContext from "@/app/context/modalContext";
import Box from '@mui/joy/Box';
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '@/app/hooks/useAuth';
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import { RootState } from '@/app/Store/store';
import { Remark } from '@/app/types';
import { API_BASE_URL } from '@/app/config';

const schema = z.object({
    // rolesId: z.preprocess((a) => parseInt(z.string().parse(a)), z.number().min(1, { message: "Please Select the Roles" })),
    // name: z.string().min(1, { message: 'Please Enter the Name' }),
    // userName: z.string().trim().nonempty({ message: "Please Enter the User Name" }),
    // password: z.string().min(1, { message: 'Please Enter the Password' }),
    // statusId: z.preprocess((a) => parseInt(z.string().parse(a)), z.number().min(1, { message: "Please Select the Status" })),
});

const FollowupModalForm = (props: any) => {

    const logintype = useSelector((state: RootState) => state?.user.data);
    const [currentRemark, setCurrentRemark] = useState<Remark>(props.selectedRemark)

    const methods = useForm({
        resolver: zodResolver(schema),
        reValidateMode: 'onChange',
    });


    const auth = useAuth();

    // Initialize state with props to avoid resetting on re-render
    ;

    const handleChange = (event: React.FormEvent) => {
        event.preventDefault();
        interface Map {
            [key: string]: string | undefined
        }
        let updatedObj: Map = {}
        updatedObj[event.currentTarget.id] = (event.target as HTMLInputElement).value

        let updatedRemarkObj = Object.assign({}, currentRemark, updatedObj)
        setCurrentRemark(updatedRemarkObj)

    }

    const handleSelectChange = (
        event: React.SyntheticEvent | null,
        newValue: string | null,
    ) => {
        // alert(`You chose "${newValue}"`);
        if (event) {
            interface Map {
                [key: string]: string | null
            }
            let updatedObj: Map = {}
            updatedObj[(event.target as HTMLSelectElement).id] = newValue

            let updatedRemarkObj = Object.assign({}, currentRemark, updatedObj)
            setCurrentRemark(updatedRemarkObj)
        }
    };

    const updateRemark = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/remarks/update`, {
                method: 'PUT',
                headers: {
                    Accept: "application/json",
                    'Content-Type': 'application/json',
                    Authorization: "Bearer "  + auth,
                },
                body : JSON.stringify({
                    id:currentRemark.id,
                    remarks:currentRemark.remarks,
                    status:currentRemark.status,
                    updatedBy:logintype.data.id
                })
            });

            if (!response.ok) {
                throw new Error('Failed to fetch user details: ' + response.statusText);
            }
            if(response.ok){
                toast.success('Form submitted successfully!');
            }
            const data = await response.json();
            return data
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    }


    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        props.setOpen(false); // Close the modal
        updateRemark();
        

    };


    return (
        <Sheet
            variant="outlined"
            sx={{
                maxWidth: 800,
                borderRadius: 'md',
                p: 3,
                boxShadow: 'lg',
            }}
        >
            <ModalClose variant="plain" sx={{ m: 1 }} />
            <Typography
                component="h2"
                id="modal-title"
                level="h4"
                textColor="inherit"
                fontWeight="lg"
                mb={1}
            >
                Edit Remarks
            </Typography>
            <Stack className='p-8'>
                <FormProvider {...methods}>
                    <form style={{ display: 'flex', flexDirection: 'column', gap: '8' }} onSubmit={handleSubmit}>
                        <Box component="div" display="flex" alignItems="center" flexDirection={{ xs: 'column', sm: 'column', md: 'row' }} py={1} gap={2}>
                            <Box component="div" width={{ xs: '100%', sm: '100%', md: '50%' }}>
                                <Typography level="h3" fontSize="sm" sx={{ mb: 0.5 }}>Remark Id</Typography>
                                <Input size="sm" placeholder="CreatedBy" value={currentRemark.id} id='id' disabled />
                            </Box>
                            <Box component="div" width={{ xs: '100%', sm: '100%', md: '50%' }}>
                                <Typography level="h3" fontSize="sm" sx={{ mb: 0.5 }}>Created By</Typography>
                                <Input size="sm" placeholder="UpdatedBy" value={currentRemark.createdUser.userName} disabled />
                            </Box>
                        </Box>
                        <Box component="div" display="flex" alignItems="center" flexDirection={{ xs: 'column', sm: 'column', md: 'row' }} py={1} gap={2}>
                            <Box component="div" width={{ xs: '100%', sm: '100%', md: '50%' }}>
                                <Typography level="h3" fontSize="sm" sx={{ mb: 0.5 }} >Remarks</Typography>
                                <Input size="sm" placeholder="Remarks" id='remarks' value={currentRemark.remarks} onChange={(e) => handleChange(e)} />
                            </Box>
                            <Box component="div" width={{ xs: '100%', sm: '100%', md: '50%' }}>
                                <Typography level="h3" fontSize="sm" sx={{ mb: 0.5 }}>Status</Typography>
                                <Select value={currentRemark.status} id='status' onChange={handleSelectChange}>
                                    <Option id='status' value="New">New</Option>
                                    <Option id='status' value="InProgress">InProgress</Option>
                                    <Option id='status' value="Pending">Pending</Option>
                                    <Option id='status' value="Closed">Closed</Option>
                                </Select>
                            </Box>
                        </Box>
                        <Button type="submit"> Update Remark </Button>
                    </form>
                </FormProvider>
            </Stack>
        </Sheet>
    )
}

export default FollowupModalForm;
