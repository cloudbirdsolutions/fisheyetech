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
import Box from '@mui/joy/Box';
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const schema = z.object({
  rolesId: z.preprocess((a) => parseInt(z.string().parse(a)), z.number().min(1, { message: "Please Select the Roles" })),
  name: z.string().min(1, {message: 'Please Enter the Name'}),
  userName: z.string().trim().nonempty({ message: "Please Enter the User Name" }),
  password: z.string().min(1, {message: 'Please Enter the Password'}),
  statusId: z.preprocess((a) => parseInt(z.string().parse(a)), z.number().min(1, { message: "Please Select the Status" })),
});

const UserModalForm = (props:any) =>{
    
  const methods = useForm({
      resolver: zodResolver(schema),
      reValidateMode: 'onChange',
  });


    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    const row:any = useContext(modalContext);

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

    const [checkformData, setFormData] = useState({
      name: "",
      userName: "",
      address: "",
      phone: "",
      password: "",
      statusId: 0,
      rolesId: 0
    });
    
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

    const [status, setStatus] = useState([{
      "id": 1,
      "createdAt": "2024-04-20T07:51:59.687Z",
      "updatedAt": "2024-04-20T07:51:59.687Z",
      "statusName": "ACTIVE"
  }])


    useEffect(() => {
       if(row!=null) {
            seteditFormData({
                id: row?.id,
                name: row?.name,
                userName: row?.userName,
                phone: row?.phone,
                address: row?.address,
                password: row?.password,
                statusId: row?.statusId,
                rolesId: row?.rolesId
              });
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

      const getstatus = async () => {
        try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/statusMaster/get`, {
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
          
          setStatus(data.data);
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
        
    }
    getstatus();

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
      };
    
      const handleSubmit = async (formData:any) => {
       
        if(row!=null) {
          formData = {...formData, "phone": '', "address" : "", "id" : editformData.id};
            try {
              dispatch(edituser(formData)).then((res) => {
                res.payload.statusCode === 200 ? (
                  toast.success(res.payload.message),
                  props.setOpen(false),
                  methods.reset(),
                  router.push('/users')
                  ) : 
                  (
                    toast.error(res.payload.message)
                  )
              })
              
            } catch (error) {
              console.error('Failed to create user:', error);
            }
        } else {

          formData = {...formData, "phone": '', "address" : ""};

            try {
              dispatch(createuser(formData)).then((res) => {
                res.payload.statusCode === 200 ? (
                  toast.success(res.payload.message),
                  props.setOpen(false),
                  methods.reset(),
                  router.push('/users')
                  ) : 
                  (
                    toast.error(res.payload.message)
                  )
              })
              
            } catch (error) {
              console.error('Failed to create user:', error);
            }
        }
       
      }

    return (
          
      <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      open={props.open}
      onClose={() => {props.setOpen(false), methods.reset()}}
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
        <FormProvider {...methods}>
        <form style={{display:'flex' , flexDirection: 'column', gap: '8'}} onSubmit={methods.handleSubmit(handleSubmit )}>
        <Box component="div" display="flex" alignItems="center" flexDirection={{xs: 'column', sm: 'column', md: 'row'}} py={1} gap={2}>
            {row!=null &&
            
              <Box component="div" width={{xs: '100%', sm: '100%', md: '50%'}}>
                    <Typography level="h3" fontSize="sm" sx={{ mb: 0.5 }}>ID</Typography>
                    <Input disabled  style={{width:'100%'}} {...methods.register("id")} value={row!=null ? editformData.id: ''}/>
                </Box>
            }
                <Box component="div" width={{xs: '100%', sm: '100%', md: '50%'}}>
                  <Typography level="h3" fontSize="sm" sx={{ mb: 0.5 }}>Role</Typography>
                    {
                    role && 
                    <select multiple={false} {...methods.register("rolesId")} onChangeCapture={handleChange} style={{padding: '8px', borderRadius: '5px', borderColor: '#ccc', width: '100%'}}>
                        <option value={0}>Select</option>
                        {role.map((r:any, i) => {
                            return <option key={i} value={r.id} selected={row!=null ? r.id === editformData?.rolesId : false}>{r.roleName}</option>
                        })                
                        }   
                    </select>
                    }
                    {methods.formState.errors.rolesId?.message && <Typography fontSize="xs" color="danger">{`${methods.formState.errors.rolesId?.message}`}</Typography>}
                </Box>
            </Box>
          
            <Box component="div" display="flex" alignItems="center" flexDirection={{xs: 'column', sm: 'column', md: 'row'}} py={1} gap={2}>
              <Box component="div" width={{xs: '100%', sm: '100%', md: '50%'}}>
                <Typography level="h3" fontSize="sm" sx={{ mb: 0.5 }}>Name</Typography>
                  <Input size="sm" placeholder="name" {...methods.register("name")} value={row!=null ? editformData.name: checkformData.name}  onChangeCapture={handleChange}/>
                  {methods.formState.errors.name?.message && <Typography fontSize="xs" color="danger">{`${methods.formState.errors.name.message}`}</Typography>}
              </Box>
              <Box component="div" width={{xs: '100%', sm: '100%', md: '50%'}}>
              <Typography level="h3" fontSize="sm" sx={{ mb: 0.5 }}>User Name</Typography>
                  <Input size="sm" placeholder="userName" {...methods.register("userName")} value={row!=null ? editformData.userName: checkformData.userName} 
                              onChangeCapture={handleChange}/>
                              {methods.formState.errors.userName?.message && <Typography fontSize="xs" color="danger">{`${methods.formState.errors.userName.message}`}</Typography>}
              </Box>
            </Box>
            <Box component="div" display="flex" alignItems="center" flexDirection={{xs: 'column', sm: 'column', md: 'row'}} py={1} gap={2}>
              
            <Box component="div" width={{xs: '100%', sm: '100%', md: '50%'}}>
              <Typography level="h3" fontSize="sm" sx={{ mb: 0.5 }}>Password</Typography>
                  <Input size="sm" placeholder="password" {...methods.register("password")} value={row!=null ? editformData.password: checkformData.password} onChangeCapture={handleChange}/>
                  {methods.formState.errors.password?.message && <Typography fontSize="xs" color="danger">{`${methods.formState.errors.password.message}`}</Typography>}
              </Box>
              <Box component="div" width={{xs: '100%', sm: '100%', md: '50%'}}>
              <Typography level="h3" fontSize="sm" sx={{ mb: 0.5 }}>Status</Typography>
                   
              {
                    status && 
                    <select multiple={false} {...methods.register("statusId")} onChangeCapture={handleChange} style={{padding: '8px', borderRadius: '5px', borderColor: '#ccc', width: '100%'}}>
                        <option value={0}>Select</option>
                        {status.map((s:any, i) => {
                            return <option key={i} value={s.id} selected={row!=null ? s.id === editformData?.statusId : false}>{s.statusName}</option>
                        })                
                        }   
                    </select>
                    }
                    {methods.formState.errors.statusId?.message && <Typography fontSize="xs" color="danger">{`${methods.formState.errors.statusId.message}`}</Typography>}
              </Box>
            </Box>
                      
            <Button type="submit"> {props.label} User</Button>
          </form>
          </FormProvider>
        </Stack>
      </Sheet>
    </Modal>
    )
}

export default UserModalForm;