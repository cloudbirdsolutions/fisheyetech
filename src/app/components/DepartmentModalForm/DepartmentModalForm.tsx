'use client';
import * as React from 'react';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';

import Stack from '@mui/joy/Stack';

import { useContext, useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../Store/store';
import { createdepartment } from '../../Reducers/CreateDepartmentSlice';
import {editdepartment} from '../../Reducers/editDepartmentSlice';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Sheet from '@mui/joy/Sheet';
import Input from '@mui/joy/Input';
import { useRouter } from 'next/navigation';
import modalContext from "@/app/context/modalContext";
import { Box, ModalDialog } from '@mui/joy';
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const schema = z.object({
  departmentName: z.string().min(1, {message: 'Please Enter the Department Name'}),
  });

const DepartmentModalForm = (props:any) =>{

  const methods = useForm({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
  });

    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    const row:any = useContext(modalContext);

    const [formData, setFormData] = useState({
      departmentName: ""
    });
    const [editformData, seteditFormData] = useState({
      id: 0,
      departmentName: ""
    });
      
    
     // const [departmentError, setdepartmentError] = useState('');
      
      useEffect(() => {
        if(row!=null) {
          seteditFormData({
                id: row?.id,
                departmentName: row?.departmentName
              });
        } else {
          setFormData({
            departmentName: ''
          });
        }
      },[row])
      
    
      const handleChange = (e:any) => {
        const { name, value, type, checked } = e.target;
           
        if(row!=null) {
          seteditFormData(prevState => ({
            ...prevState,
            [name]: e.target.name === 'id'  ? parseInt(value) : value     
          }));
        } else {
          setFormData(prevState => ({
            ...prevState,
            [name]: value     
          }));
        }
      };
    
      const handleSubmit = async (e:any) => {
        //e.preventDefault();
    
       

    if(row!=null) {
      e = {...e, "id" : editformData.id};
        try {
          
          dispatch(editdepartment(e)).then((res) => {
            res.payload.statusCode == 200 ? (
              toast.success(res.payload.message),
              props.setOpen(false),
              methods.reset(),
              router.push('/departmentlist') 
            ) : (
              toast.error(res.payload.message)
            )
          })
           
         } catch (error) {
           console.error('Failed to create user:', error);
           // Handle error (e.g., display error message)
         }
    } else {
      e = {...e};
        try {
          
          dispatch(createdepartment(e)).then((res) => {
            res.payload.statusCode == 200 ? (
              toast.success(res.payload.message),
              props.setOpen(false),
              setFormData({
                departmentName: ''
              }),
              methods.reset(),
              router.push('/departmentlist')
            ) : (
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
      onClose={() => props.setOpen(false)}
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >  
    <ModalDialog size='lg'>
        <ModalClose variant="plain" sx={{ m: 1 }} />
        <Typography
          component="h2"
          id="modal-title"
          level="h4"
          textColor="inherit"
          fontWeight="lg"
          mb={1}
        >
          {props.label} Department
        </Typography>
        <Stack>
        <FormProvider {...methods}>
        <form style={{display:'flex' , flexDirection: 'column', gap: '8'}} onSubmit={methods.handleSubmit(handleSubmit )}>
            {row!=null &&
            <Box component="div" display="flex" alignItems="center" flexDirection={'row'} py={2}>
                <Box component="div" sx={{width:'100%'}}>
                <Typography level="h3" fontSize="sm" sx={{ mb: 0.5 }}>ID</Typography>
                    <Input size="sm" disabled {...methods.register("id")} value={row!=null ? editformData.id: ''} />
                </Box>
            </Box>
            }
            <Box component="div" display="flex" alignItems="center" flexDirection={'column'} py={2}>
              <Box component="div" sx={{width:'100%'}}>
                 <Typography level="h3" fontSize="sm" sx={{ mb: 0.5 }}>Name</Typography>
                  <Input size="sm" placeholder="Department Name" {...methods.register("departmentName")} value={row!= null?editformData.departmentName : formData.departmentName} onChangeCapture={handleChange}/>
                  {methods.formState.errors.departmentName?.message && <Typography fontSize="xs" color="danger">{`${methods.formState.errors.departmentName?.message}`}</Typography>}
              </Box>
            </Box>
          
          <Button type="submit"> {props.label} Department</Button>
          </form>
          </FormProvider>
        </Stack>
      </ModalDialog>
    </Modal>
    )
}

export default DepartmentModalForm;