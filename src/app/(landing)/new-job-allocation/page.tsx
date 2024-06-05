'use client';
import Typography from "@mui/joy/Typography";
import {useRouter} from 'next/navigation';
import {useAuth} from '@/app/hooks/useAuth';
import {EventHandler, useEffect} from "react";
import {useDispatch} from 'react-redux';
import {AppDispatch} from '@/app/Store/store';
import Box from "@mui/joy/Box";


import * as React from "react";
import Users from "@/app/components/Users/Users";
import Button from "@mui/joy/Button";



export default function NewJobAllocationPage() {

    const auth = useAuth();
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    const handleOnJobAllocateClick = (userId:number) => {
        router.push(`/new-job-allocation/${userId}`, { scroll: false });
    }

    const UserActionComponent = ()=>{
        return (<Button size={'sm'}>Allocate Job</Button>)
    }


    useEffect(() => {
        !auth ? (localStorage.removeItem('accessToken'),
            dispatch({type: "USER_LOGOUT"}),
            router.push("/", {scroll: false})) : ('')
    }, []);

    return (

        <>
            {
                auth ? (<>
                    <Box
                        sx={{
                            display: 'flex',
                            mb: 1,
                            gap: 1,
                            flexDirection: {xs: 'column', sm: 'row'},
                            alignItems: {xs: 'start', sm: 'center'},
                            flexWrap: 'wrap',
                            justifyContent: 'space-between'
                        }}
                    >
                        <Users actions={UserActionComponent} handleFunction = {handleOnJobAllocateClick} />
                    </Box>

                </>) : (<Typography level={"body-xs"}>You will be redirected to Login page as session expired</Typography>)

            }

        </>

    )

}