"use client";
import * as React from 'react';
import GlobalStyles from '@mui/joy/GlobalStyles';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import Chip from '@mui/joy/Chip';
import Divider from '@mui/joy/Divider';
import IconButton from '@mui/joy/IconButton';
import Input from '@mui/joy/Input';
import LinearProgress from '@mui/joy/LinearProgress';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton, { listItemButtonClasses } from '@mui/joy/ListItemButton';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import SupportRoundedIcon from '@mui/icons-material/SupportRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import BrightnessAutoRoundedIcon from '@mui/icons-material/BrightnessAutoRounded';
import DeleteOutlineRounded from '@mui/icons-material/DeleteOutlineRounded';
import PeopleIcon from '@mui/icons-material/People';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ColorSchemeToggle from './ColorSchemeToggle';
import { closeSidebar } from '../utils';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../Store/store';
import { useRouter, usePathname, useSelectedLayoutSegment } from "next/navigation";
import Link from 'next/link';

import PendingActionsIcon from '@mui/icons-material/PendingActions';
import ApartmentIcon from '@mui/icons-material/Apartment';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import CloseIcon from '@mui/icons-material/Close';
import BadgeIcon from '@mui/icons-material/Badge';

import { CssVarsProvider, ListItemDecorator, ModalClose, extendTheme } from "@mui/joy";
import Menu from '@mui/icons-material/Menu';

const baseTheme = extendTheme();

const darkOnlyTheme = extendTheme({
  cssVarPrefix: "sidebar_",
  colorSchemes: {
    light: baseTheme.colorSchemes.dark,
    dark: baseTheme.colorSchemes.dark,
  },
  components: {
    // The component identifier always start with `Joy${ComponentName}`.
    JoyListItem: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          '&:hover': theme.variants.solidHover.primary,
        }),
      }
    },
    JoyListItemButton: {
      defaultProps: {
        color: 'primary'
      },
      styleOverrides: {

        root: ({ ownerState, theme }) => ({
          '&:hover': theme.variants.plainHover.primary,
          ...(ownerState.selected && {
            backgroundColor: theme.palette.primary[100]
          }
          )
        }),
      }
    }
  },
});

const sidebarItems = [
  // {
  //   label: 'Home',
  //   navPath: '/home',
  //   icon: <HomeRoundedIcon />,
  //   roles: ['admin', 'user','superadmin']
  // },
  {
    label: 'Dashboard',
    navPath: '/dashboard',
    icon: <DashboardRoundedIcon />,
    roles: ['admin', 'user','superadmin']
  },
  {
    label: 'Users',
    navPath: '/users',
    icon: <PeopleIcon />,
    roles: ['superadmin']
  },
  {
    label: 'Department List',
    navPath: '/departmentlist',
    icon: <ApartmentIcon />,
    roles: ['superadmin']
  },
  {
    label: 'Entities',
    navPath: '/entities',
    icon: <SupportRoundedIcon />,
    roles: ['superadmin']
  },
  {
    label: 'Role List',
    navPath: '/rolelist',
    icon: <AdminPanelSettingsIcon />,
    roles: ['superadmin']
  },
  {
    label: 'Job Allocation',
    navPath: '/new-job-allocation',
    icon: <AssignmentRoundedIcon />,
    roles: ['superadmin']
  },
  {
    label: 'Tasks',
    navPath: '/tasks',
    icon: <PendingActionsIcon />,
    roles: ['admin', 'user','superadmin']
  },
  {
    label:'Follow Ups',
    navPath: '/followups',
    icon: <PendingActionsIcon />,
    roles: ['admin', 'user','superadmin']
  },
  {
    label: 'Delete Document',
    navPath: '/deletedocument',
    icon: <DeleteOutlineRounded />,
    roles: ['superadmin']
  },
  {
    label: 'Sheet Field',
    navPath: '/sheetfield',
    icon: <AssignmentRoundedIcon />,
    roles: ['superadmin']
  },
  {
    label: 'Force Close',
    navPath: "/forceclose",
    icon: <CloseIcon/>,
    roles: ['admin','superadmin']
  },
  
  {
    label: 'Paremeter Trend',
    navPath: "/parametertrend",
    icon: <TrendingUpIcon/>,
    roles: ['admin', 'user','superadmin']
  },
  // {
  //   label: 'Comments',
  //   navPath: '/messages',
  //   icon: <QuestionAnswerRoundedIcon />,
  //   roles: ['admin', 'user']
  // }

]


