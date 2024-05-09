'use client';
import * as React from 'react';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';

import Stack from '@mui/joy/Stack';

import { useContext, useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../Store/store';
import { createEntity } from '../../Reducers/CreateEntitySlice';
import {editentity} from '../../Reducers/editEntitySlice';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Sheet from '@mui/joy/Sheet';
import Input from '@mui/joy/Input';
import { useRouter } from 'next/navigation';
import modalContext from "@/app/context/modalContext";
import Box from '@mui/joy/Box';
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Remarks = (props:any) =>{

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
        
        <form style={{display:'flex' , flexDirection: 'column', gap: '8'}} >
                <Box component="div" display="flex" alignItems="center" flexDirection={'row'} py={2}>
                <Box component="div" sx={{width:'100%'}}>
                  <Typography level="h3" fontSize="sm" sx={{ mb: 0.5 }}>ID</Typography>
                    <Input size="sm" disabled />
                </Box>
                </Box>
                <Box component="div" display="flex" alignItems="center" flexDirection={'row'} py={2}>
                <Box component="div" sx={{width:'100%'}}>
                  <Typography level="h3" fontSize="sm" sx={{ mb: 0.5 }}>Remarks</Typography>
                  <Input size="sm" placeholder="Remarks" />
                </Box>
              </Box>
          <Button type="submit"> Submit</Button>
          </form>
        </Stack>
      </Sheet>
    </Modal>
    )
}

export default Remarks;