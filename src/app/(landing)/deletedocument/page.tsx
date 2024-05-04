'use client';
import { deletedocument } from "@/app/Reducers/DeleteDocumetSlice";
import { AppDispatch } from "@/app/Store/store";
import { Box, Button, Input, Typography } from "@mui/joy";
import Sheet from "@mui/joy/Sheet";
import {useRouter} from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export default function RoleList() {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    const [formData, setFormData] = useState({
        docId: 0
      });

      const [docIdError, setdocIdError] = useState('');


    const handleChange = (e:any) => {
        const { name, value, type, checked } = e.target;
           
        
        setFormData(prevState => ({
          ...prevState,
          [name]: e.target.name === 'docId'  ? parseInt(value) : value         
        }));
      
        
    
        // Clear corresponding error message when input changes
        switch (name) {
          case 'docId':
            setdocIdError('');
            break;
          default:
            break;
        }
      };

    const handleSubmit = (event: any) => {
        event.preventDefault();
         // Check if required fields are filled
         if (!formData.docId) {
            // Display error message for missing fields
            setdocIdError('Department Name is required');
            
            return;
          }

         
            dispatch(deletedocument(formData)).then((res) => {
                res.payload.statusCode == 200 ? (
                    toast.success(res.payload.message),
                    router.push('/deletedocument') 
                ): (
                    toast.error(res.payload.message)
                )
            })
             
    }

          

    return (
        <>
        <Sheet variant='outlined' sx={{ px: 2, py: 2, borderRadius: 'sm' }}>
            <Box>
                <ToastContainer />
                <form method="post" style={{display:'flex' , flexDirection: 'column', gap: '8'}} onSubmit={handleSubmit}>
                <Box component="div" display="flex" alignItems="center" flexDirection={'row'} py={2}>
                    <Box component="div" sx={{width:'100%'}}>
                    <Typography level="h3" fontSize="sm" sx={{ mb: 0.5 }}>Document ID</Typography>
                        <Input size="sm" name="docId" value={formData.docId} onChange={handleChange}/>
                    </Box>
                </Box>
                <Button type="submit" sx={{width:'20%'}}>Delete</Button>
                </form>
                </Box>
        </Sheet>
        </>
    )
}

