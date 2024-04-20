'use client';
import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';

import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

import Sidebar from '../components/Sidebar';
import OrderTable from '../components/OrderTable';
import OrderList from '../components/OrderList';
import Header from '../components/Header';
import Stack from '@mui/joy/Stack';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Sheet from '@mui/joy/Sheet';
import Input from '@mui/joy/Input';
import { useState } from 'react';

import { useDispatch } from 'react-redux';
import { AppDispatch } from '../Store/store';
import { createuser } from '../Reducers/CreateUserSlice';
import { useRouter } from 'next/navigation';

export default function JoyOrderDashboardTemplate() {
  const [open, setOpen] = React.useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    address: "",
    phone: "",
    password: "",
    status: ""
  });


  const [nameError, setnameError] = useState('');
   const [phonenoError, setPhonenoError] = useState('');
  const [username, setusernameError] = useState('');
  const [addressError, setaddressError] = useState('');
  const [passwordError, setpasswordError] = useState('');
  const [statusError, setstatusError] = useState('');
  const [emailError, setemailError] = useState('');


  const handleChange = (e:any) => {
    const { name, value, type, checked } = e.target;
    
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value

    }));

    

    // Clear corresponding error message when input changes
    switch (name) {
      case 'name':
        setnameError('');
        break;
      case 'username':
        setusernameError('');
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
        case 'status':
        setstatusError('');
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    // Check if required fields are filled
    if (!formData.name || !formData.email || !formData.password || !formData.address || !formData.phone || !formData.status || !formData.username) {
      // Display error message for missing fields
      if (!formData.name) {
        setnameError('Name is required');
      }
      if (!formData.email) {
        setemailError('Email is required');
      }
      if (!formData.password) {
        setpasswordError('Password is required');
      }
      if (!formData.address) {
        setaddressError('Address is required');
      }
      if (!formData.phone) {
        setPhonenoError('Phone Number is required');
      }
      if (!formData.status) {
        setstatusError('Status is required');
      }
      if (!formData.username) {
        setusernameError('User Name is required');
      }
      return;
    }

    try {
      // const userData = Object.fromEntries();
       
      dispatch(createuser(formData)).then(() => {
        console.log("Success")
        router.push('/users');
      })
       
     } catch (error) {
       console.error('Failed to create user:', error);
       // Handle error (e.g., display error message)
     }
   

  }
  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
        <Header />
        <Sidebar />

        <Box
          component="main"
          className="MainContent"
          sx={{
            px: { xs: 2, md: 6 },
            pt: {
              xs: 'calc(12px + var(--Header-height))',
              sm: 'calc(12px + var(--Header-height))',
              md: 3,
            },
            pb: { xs: 2, sm: 2, md: 3 },
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minWidth: 0,
            height: '100dvh',
            gap: 1,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Breadcrumbs
              size="sm"
              aria-label="breadcrumbs"
              separator={<ChevronRightRoundedIcon />}
              sx={{ pl: 0 }}
            >
              <Link
                underline="none"
                color="neutral"
                href="#some-link"
                aria-label="Home"
              >
                <HomeRoundedIcon />
              </Link>
              <Link
                underline="hover"
                color="neutral"
                href="#some-link"
                fontSize={12}
                fontWeight={500}
              >
                Dashboard
              </Link>
              <Typography color="primary" fontWeight={500} fontSize={12}>
                Users
              </Typography>
            </Breadcrumbs>
          </Box>
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
              Users
            </Typography>
            <Stack spacing={2} direction="row">
              <Button
                color="primary"
                startDecorator={<PersonAddIcon />}
                size="sm"
                onClick={() => setOpen(true)}
              >
                Add New User
              </Button>
              <Button
                color="primary"
                startDecorator={<DownloadRoundedIcon />}
                size="sm"
              >
                Download Excel
              </Button>
            </Stack>

          </Box>
          <OrderTable />
          <OrderList />
        </Box>
      </Box>
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
            <div className='flex justify-between items-center flex-col md:flex-row gap-4 w-full'>
                <div className='space-y-[2px] w-full'>
                    <h3 className='text-textdull text-xs mb-2'>Name</h3>
                    <Input size="sm" placeholder="name" name="name" value={formData.name} onChange={handleChange}/>
                </div>
                <div className='space-y-[2px] w-full'>
                    <h3 className='text-textdull text-xs mb-2'>Name</h3>
                    <Input size="sm" placeholder="email" name="email" value={formData.email}
                                onChange={handleChange}/>
                </div>
              </div>
              <div className='flex justify-between items-center flex-col md:flex-row gap-4 w-full'>
                <div className='space-y-[2px] w-full'>
                    <h3 className='text-textdull text-xs mb-2'>Name</h3>
                    <Input size="sm" placeholder="username" name="username" value={formData.username}
                                onChange={handleChange}/>
                </div>
                <div className='space-y-[2px] w-full'>
                    <h3 className='text-textdull text-xs mb-2'>Name</h3>
                    <Input size="sm" placeholder="password" name="password" value={formData.password}
                                onChange={handleChange}/>
                </div>
              </div>
              <div className='flex justify-between items-center flex-col md:flex-row gap-4 w-full'>
                <div className='space-y-[2px] w-full'>
                    <h3 className='text-textdull text-xs mb-2'>Name</h3>
                    <Input size="sm" placeholder="address" name="address" value={formData.address}
                                onChange={handleChange}/>
                </div>
                <div className='space-y-[2px] w-full'>
                    <h3 className='text-textdull text-xs mb-2'>Name</h3>
                    <Input size="sm" placeholder="phonenumber" name="phone" value={formData.phone}
                                onChange={handleChange}/>
                </div>
              </div>
              <div className='flex justify-between items-center flex-col md:flex-row gap-4 w-full'>
                <div className='space-y-[2px] w-full'>
                      <h3 className='text-textdull text-xs mb-2'>Name</h3>
                        <Input size="sm" placeholder="status" name="status" value={formData.status}
                                onChange={handleChange}/>
                </div>
                
              </div>
            
            <Button type="submit">Add User</Button>
            </form>
          </Stack>
        </Sheet>
      </Modal>
    </CssVarsProvider>
  );
}
