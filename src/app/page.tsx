'use client';
import * as React from 'react';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import GlobalStyles from '@mui/joy/GlobalStyles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import IconButton, { IconButtonProps } from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import BadgeRoundedIcon from '@mui/icons-material/BadgeRounded';
import { fetchUserData } from './Reducers/UserSlice';
import {useDispatch, useSelector} from 'react-redux';
import { AppDispatch } from './Store/store';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Loader from './components/Loader/Loader';
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import * as z from "zod";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const schema = z.object({
  userName: z.string().trim().nonempty({ message: "User name is required" }),
  password: z.string().min(1, {message: 'Password is required'})
});


function ColorSchemeToggle(props: IconButtonProps) {
  const { onClick, ...other } = props;
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  return (
    <IconButton
      aria-label="toggle light/dark mode"
      size="sm"
      variant="outlined"
      disabled={!mounted}
      onClick={(event) => {
        setMode(mode === 'light' ? 'dark' : 'light');
        onClick?.(event);
      }}
      {...other}
    >
      {mode === 'light' ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
    </IconButton>
  );
}

export default function Home() {

  const methods = useForm({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
});

  const dispatch = useDispatch<AppDispatch>();
  const [error, setError] = React.useState(''); 

  const data = useSelector((state:any) => state?.user?.data);
  const loadingState = useSelector((state:any) => state?.user?.status);
  const router = useRouter();
  
  /*useEffect(() => {
    if(data?.statusCode === "200") {
        data?.data?.roles?.roleName === 'admin' ?        
          router.push('/users', { scroll: false })
          :
          router.push('/tasks', { scroll: false })
    } 
    // eslint-disable-next-line
  }, [data]);*/

  const handleSubmit = (formData:any) => {
        //e.preventDefault();
        formData = {...formData};
        //const userData:any = Object.fromEntries(formData);
        //console.log('form values', userData)
        dispatch(fetchUserData(formData)).then((res) => {
          methods.reset();
          

          res.payload?.statusCode === 200 ? (
            toast.success("Login Successfully") &&
            res.payload.data?.roles?.roleName === 'admin' ? (    
              router.push('/users', { scroll: false }) 
              
            ) : 
            (
            router.push('/tasks', { scroll: false })
            )
          ) : res.payload?.statusCode === 404 ? 
                toast.error(res.payload.message) : ''
        });
  }
    

  return (
    <>
    <Loader open={loadingState === 'loading'? true : false}/>

    <CssVarsProvider defaultMode="dark" disableTransitionOnChange>
      <CssBaseline />

      <GlobalStyles
        styles={{
          ':root': {
            '--Form-maxWidth': '800px',
            '--Transition-duration': '0.4s', // set to `none` to disable transition
          },
        }}
      />
      <Box
        sx={(theme) => ({
          width: { xs: '100%', md: '50vw' },
          transition: 'width var(--Transition-duration)',
          transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          justifyContent: 'flex-end',
          backdropFilter: 'blur(12px)',
          backgroundColor: 'rgba(255 255 255 / 0.2)',
          [theme.getColorSchemeSelector('dark')]: {
            backgroundColor: 'rgba(19 19 24 / 0.4)',
          },
        })}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100dvh',
            width: '100%',
            px: 2,
          }}
        >
          <Box
            component="header"
            sx={{
              py: 3,
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ gap: 2, display: 'flex', alignItems: 'center' }}>
              <IconButton variant="soft" color="primary" size="sm">
                <BadgeRoundedIcon />
              </IconButton>
              <Typography level="title-lg">Fisheyetech</Typography>
            </Box>
            <ColorSchemeToggle />
          </Box>
          <Box
            component="main"
            sx={{
              my: 'auto',
              py: 2,
              pb: 5,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              width: 400,
              maxWidth: '100%',
              mx: 'auto',
              borderRadius: 'sm',
              '& form': {
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              },
              [`& .MuiFormLabel-asterisk`]: {
                visibility: 'hidden',
              },
            }}
          >
            <Stack gap={4} sx={{ mb: 2 }}>
              <Stack gap={1}>
                <Typography component="h1" level="h3">
                  Sign in
                </Typography>
                {/* <Typography level="body-sm">
                  New to company?{' '}
                  <Link href="#replace-with-a-link" level="title-sm">
                    Sign up!
                  </Link>
                </Typography> */}
              </Stack>
              {/* <Button
                variant="soft"
                color="neutral"
                fullWidth
                startDecorator={<GoogleIcon />}
              >
                Continue with Google
              </Button> */}
            </Stack>
            {/* <Divider
              sx={(theme) => ({
                [theme.getColorSchemeSelector('light')]: {
                  color: { xs: '#FFF', md: 'text.tertiary' },
                },
              })}
            >
              or
            </Divider> */}
            <Stack gap={4} sx={{ mt: 2 }}>
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(handleSubmit )}>
                <FormControl>
                  <FormLabel>User Name</FormLabel>
                  <Input type="text" {...methods.register("userName")}/>
                  {methods.formState.errors.userName?.message && <Typography fontSize="xs" color="danger">{`${methods.formState.errors.userName.message}`}</Typography>}
                </FormControl>
                <FormControl>
                  <FormLabel>Password</FormLabel>
                  <Input type="password" {...methods.register("password")}/>
                  {methods.formState.errors.password?.message && <Typography fontSize="xs" color="danger">{`${methods.formState.errors.password.message}`}</Typography>}
                </FormControl>
                <Stack gap={4} sx={{ mt: 2 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Link level="title-sm" href="#replace-with-a-link">
                      Forgot your password?
                    </Link>
                  </Box>
                  <Button type="submit" fullWidth>
                    Sign in
                  </Button>
                </Stack>
              </form>
              </FormProvider>
            </Stack>
          </Box>
          <Box component="footer" sx={{ py: 3 }}>
            <Typography level="body-xs" textAlign="center">
              © FisheyeTech {new Date().getFullYear()}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={(theme) => ({
          height: '100%',
          position: 'fixed',
          right: 0,
          top: 0,
          bottom: 0,
          left: { xs: 0, md: '50vw' },
          transition:
            'background-image var(--Transition-duration), left var(--Transition-duration) !important',
          transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
          backgroundColor: 'background.level1',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundImage:
            'url(https://images.unsplash.com/photo-1527181152855-fc03fc7949c8?auto=format&w=1000&dpr=2)',
          [theme.getColorSchemeSelector('dark')]: {
            backgroundImage:
              'url(https://images.unsplash.com/photo-1572072393749-3ca9c8ea0831?auto=format&w=1000&dpr=2)',
          },
        })}
      />
      <ToastContainer/>
    </CssVarsProvider>
    </>
  );
}
