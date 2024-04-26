import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./Provider/provider";
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';


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
              {children}
        </CssVarsProvider>
        </Providers>
      </body>
    </html>
  );
}
