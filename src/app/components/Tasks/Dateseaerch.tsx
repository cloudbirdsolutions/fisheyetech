'use client';
import React, { useEffect, useState } from 'react';
import { Button, Grid, Typography } from '@mui/joy';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import FormControl from '@mui/joy/FormControl';
import moment from 'moment';
import Box from "@mui/joy/Box";

interface DateControlProps {
    setSearchEndDate: Function;
    setSearchStartDate: Function;
    handleReset:Function;
}

const DateControlSearch = (props: DateControlProps) => {
    // const [startDate, setStartDate] = useState<string>(moment().format("YYYY-MM-DD"));
    // const [endDate, setEndDate] = useState<string>(moment().format("YYYY-MM-DD"));
    const[endDate,setEndDate]=useState('')
    const[startDate,setStartDate]=useState('')
    const [startSelected, setStartSelected] = useState(false);
    const [endSelected, setEndSelected] = useState(false);

    useEffect(() => {
        if (startSelected) {
            props.setSearchStartDate(startDate);
        }
    }, [startDate]);

    useEffect(() => {
        if (endSelected) {
            props.setSearchEndDate(endDate);
        }
    }, [endDate]);

    const handleButtonClick = () => {
        // Implement functionality for button click here
       setStartDate('')
       setEndDate('')
       setEndSelected(false)
       setStartSelected(false)
       props.handleReset();
    };

    const customFilters = [
        {
            filterName: "Search Created Date",
            filterType: "DATE_PICKER",
            filterValue: startDate,
            filterHandleChange: (newValue: any) => {
                setStartDate(newValue);
                setStartSelected(true);
            }
        },
        {
            filterName: "Search Updated Date",
            filterType: "DATE_PICKER",
            filterValue: endDate,
            filterHandleChange: (newValue: any) => {
                setEndDate(newValue);
                setEndSelected(true);
            }
        },
        
    ];

    return (
        <Grid container spacing={2} sx={{ flexGrow: 1 }} justifyContent={'flex-end'}>
        {customFilters.map((c, idx) => (
            <Grid key={idx + c.filterName}>
                <FormControl>
                    <FormLabel>{c.filterName}</FormLabel>
                    <Input type={"date"} size={"sm"} value={c.filterValue} onChange={(e) => c.filterHandleChange(e.target.value)} />
                </FormControl>
            </Grid>
        ))}
        <Grid>
            <Typography  level='title-sm'>Clear Date</Typography>
            <Button color="primary" onClick={handleButtonClick}>
                Reset
            </Button>
        </Grid>
    </Grid>
    );
}

export default DateControlSearch;
