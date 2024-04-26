'use client';
import * as React from 'react';
import Link from '@mui/joy/Link';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import Box from '@mui/joy/Box';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

type TBreadCrumbProps = {
    containerClasses?: string,
    listClasses?: string,
    activeClasses?: string,
    capitalizeLinks?: boolean
}

const Breadcrumb = ({containerClasses, listClasses, activeClasses, capitalizeLinks}: TBreadCrumbProps) => {
    const paths = usePathname()
    const pathNames = paths.split('/').filter( path => path );
    return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
    <Breadcrumbs
      size="sm"
      aria-label="breadcrumbs"
      separator={<ChevronRightRoundedIcon />}
      sx={{ pl: 0 }}
    >
      <Link
        underline="none"
        color="neutral"
        href="/"
        aria-label="Home"
      >
        <HomeRoundedIcon />
      </Link>
      </Breadcrumbs>
      <Breadcrumbs
      size="sm"
      aria-label="breadcrumbs"
      separator={<ChevronRightRoundedIcon />}
      sx={{ pl: 0 }}
    >
                {
                  pathNames.map( (link, index) => {
                        let href = `/${pathNames.slice(0, index + 1).join('/')}`
                        let itemClasses = paths === href ? `${listClasses} ${activeClasses}` : listClasses
                        let itemLink = capitalizeLinks ? link[0].toUpperCase() + link.slice(1, link.length) : link
                        return (
                            <React.Fragment key={index}>
                                {/*<li className={itemClasses} >*/}
                                    <Link underline="hover"
                        color="neutral"
                        fontSize={12}
                        fontWeight={500} href={href}>{itemLink.toUpperCase()}</Link>
                               {/* </li>*/}
                                {/* {pathNames.length !== index + 1} */}
                            </React.Fragment>
                        )
                    })
                  }  
      </Breadcrumbs>
  </Box>
)
}

export default Breadcrumb;