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

const schema = z.object({
  sheetName: z.string().min(1, {message: 'Please Enter the Sheet Name'}),
  });
const EntityModalForm = (props:any) =>{

  const methods = useForm({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
  });

    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    const row:any = useContext(modalContext);

    const [editformData, seteditFormData] = useState({
        id: "",
        sheetName: ""
      });

      const [formData, setFormData] = useState({
        sheetName: ""
      });
    
      
      useEffect(() => {
        if(row != null) {
            seteditFormData({
                id: row?.id,
                sheetName: row?.sheetName
              });
        } else {
            setFormData({
                sheetName: ""
              })
        }
      },[row])
      
    
      const handleChange = (e:any) => {
        const { name, value, type, checked } = e.target;
        if(row!=null) {
          seteditFormData(prevState => ({
            ...prevState,
            [name]: e.target.name === 'id' ? parseInt(value) : value     
          }));
        } else {
        setFormData(prevState => ({
          ...prevState,
          [name]: value     
        }));
      }
    
      };
    
      const handleSubmit = async (e:any) => {
    
    
          if(row != null) {
            e = {...e, "id" : editformData.id};
              try {
                // const userData = Object.fromEntries();
                
                dispatch(editentity(e)).then((res) => {
                
                  res.payload.statusCode === 200 ? (
                    toast.success(res.payload.message),
                    props.setOpen(false),
                    methods.reset(),
                    router.push('/entities')
                  ) : 
                    (
                      toast.error(res.payload.message)
                    )
                })
                
              } catch (error:any) {
                toast.error(error)
                // Handle error (e.g., display error message)
              }
          } else {
            e = {...e, "description": ""};
              try {
                // const userData = Object.fromEntries();
                
                dispatch(createEntity(e)).then((res) => {
                  res.payload.statusCode === 200 ? (
                    toast.success(res.payload.message),
                    props.setOpen(false),
                    setFormData({
                      sheetName: ''
                    }),
                    methods.reset(),

                    router.push('/entities')
                  ) : 
                    (
                      toast.error(res.payload.message)
                    )
                })
                
              } catch (error) {
                console.error('Failed to create user:', error);
                // Handle error (e.g., display error message)
              }
    }
       
    
      }

    return (
          
      <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      open={props.open}
      onClose={() => {props.setOpen(false), methods.reset()}}
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
          {props.label} Entity
        </Typography>
        <Stack >
        <FormProvider {...methods}>
        <form style={{display:'flex' , flexDirection: 'column', gap: '8'}} onSubmit={methods.handleSubmit(handleSubmit )}>
           { row != null &&
                <Box component="div" display="flex" alignItems="center" flexDirection={'row'} py={2}>
                <Box component="div" sx={{width:'100%'}}>
                  <Typography level="h3" fontSize="sm" sx={{ mb: 0.5 }}>ID</Typography>
                    <Input size="sm" disabled {...methods.register("id")} value={row!=null ? editformData.id: ''}  />
                </Box>
                </Box>
          }
                <Box component="div" display="flex" alignItems="center" flexDirection={'row'} py={2}>
                <Box component="div" sx={{width:'100%'}}>
                  <Typography level="h3" fontSize="sm" sx={{ mb: 0.5 }}>Sheet Name</Typography>
                  <Input size="sm" placeholder="sheetName" {...methods.register("sheetName")}  value={row!=null ? editformData.sheetName:formData.sheetName}
                              onChangeCapture={handleChange}/>
                                                {methods.formState.errors.sheetName?.message && <Typography fontSize="xs" color="danger">{`${methods.formState.errors.sheetName?.message}`}</Typography>}

                              </Box>
              </Box>
          <Button type="submit"> {props.label} Entity</Button>
          </form>
          </FormProvider>
        </Stack>
      </Sheet>
    </Modal>
    )
}

export default EntityModalForm;