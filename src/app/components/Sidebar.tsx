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
import ListItemContent from '@mui/joy/ListItemContent';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import QuestionAnswerRoundedIcon from '@mui/icons-material/QuestionAnswerRounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import SupportRoundedIcon from '@mui/icons-material/SupportRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import BrightnessAutoRoundedIcon from '@mui/icons-material/BrightnessAutoRounded';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PeopleIcon from '@mui/icons-material/People';

import ColorSchemeToggle from './ColorSchemeToggle';
import { closeSidebar } from '../utils';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../Store/store';
import { useRouter, usePathname, useSelectedLayoutSegment } from "next/navigation";
import Link from 'next/link';

import PendingActionsIcon from '@mui/icons-material/PendingActions';
import ApartmentIcon from '@mui/icons-material/Apartment';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import BadgeIcon from '@mui/icons-material/Badge';

import { CssVarsProvider, ListItemDecorator, extendTheme } from "@mui/joy";


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

function Toggler({
  defaultExpanded = false,
  renderToggle,
  children,
}: {
  defaultExpanded?: boolean;
  children: React.ReactNode;
  renderToggle: (params: {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }) => React.ReactNode;
}) {
  const [open, setOpen] = React.useState(defaultExpanded);
  return (
    <React.Fragment>
      {renderToggle({ open, setOpen })}
      <Box
        sx={{
          display: 'grid',
          gridTemplateRows: open ? '1fr' : '0fr',
          transition: '0.2s ease',
          '& > *': {
            overflow: 'hidden',
          },
        }}
      >
        {children}
      </Box>
    </React.Fragment>
  );
}

const sidebarItems = [
  {
    label: 'Home',
    navPath: '/home',
    icon: <HomeRoundedIcon />,
    roles: ['admin', 'user']
  },
  {
    label: 'Dashboard',
    navPath: '/dashboard',
    icon: <DashboardRoundedIcon />,
    roles: ['admin', 'user']
  },
  {
    label: 'Users',
    navPath: '/users',
    icon: <PeopleIcon />,
    roles: ['admin']
  },
  {
    label: 'Department List',
    navPath: '/departmentlist',
    icon: <ApartmentIcon />,
    roles: ['admin']
  },
  {
    label: 'Entities',
    navPath: '/entities',
    icon: <SupportRoundedIcon />,
    roles: ['admin']
  },
  {
    label: 'Role List',
    navPath: '/rolelist',
    icon: <AdminPanelSettingsIcon />,
    roles: ['admin']
  },
  {
    label: 'Job Allocation',
    navPath: '/joballocation',
    icon: <AssignmentRoundedIcon />,
    roles: ['admin']
  },
  {
    label: 'Tasks',
    navPath: '/tasks',
    icon: <PendingActionsIcon />,
    roles: ['admin', 'user']
  },
  // {
  //   label: 'Reviews',
  //   navPath: '/reviews',
  //   icon: <AssignmentRoundedIcon />,
  //   roles: ['admin', 'user']
  // },
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
          position: { xs: 'fixed', md: 'fixed' },
          transform: {
            xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))',
            md: 'none',
          },
          transition: 'transform 0.4s, width 0.4s',
          zIndex: 10000,
          height: '100dvh',
          width: 'var(--Sidebar-width)',
          top: 0,
          p: 2,
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          borderRight: '1px solid',
          borderColor: 'divider',
          background:'var(--joy-palette-primary-900)',
          // color:'var(--joy-palette-common-white)'
        }}
      >
        <GlobalStyles
          styles={(theme) => ({
            ':root': {
              '--Sidebar-width': '220px',
              [theme.breakpoints.up('lg')]: {
                '--Sidebar-width': '240px',
              },
            },
          })}
        />
        <Box
          className="Sidebar-overlay"
          sx={{
            position: 'fixed',
            zIndex: 9998,
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            opacity: 'var(--SideNavigation-slideIn)',
            backgroundColor: 'var(--joy-palette-background-backdrop)',
            transition: 'opacity 0.4s',
            transform: {
              xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))',
              lg: 'translateX(-100%)',
            },
          }}
          onClick={() => closeSidebar()}
        />
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <IconButton variant="soft" color="primary" size="sm">
            <BrightnessAutoRoundedIcon />
          </IconButton>
          <Typography level="title-lg" sx={{ color: 'var(--joy-palette-common-white)' }}>Fisheyetech.</Typography>
          {/* <ColorSchemeToggle sx={{ ml: 'auto' }} /> */}
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
          

          {/* <List
            size="sm"
            sx={{
              mt: 'auto',
              flexGrow: 0,
              '--ListItem-radius': (theme) => theme.vars.radius.sm,
              '--List-gap': '8px',
              mb: 2,
            }}
          >
            <ListItem>
              <ListItemButton>
                <SettingsRoundedIcon />
                Settings
              </ListItemButton>
            </ListItem>
          </List> */}

        </Box>
        <Divider />
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
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
