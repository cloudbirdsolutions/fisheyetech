import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import { useTheme } from "@mui/material";


import { Box } from "@mui/joy";
import Breadcrumb from "../components/Breadcrumbs/Breadcrumbs";
import { Providers } from "../Provider/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fisheyetech",
  description: "powered by oplaminds",
};

export default function SubLayout({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   
    <Providers>
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
            <Box sx={{ display: 'flex', minHeight: '100dvh' }}>              
              <Sidebar />
              <Box component="main" sx={{  minHeight: '100dvh', flexGrow: 1, width: '100%'}}>
                <Header />
                <Box
                  
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
                    gap: 1,
                  }}
                >
                      <Breadcrumb />
                 
                      {children}
                  </Box>
              </Box>
            </Box>
          </CssVarsProvider>
        </Providers>
          
  );
}
