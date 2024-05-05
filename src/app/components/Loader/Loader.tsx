import Box from "@mui/joy/Box";
import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
export default function Loader(props:any) {
    const [open, setOpen] = React.useState(false);
    React.useEffect(() => {
        setOpen(props.open)
    },[props.open])
    return (
        <Box>
            <Backdrop sx={{ color: '#fff', zIndex: '999999' }} open={open}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </Box>
    )
}