export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const isActive = (href: any) => {
    return pathname.includes(href) ;
  };

  const logintype = useSelector((state: RootState) => state?.user?.data);

  const dispatch = useDispatch<AppDispatch>();
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    dispatch({ type: "USER_LOGOUT" });
    //setuser('')
    router.push("/", { scroll: false });
  };

  return (
    <CssVarsProvider theme={darkOnlyTheme}>
      <Sheet
        className="Sidebar"
        sx={{
          position: { xs: 'fixed', md: 'sticky' },
          transform: {
            xs: 'translateX(var(--translateX))',
            md: 'translateX(var(--translateX) - 58)',
          },
          transition: 'transform 0.4s, width 0.4s',
          zIndex: 10000,
          height: '100vh',
          width: 'var(--Sidebar-width)',
          top: 0,
          p: 2,
          gap: 2,
          flexShrink: 0,
          whiteSpace: 'nowrap',
          boxSizing: 'border-box',
          borderRight: '1px solid',
          borderColor: 'divider',
          background:'var(--joy-palette-primary-900)',
          // color:'var(--joy-palette-common-white)'
          overflowX: 'hidden',
         display : 'flex',
         flexDirection:'column'

        }}
      >
        <GlobalStyles
          styles={(theme) => ({
            '--Sidebar-width': '240px',
            '--SideNavigation-slideIn': '0',
              [theme.breakpoints.up('md')]: {
                '--Sidebar-width': '58px',
              },
          })}
        />
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <IconButton variant="soft" color="primary" size="sm">
            <BrightnessAutoRoundedIcon />
          </IconButton>
          <Typography level="title-lg" sx={{ color: 'var(--joy-palette-common-white)' }}>Fisheyetech.</Typography>
          {/* <ColorSchemeToggle sx={{ ml: 'auto' }} /> */}
          <ModalClose id="close-icon" sx={{ position: 'initial', marginLeft: 'auto' }} onClick={() => closeSidebar()} />
        </Box>
        <Divider/>
        {/* <Input size="sm" startDecorator={<SearchRoundedIcon />} placeholder="Search" /> */}
        <Box
          sx={{
            minHeight: 0,
            overflow: 'hidden auto',
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            [`& .${listItemButtonClasses.root}`]: {
              gap: 1,
            },

          }}
        >
      
            <List
              size="sm"
              sx={{
                gap: 1,
                '--List-nestedInsetStart': '30px',
                '--ListItem-radius': (theme) => theme.vars.radius.sm,

              }}
            >
              {
                sidebarItems.map((eachItem, i) => (
                  (eachItem.roles.includes(logintype.data.roles.roleName)&& <ListItem key={i}>
                    <ListItemButton onClick={() => (router.push(eachItem.navPath))} selected={isActive(eachItem.navPath)} >
                      <ListItemDecorator>
                        {eachItem.icon}
                      </ListItemDecorator>
                      <Typography level="title-sm" sx={{fontWeight:600}}>{eachItem.label}</Typography>
                      {/* {eachItem.label} */}
                    </ListItemButton>
                  </ListItem>)
                ))
              }

            </List>
          

        </Box>
        <Divider sx={{marginTop:'auto' }} />
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', }}>
          <Avatar
            variant="outlined"
            size="sm"
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
          />
          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Typography level="title-sm">{logintype && logintype?.data?.name}</Typography>
            <Typography level="body-xs">{logintype?.data?.phone}</Typography>
          </Box>
          <IconButton size="sm" variant="plain" color="neutral">
            <LogoutRoundedIcon onClick={handleLogout} />
          </IconButton>
        </Box>
      </Sheet>
    </CssVarsProvider>
  );
}
