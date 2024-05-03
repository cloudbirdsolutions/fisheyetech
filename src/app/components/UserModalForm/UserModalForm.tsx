'use client';
import * as React from 'react';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';

import Stack from '@mui/joy/Stack';

import { useContext, useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../Store/store';
import { createuser } from '../../Reducers/CreateUserSlice';
import {edituser} from '../../Reducers/editUserSlice';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Sheet from '@mui/joy/Sheet';
import Input from '@mui/joy/Input';
import { useRouter } from 'next/navigation';
import modalContext from "@/app/context/modalContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Box from '@mui/joy/Box';
import Grid from '@mui/joy/Grid';

const UserModalForm = (props:any) =>{

    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    const row:any = useContext(modalContext);

    const [formData, setFormData] = useState({
        name: "",
        userName: "",
        address: "",
        phone: "",
        password: "",
        statusId: 0,
        rolesId: 0
      });

      
    const [editformData, seteditFormData] = useState({
      id:0,
      name: "",
      userName: "",
      address: "",
      phone: "",
      password: "",
      statusId: 0,
      rolesId: 0
    });
    
      
    
      const [nameError, setnameError] = useState('');
       const [phonenoError, setPhonenoError] = useState('');
      const [userName, setuserNameError] = useState('');
      const [addressError, setaddressError] = useState('');
      const [passwordError, setpasswordError] = useState('');
      const [statusError, setstatusError] = useState('');

      const [role, setRole] = useState([{
        "id": 4,
      "createdAt": "2024-04-20T08:42:38.910Z",
      "updatedAt": "2024-04-20T08:42:38.910Z",
      "roleName": "admin",
      "roleStatus": 1,
      "permissionId": 1,
      "statusMaster": {
        "statusName": "ACTIVE"
      },
      "permissionType": {
        "permissionType": "Data Entry"
      }

    }])
      useEffect(() => {
        if(row!=null) {
            seteditFormData({
                id: row?.id,
                name: row?.name,
                userName: row?.userName,
                address: row?.address,
                phone: row?.phone,
                password: row?.password,
                statusId: row?.statusId,
                rolesId: row?.rolesId
              });
        } else {
            setFormData({
                name: "",
                userName: "",
                address: "",
                phone: "",
                password: "",
                statusId: 0,
                rolesId: 0
              })
        }

        const getrole = async () => {
          try {
          const response = await fetch('http://51.79.147.139:3000/roles/get', {
              method: 'GET',
              headers: {
                Accept : "application/json",
                'Content-Type': 'application/json',
              }
            });
      
            if (!response.ok) {
              throw new Error('Failed to fetch user details: ' + response.statusText);
            }
      
            const data = await response.json();
            
            setRole(data.data);
          } catch (error) {
            console.error('Error fetching user details:', error);
          }
          
      }
      getrole();

      },[row])
      
    
      const handleChange = (e:any) => {
        const { name, value, type, checked } = e.target;
        if(row!=null) {
          seteditFormData(prevState => ({
            ...prevState,
            [name]: e.target.name === 'id' || e.target.name === 'statusId' || e.target.name === 'rolesId' ? parseInt(value) : value     
          }));
        } else {
        setFormData(prevState => ({
          ...prevState,
          [name]: e.target.name === 'statusId' || e.target.name === 'rolesId' ? parseInt(value) : value     
        }));
      }
    
        
    
        // Clear corresponding error message when input changes
        switch (name) {
          case 'name':
            setnameError('');
            break;
          case 'userName':
            setuserNameError('');
            break;
            case 'phone':
              setPhonenoError('');
            break;
          case 'address':
            setaddressError('');
            break;
          case 'password':
            setpasswordError('');
            break;
            case 'statusId':
            setstatusError('');
            break;
          default:
            break;
        }
      };
    
      const handleSubmit = async (e:any) => {
        e.preventDefault();
    
        
    
    if(row!=null) {
      // Check if required fields are filled
      if (!editformData.name || !editformData.password || editformData.statusId === 0 || !editformData.userName) {
        // Display error message for missing fields
        if (!editformData.name) {
          setnameError('Name is required');
        }
        
        if (!editformData.password) {
          setpasswordError('Password is required');
        }
        /*if (!editformData.address) {
          setaddressError('Address is required');
        }
        if (!editformData.phone) {
          setPhonenoError('Phone Number is required');
        }*/
        if (!editformData.statusId) {
          setstatusError('Status is required');
        }
        if (!editformData.userName) {
          setuserNameError('User Name is required');
        }
        return;
      }
        try {
          // const userData = Object.fromEntries();
           
          dispatch(edituser(editformData)).then((res) => {
           
            res.payload.statusCode === 200 ? (
              toast.success(res.payload.message),
              props.setOpen(false),
            router.push('/users')
              ) : 
              (
                toast.error(res.payload.message)
              )
          })
           
         } catch (error) {
           console.error('Failed to create user:', error);
           // Handle error (e.g., display error message)
         }
    } else {

      // Check if required fields are filled
      if (!formData.name || !formData.password || formData.statusId === 0 || !formData.userName) {
        // Display error message for missing fields
        if (!formData.name) {
          setnameError('Name is required');
        }
        
        if (!formData.password) {
          setpasswordError('Password is required');
        }
        /*if (!formData.address) {
          setaddressError('Address is required');
        }
        if (!formData.phone) {
          setPhonenoError('Phone Number is required');
        }*/
        if (!formData.statusId) {
          setstatusError('Status is required');
        }
        if (!formData.userName) {
          setuserNameError('User Name is required');
        }
        return;
      }

        try {
          // const userData = Object.fromEntries();
           
          dispatch(createuser(formData)).then((res) => {
            res.payload.statusCode === 200 ? (
              toast.success(res.payload.message),
              props.setOpen(false),
            router.push('/users')
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
      onClose={() => props.setOpen(false)}
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: '9999' }}
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
        <ToastContainer/>
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
        <form style={{display:'flex' , flexDirection: 'column', gap: '8'}} onSubmit={handleSubmit}>
        <Box component="div" display="flex" alignItems="center" flexDirection={{xs: 'column', sm: 'column', md: 'row'}} py={1} gap={2}>
            {row!=null &&
            
              <Box component="div" width={{xs: '100%', sm: '100%', md: '50%'}}>
                    <Typography level="h3" fontSize="sm" sx={{ mb: 0.5 }}>ID</Typography>
                    <Input disabled name="id" value={editformData.id} style={{width:'100%'}}/>
                </Box>
            }
                <Box component="div" width={{xs: '100%', sm: '100%', md: '50%'}}>
                  <Typography level="h3" fontSize="sm" sx={{ mb: 0.5 }}>Role</Typography>
                    {
                    role && 
                    <select multiple={false} name="rolesId" onChange={handleChange} style={{padding: '8px', borderRadius: '5px', borderColor: '#ccc', width: '100%'}}>
                        <option value={0}>Select</option>
                        {role.map((r:any, i) => {
                            return <option key={i} value={r.id}>{r.roleName}</option>
                        })                
                        }   
                    </select>
                 }
                </Box>
            </Box>
          
            <Box component="div" display="flex" alignItems="center" flexDirection={{xs: 'column', sm: 'column', md: 'row'}} py={1} gap={2}>
              <Box component="div" width={{xs: '100%', sm: '100%', md: '50%'}}>
                <Typography level="h3" fontSize="sm" sx={{ mb: 0.5 }}>Name</Typography>
                  <Input size="sm" placeholder="name" name="name" value={row!=null ? editformData.name : formData.name} onChange={handleChange}/>
              </Box>
              <Box component="div" width={{xs: '100%', sm: '100%', md: '50%'}}>
              <Typography level="h3" fontSize="sm" sx={{ mb: 0.5 }}>User Name</Typography>
                  <Input size="sm" placeholder="userName" name="userName" value={row!=null ? editformData.userName : formData.userName}
                              onChange={handleChange}/>
              </Box>
            </Box>
            <Box component="div" display="flex" alignItems="center" flexDirection={{xs: 'column', sm: 'column', md: 'row'}} py={1} gap={2}>
              
            <Box component="div" width={{xs: '100%', sm: '100%', md: '50%'}}>
              <Typography level="h3" fontSize="sm" sx={{ mb: 0.5 }}>Password</Typography>
                  <Input size="sm" placeholder="password" name="password" value={row!=null ? editformData.password : formData.password}
                              onChange={handleChange}/>
              </Box>
              <Box component="div" width={{xs: '100%', sm: '100%', md: '50%'}}>
              <Typography level="h3" fontSize="sm" sx={{ mb: 0.5 }}>Status</Typography>
                    <select name="statusId" onChange={handleChange} style={{padding: '8px', borderRadius: '5px', borderColor: '#ccc', width: '100%'}}>
                        <option value={0}>SELECT</option>
                        <option value={1}>ACTIVE</option>
                        <option value={2}>INACTIVE</option>
                        <option value={3}>PENDING</option>
                    </select>
              </Box>
            </Box>
            <Box component="div" display="flex" alignItems="center" flexDirection={'row'} py={1} gap={2}>
              {/* <div className='space-y-[2px] w-full'>
                  <h3 className='text-textdull text-xs mb-2'>Address</h3>
                  <Input size="sm" placeholder="address" name="address" value={row!=null ? editformData.address : formData.address}
                              onChange={handleChange}/>
              </div> */}
              {/* <div className='space-y-[2px] w-full'>
                  <h3 className='text-textdull text-xs mb-2'>Phone</h3>
                  <Input size="sm" placeholder="phonenumber" name="phone" value={row!=null ? editformData.phone : formData.phone}
                              onChange={handleChange}/>
              </div> */}
            </Box>
          
          <Button type="submit"> {props.label} User</Button>
          </form>
        </Stack>
      </Sheet>
    </Modal>
    )
}

export default UserModalForm;