import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./Provider/provider";
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';

import { Box } from "@mui/joy";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fisheyetech",
  description: "powered by oplaminds",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <CssVarsProvider disableTransitionOnChange>
            <CssBaseline />
            <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
              <Header />
              <Sidebar />
              {children}
            </Box>
          </CssVarsProvider>
        </Providers>
      </body>
    </html>
  );
}
