"use client";

import * as React from 'react';
import GlobalStyles from '@mui/joy/GlobalStyles';
import Sheet from '@mui/joy/Sheet';
import IconButton from '@mui/joy/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import { toggleSidebar,openSidebar } from '../utils';

export default function Header() {

  React.useEffect(()=>{
    openSidebar()
  },[])

  return (
    <Sheet
      sx={{
        display: { xs: 'flex'},
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        top: 0,
        width: '100%',
        height: 'var(--Header-height)',
        zIndex: 9995,
        p: 2,
        gap: 1,
        borderBottom: '1px solid',
        borderColor: 'background.level1',
        boxShadow: 'sm',
      }}
    >
      <GlobalStyles
        styles={(theme) => ({
          ':root': {
            '--Header-height': '52px',
            [theme.breakpoints.up('md')]: {
              '--Header-height': '52px',
            },
          },
        })}
      />
      <IconButton
        onClick={() => toggleSidebar()}
        variant="outlined"
        color="neutral"
        size="sm"
      >
        <MenuIcon />
      </IconButton>
    </Sheet>
  );
}
