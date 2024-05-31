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

const schema = z.object({
    rolesId: z.preprocess((a) => parseInt(z.string().parse(a)), z.number().min(1, { message: "Please Select the Roles" })),
    name: z.string().min(1, { message: 'Please Enter the Name' }),
    userName: z.string().trim().nonempty({ message: "Please Enter the User Name" }),
    password: z.string().min(1, { message: 'Please Enter the Password' }),
    statusId: z.preprocess((a) => parseInt(z.string().parse(a)), z.number().min(1, { message: "Please Select the Status" })),
});

const FollowupModalForm = (props: any) => {
    const logintype = useSelector((state: RootState) => state?.user.data);
    const methods = useForm({
        resolver: zodResolver(schema),
        reValidateMode: 'onChange',
    });

    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const row: any = useContext(modalContext);
    const auth = useAuth();

    // Initialize state with props to avoid resetting on re-render
    const [status, setStatus] = useState(props.initialStatus || '');
    const [remarks, setRemarks] = useState(props.initialRemarks || '');
    const [created, setCreated] = useState(props.initialCreatedBy || '');
    const [updated, setUpdated] = useState(props.initialUpdatedBy || '');

    const handleRemarks = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRemarks(event.target.value);
        props.onInputChange(event.target.value);
    };

    const handleCreate = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCreated(event.target.value);
        props.onCreateChange(event.target.value);
    };

    const handleUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUpdated(event.target.value);
        props.onUpdateChange(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        props.setOpen(false); // Close the modal
        toast.success('Form submitted successfully!');
    };

    const handleStatusChange = (event: React.MouseEvent | React.KeyboardEvent | React.FocusEvent | null, value: string | null) => {
        if (value !== null) {
            setStatus(value);
            props.onStatusChange(value);
        }
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
                {props.label} User
            </Typography>
            <Stack className='p-8'>
                <FormProvider {...methods}>
                    <form style={{ display: 'flex', flexDirection: 'column', gap: '8' }} onSubmit={handleSubmit}>
                        <Box component="div" display="flex" alignItems="center" flexDirection={{ xs: 'column', sm: 'column', md: 'row' }} py={1} gap={2}>
                            <Box component="div" width={{ xs: '100%', sm: '100%', md: '50%' }}>
                                <Typography level="h3" fontSize="sm" sx={{ mb: 0.5 }}>CreatedBy</Typography>
                                <Input size="sm" placeholder="CreatedBy" value={created} onChange={handleCreate} />
                            </Box>
                            <Box component="div" width={{ xs: '100%', sm: '100%', md: '50%' }}>
                                <Typography level="h3" fontSize="sm" sx={{ mb: 0.5 }}>UpdatedBy</Typography>
                                <Input size="sm" placeholder="UpdatedBy" value={updated} onChange={handleUpdate} />
                            </Box>
                        </Box>
                        <Box component="div" display="flex" alignItems="center" flexDirection={{ xs: 'column', sm: 'column', md: 'row' }} py={1} gap={2}>
                            <Box component="div" width={{ xs: '100%', sm: '100%', md: '50%' }}>
                                <Typography level="h3" fontSize="sm" sx={{ mb: 0.5 }}>Remarks</Typography>
                                <Input size="sm" placeholder="Remarks" value={remarks} onChange={handleRemarks} />
                            </Box>
                            <Box component="div" width={{ xs: '100%', sm: '100%', md: '50%' }}>
                                <Typography level="h3" fontSize="sm" sx={{ mb: 0.5 }}>Status</Typography>
                                <Select value={status} onChange={handleStatusChange}>
                                    <Option value="new">New</Option>
                                    <Option value="inprogress">InProgress</Option>
                                    <Option value="pending">Pending</Option>
                                    <Option value="closed">Closed</Option>
                                </Select>
                            </Box>
                        </Box>
                        <Button type="submit"> Submit </Button>
                    </form>
                </FormProvider>
            </Stack>
        </Sheet>
    )
}

export default FollowupModalForm;
