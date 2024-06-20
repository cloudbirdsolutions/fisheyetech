'use client'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'

import React from 'react';

const ProviderRegistry = ({
                              children,
                          }: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            {children}
        </LocalizationProvider>
    );
};

export default ProviderRegistry;