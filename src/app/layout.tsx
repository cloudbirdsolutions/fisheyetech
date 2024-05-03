import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./Provider/provider";

import { Experimental_CssVarsProvider as MaterialCssVarsProvider } from '@mui/material/styles';
import { CssVarsProvider as JoyCssVarsProvider  } from '@mui/joy/styles';
import CssBaseline from '@mui/material/CssBaseline'; // Import CssBaseline from Material UI

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
      <MaterialCssVarsProvider
  defaultMode="system"
>
  <JoyCssVarsProvider defaultMode="system">
   
    {children}
  </JoyCssVarsProvider>
</MaterialCssVarsProvider>
        </Providers>
      </body>
    </html>
  );
}