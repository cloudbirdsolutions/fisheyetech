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
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const DepartmentModalForm = (props:any) =>{

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
      
    
      const [departmentError, setdepartmentError] = useState('');
      
      useEffect(() => {
        if(row!=null) {
          seteditFormData({
                id: row?.id,
                departmentName: row?.name
              });
        } else {
            setFormData({
                departmentName: ""
            })
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
        
    
        // Clear corresponding error message when input changes
        switch (name) {
          case 'departmentName':
            setdepartmentError('');
            break;
          default:
            break;
        }
      };
    
      const handleSubmit = async (e:any) => {
        e.preventDefault();
    
        // Check if required fields are filled
        if (!formData.departmentName) {
          // Display error message for missing fields
          setdepartmentError('Department Name is required');
          
          return;
        }
    
    if(row!=null) {
        try {
          // const userData = Object.fromEntries();
           
          dispatch(editdepartment(editformData)).then((res) => {
            res.payload.statusCode == 200 ? (
              toast.success(res.payload.message),
            props.setOpen(false),
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
        try {
          // const userData = Object.fromEntries();
           
          dispatch(createdepartment(formData)).then((res) => {
            res.payload.statusCode == 200 ? (
              toast.success(res.payload.message),
            props.setOpen(false),
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
        <form style={{display:'flex' , flexDirection: 'column', gap: '8'}} onSubmit={handleSubmit}>
            {row!=null &&
            <Box component="div" display="flex" alignItems="center" flexDirection={'row'} py={2}>
                <Box component="div" sx={{width:'100%'}}>
                <Typography level="h3" fontSize="sm" sx={{ mb: 0.5 }}>ID</Typography>
                    <Input size="sm" disabled name="id" value={editformData.id} />
                </Box>
            </Box>
            }
            <Box component="div" display="flex" alignItems="center" flexDirection={'column'} py={2}>
              <Box component="div" sx={{width:'100%'}}>
                 <Typography level="h3" fontSize="sm" sx={{ mb: 0.5 }}>Name</Typography>
                  <Input size="sm" placeholder="Department Name" name="departmentName" value={row!= null?editformData.departmentName : formData.departmentName} onChange={handleChange}/>
                  {departmentError && <p>{departmentError}</p>}
              </Box>
            </Box>
          
          <Button type="submit"> {props.label} Department</Button>
          </form>
        </Stack>
      </ModalDialog>
    </Modal>
    )
}

export default DepartmentModalForm;