'use client';
import * as React from 'react';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';

import Stack from '@mui/joy/Stack';

import { useContext, useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../Store/store';
import { createrole } from '../../Reducers/CreateRoleSlice';
import {editrole} from '../../Reducers/editRoleSlice';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import { useRouter } from 'next/navigation';
import ModalDialog from '@mui/joy/ModalDialog/ModalDialog';
import Box from '@mui/joy/Box';
import Input from '@mui/joy/Input/Input';
import modalContext from '@/app/context/modalContext';

const RoleModalForm = (props:any) =>{

    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    const row:any = useContext(modalContext);

    const [formData, setFormData] = useState({
      roleName: "",
      roleStatus: 0
    });
    const [editformData, seteditFormData] = useState({
      id: 0,
      roleName: "",
      roleStatus: 0
    });
      
    
      const [roleError, setroleError] = useState('');
      
      useEffect(() => {
        if(row!=null) {
          seteditFormData({
                id: row?.id,
                roleName: row?.roleName,
                roleStatus: row?.status
              });
        } else {
            setFormData({
                roleName: "",
                roleStatus: 0
            })
        }
      },[row])
      
    
      const handleChange = (e:any) => {
        const { name, value, type, checked } = e.target;
           
        if(row!=null) {
          seteditFormData(prevState => ({
            ...prevState,
            [name]: e.target.name === 'roleStatus'  ? parseInt(value) : value     
          }));
        } else {
        setFormData(prevState => ({
          ...prevState,
          [name]: e.target.name === 'roleStatus'  ? parseInt(value) : value      
        }));
      }
        
    
        // Clear corresponding error message when input changes
        switch (name) {
          case 'roleName':
            setroleError('');
            break;
            break;
          default:
            break;
        }
      };
    
      const handleSubmit = async (e:any) => {
        e.preventDefault();
    
        // Check if required fields are filled
        if(row!=null) {
        if (!editformData.roleName) {
          // Display error message for missing fields
          setroleError('Role Name is required');
          
          return;
        }
      } else {
        if (!formData.roleName) {
          // Display error message for missing fields
          setroleError('Role Name is required');
          
          return;
        }
      }
    
    if(row!=null) {
        try {
          // const userData = Object.fromEntries();
           
          dispatch(editrole(editformData)).then(() => {
            props.setOpen(false);
            router.push('/rolelist');
          })
           
         } catch (error) {
           console.error('Failed to create user:', error);
           // Handle error (e.g., display error message)
         }
    } else {
        try {
          // const userData = Object.fromEntries();
           
          dispatch(createrole(formData)).then(() => {
            props.setOpen(false);
            router.push('/rolelist');
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
          {props.label} Role
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
                 <Typography level="h3" fontSize="sm" sx={{ mb: 0.5 }}>Role Name</Typography>
                  <Input size="sm" placeholder="Role Name" name="roleName" value={row!= null? editformData.roleName : formData.roleName} onChange={handleChange}/>
                  {roleError && <p>{roleError}</p>}
              </Box>
            </Box>
            <Box component="div" display="flex" alignItems="center" flexDirection={'column'} py={2}>
            <Box component="div" sx={{width: '100%'}}>
              <Typography level="h3" fontSize="sm" sx={{ mb: 0.5 }}>Status</Typography>
                    <select name="roleStatus" onChange={handleChange} style={{padding: '8px', borderRadius: '5px', borderColor: '#ccc', width: '100%'}}>
                        <option value={0}>SELECT</option>
                        <option value={1}>ACTIVE</option>
                        <option value={2}>INACTIVE</option>
                        <option value={3}>PENDING</option>
                    </select>
              </Box>
              </Box>
          
          <Button type="submit"> {props.label} Role</Button>
          </form>
        </Stack>
      </ModalDialog>
    </Modal>
    )
}

export default RoleModalForm;