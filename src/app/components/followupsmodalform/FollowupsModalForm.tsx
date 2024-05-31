'use client';
import * as React from 'react';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';

import Stack from '@mui/joy/Stack';

import { useContext, useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../Store/store';
import {editfollowupstatus} from '../../Reducers/editFolloupsstatusSlice';
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
  status: z.string().min(1, {message: 'Please Enter the Status'}),
});
const FollowupsModalForm = (props:any) =>{

  const methods = useForm({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
  });
  const logintype = useSelector((state: RootState) => state?.user.data);

    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    const row:any = props.row;

    const [editformData, seteditFormData] = useState({
        id: "",
        status: ""
    });
    
      
      useEffect(() => {
            seteditFormData({
                id: row?.id,
                status: row?.status
              });
      },[row])
      
    
      const handleChange = (e:any) => {
        const { name, value, type, checked } = e.target;
          seteditFormData(prevState => ({
            ...prevState,
            [name]: e.target.name === 'id' ? parseInt(value) : value     
          }));
        
      }
    
      const handleSubmit = async (e:any) => {    
    
          e = {...e, "id" : editformData.id, "updatedBy": logintype.data.id};
              try {
                // const userData = Object.fromEntries();
                
               dispatch(editfollowupstatus(e)).then((res) => {
                
                  res.payload.statusCode === 200 ? (
                    toast.success(res.payload.message),
                    props.setOpen(false),
                    methods.reset(),
                    router.push('/followups')
                  ) : 
                    (
                      toast.error(res.payload.message)
                    )
                })
                
              } catch (error:any) {
                toast.error(error)
                // Handle error (e.g., display error message)
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
          Edit Status
        </Typography>
        <Stack >
        <FormProvider {...methods}>
        <form style={{display:'flex' , flexDirection: 'column', gap: '8'}} onSubmit={methods.handleSubmit(handleSubmit)}>
               <>
               <Box component="div" display="flex" alignItems="center" flexDirection={'row'} py={2}>
                <Box component="div" sx={{width:'100%'}}>
                  <Typography level="h3" fontSize="sm" sx={{ mb: 0.5 }}>ID</Typography>
                    <Input size="sm" disabled {...methods.register("id")} value={editformData.id}  />
                </Box>
                </Box>


              <Box component="div" display="flex" alignItems="center" flexDirection={'row'} py={2}>
                <Box component="div" sx={{width:'100%'}}>
                <Typography level="h3" fontSize="sm" sx={{ mb: 0.5 }}>Status</Typography>
                  <select {...methods.register("status")} onChange={handleChange} style={{padding: '8px', borderRadius: '5px', borderColor: '#ccc', width: '100%'}}>
                    <option>SELECT</option>
                    <option value={'Active'}>Active</option>
                    <option value={'Closed'}>Closed</option>
                  </select>
                  {methods.formState.errors.status?.message && <Typography fontSize="xs" color="danger">{`${methods.formState.errors.status?.message}`}</Typography>}
                </Box>
              </Box>
              </>
                
          <Button type="submit"> Edit</Button>
          </form>
          </FormProvider>
        </Stack>
      </Sheet>
    </Modal>
    )
}

export default FollowupsModalForm;