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

const EntityModalForm = (props:any) =>{

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
    
      
    
      const [sheetName, setsheetNameError] = useState('');
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
    
        
    
        // Clear corresponding error message when input changes
        switch (name) {
          case 'sheetName':
            setsheetNameError('');
            break;
          default:
            break;
        }
      };
    
      const handleSubmit = async (e:any) => {
        e.preventDefault();
    
        // Check if required fields are filled
          // Display error message for missing fields
          if(row != null) {
            if (!editformData.sheetName) {
              setsheetNameError('Sheet Name is required');
            
              return;
            }
          } else {
            if (!formData.sheetName) {
            setsheetNameError('Sheet Name is required');
          
            return;
          }
        }

    
    if(row != null) {
        try {
          // const userData = Object.fromEntries();
           
          dispatch(editentity(editformData)).then(() => {
            props.setOpen(false);
            router.push('/entities');
          })
           
         } catch (error) {
           console.error('Failed to create user:', error);
           // Handle error (e.g., display error message)
         }
    } else {
        try {
          // const userData = Object.fromEntries();
           
          dispatch(createEntity(formData)).then(() => {
            props.setOpen(false);
            router.push('/entities');
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
          {props.label} Entity
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
                  <h3 className='text-textdull text-xs mb-2'>Sheet Name</h3>
                  <Input size="sm" placeholder="sheetName" name="sheetName" value={row!=null ? editformData.sheetName:formData.sheetName}
                              onChange={handleChange}/>
              </div>
            </div>
          <Button type="submit"> {props.label} Entity</Button>
          </form>
        </Stack>
      </Sheet>
    </Modal>
    )
}

export default EntityModalForm;