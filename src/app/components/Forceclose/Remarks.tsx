'use client';
import * as React from 'react';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';

import Stack from '@mui/joy/Stack';

import { useContext, useEffect, useState } from 'react';


import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Sheet from '@mui/joy/Sheet';
import Input from '@mui/joy/Input';
import modalContext from "@/app/context/modalContext";
import Box from '@mui/joy/Box';
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RootState } from '@/app/Store/store';
import { useSelector } from 'react-redux';

const schema = z.object({
    remarks:z.string().min(1, {message: 'Please Enter the Remarks'}),
    });
const Remarks = (props:any) =>{

    const row:any = useContext(modalContext);
    const logintype = useSelector((state: RootState) => state?.user.data);


    const methods = useForm({
        resolver: zodResolver(schema),
        reValidateMode: 'onChange',
      });

    const resolvefn = async (e:any) => {
        e = {...e, "docId": row.id, "createdBy": logintype?.data?.id}
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_HOST}/sheetdocid/forcecomplete`,
          {
            // const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/departments/get`, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body : JSON.stringify(e)
          }
        );
    
        if (!response.ok) {
          const errorData = await response.json();
          toast.error(errorData.message)
        } else {
            props.setOpen(false);
            window.location.reload();
        }
      }
    return (
          
      <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      open={props.open}
      onClose={() => {props.setOpen(false)}}
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >  
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
          Force Close
        </Typography>
        <Stack >
        <FormProvider {...methods}>

        <form style={{display:'flex' , flexDirection: 'column', gap: '8'}} onSubmit={methods.handleSubmit(resolvefn)}>
                <Box component="div" display="flex" alignItems="center" flexDirection={'row'} py={2}>
                <Box component="div" sx={{width:'100%'}}>
                  <Typography level="h3" fontSize="sm" sx={{ mb: 0.5 }}>ID</Typography>
                    <Input size="sm" disabled {...methods.register("docId")} value={row?.id}/>
                </Box>
                </Box>
                <Box component="div" display="flex" alignItems="center" flexDirection={'row'} py={2}>
                <Box component="div" sx={{width:'100%'}}>
                  <Typography level="h3" fontSize="sm" sx={{ mb: 0.5 }}>Remarks</Typography>
                  <Input size="sm" placeholder="Remarks" {...methods.register("remarks")} />
                  {methods.formState.errors.remarks?.message && <Typography fontSize="xs" color="danger">{`${methods.formState.errors.remarks?.message}`}</Typography>}
                </Box>
              </Box>
          <Button type="submit"> Submit</Button>
          </form>
          </FormProvider>
        </Stack>
      </Sheet>
    </Modal>
    )
}

export default Remarks;