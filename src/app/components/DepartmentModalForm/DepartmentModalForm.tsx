'use client';
import * as React from 'react';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';

import Stack from '@mui/joy/Stack';

import { useContext, useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../Store/store';
import { createdepartment } from '../../Reducers/CreateDepartmentSlice';
import {editdepartment} from '../../Reducers/editDepartmentSlice';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Sheet from '@mui/joy/Sheet';
import Input from '@mui/joy/Input';
import { useRouter } from 'next/navigation';
import modalContext from "@/app/context/modalContext";

const DepartmentModalForm = (props:any) =>{

    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    const row = useContext(modalContext);

    const [formData, setFormData] = useState({
      departmentName: ""
    });
    const [editformData, seteditFormData] = useState({
      id: 0,
      departmentName: ""
    });
      
    
      const [departmentError, setdepartmentError] = useState('');
      
      useEffect(() => {
        if(row != null) {
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
    
    if(row != null) {
        try {
          // const userData = Object.fromEntries();
           
          dispatch(editdepartment(editformData)).then(() => {
            props.setOpen(false);
            router.push('/departmentlist');
          })
           
         } catch (error) {
           console.error('Failed to create user:', error);
           // Handle error (e.g., display error message)
         }
    } else {
        try {
          // const userData = Object.fromEntries();
           
          dispatch(createdepartment(formData)).then(() => {
            props.setOpen(false);
            router.push('/departmentlist');
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
          {props.label} Department
        </Typography>
        <Stack className='p-8'>
        <form className='gap-8 flex flex-wrap w-[100%] flex-row' onSubmit={handleSubmit}>
            {row != null &&
            <div className='flex justify-between items-center flex-col md:flex-row gap-4 w-full'>
                <div className='space-y-[2px] w-full'>
                    <h3 className='text-textdull text-xs mb-2'>ID</h3>
                    <Input size="sm" disabled name="id" value={editformData.id} />
                </div>
            </div>
            }
          <div className='flex justify-between items-center flex-col md:flex-row gap-4 w-full'>
              <div className='space-y-[2px] w-full'>
                  <h3 className='text-textdull text-xs mb-2'>Name</h3>
                  <Input size="sm" placeholder="Department Name" name="departmentName" value={formData.departmentName} onChange={handleChange}/>
                  {departmentError && <p>{departmentError}</p>}
              </div>
            </div>
          
          <Button type="submit"> {props.label} Department</Button>
          </form>
        </Stack>
      </Sheet>
    </Modal>
    )
}

export default DepartmentModalForm;