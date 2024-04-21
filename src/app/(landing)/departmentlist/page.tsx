'use client';
import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';

import PersonAddIcon from '@mui/icons-material/PersonAdd';

import DepartmentTable from '../../components/DepartmentTable';
import DepartmentLists from '../../components/DepartmentLists';
import Stack from '@mui/joy/Stack';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Sheet from '@mui/joy/Sheet';
import Input from '@mui/joy/Input';
import { useState } from 'react';

export default function DepartmentList() {
  const [open, setOpen] = React.useState<boolean>(false);
  
  const [formData, setFormData] = useState({
    id: "",
    departmentname: "",
   
  });


  const [idError, setidError] = useState('');
  const [departmentnameError, setdepartmentnameError] = useState('');


  const handleChange = (e:any) => {
    const { name, value, type, checked } = e.target;
    
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value

    }));

    

    // Clear corresponding error message when input changes
    switch (name) {
      case 'id':
        setidError('');
        break;
      case 'departmentname':
        setdepartmentnameError('');
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    // Check if required fields are filled
    if (!formData.id || !formData.departmentname) {
      // Display error message for missing fields
      if (!formData.departmentname) {
        setdepartmentnameError('First Name is required');
      }
      if (!formData.id) {
        setidError('First Name is required');
      }
      return;
    }
  }
  return (
    <>
          <Box
            sx={{
              display: 'flex',
              mb: 1,
              gap: 1,
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: { xs: 'start', sm: 'center' },
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            }}
          >
            <Typography level="h2" component="h1">
              Departments
            </Typography>
            <Stack spacing={2} direction="row">
              <Button
                color="success"
                startDecorator={<PersonAddIcon />}
                size="sm"
                onClick={() => setOpen(true)}
              >
                Add New Department
              </Button>
            </Stack>

          </Box>
          <DepartmentTable />
          <DepartmentLists />
    
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => setOpen(false)}
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
            Add New User
          </Typography>
          <Stack className='p-8'>
          <form className='gap-8 flex flex-wrap w-[100%] flex-row' onSubmit={handleSubmit}>
            <Input size="sm" placeholder="id" name="id" value={formData.id}
                                onChange={handleChange}/>
            {idError && <p className="text-red text-xs mt-1 absolute">{idError}</p>}

            <Input size="sm" placeholder="name" name="departmentname" value={formData.departmentname}
                                onChange={handleChange}/>
            <Button type="submit">Add User</Button>
            </form>
          </Stack>
        </Sheet>
      </Modal>
      </>
  );
}
