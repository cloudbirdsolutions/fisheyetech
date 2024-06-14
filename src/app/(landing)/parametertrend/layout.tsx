import React from 'react';
import ProviderRegistry from "@/app/(landing)/parametertrend/ProviderRegistry";

const Layout = ({
                    children,
                }: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
       <ProviderRegistry>
           {children}
       </ProviderRegistry>
    );
};

export default Layout;