'use client';
import React, { useEffect, useState } from 'react';
import { Button, Grid, Typography } from '@mui/joy';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import FormControl from '@mui/joy/FormControl';
import Box from "@mui/joy/Box";

interface DateControlProps {
    setCreatedStartDate: Function;
    setCreatedEndDate: Function;
    setUpdatedStartDate: Function;
    setUpdatedEndDate: Function;
    handleReset: Function;
}

const DateControlSearch = (props: DateControlProps) => {
    const [createdStartDate, setCreatedStartDate] = useState('');
    const [createdEndDate, setCreatedEndDate] = useState('');
    const [updatedStartDate, setUpdatedStartDate] = useState('');
    const [updatedEndDate, setUpdatedEndDate] = useState('');
    
    const [createdStartSelected, setCreatedStartSelected] = useState(false);
    const [createdEndSelected, setCreatedEndSelected] = useState(false);
    const [updatedStartSelected, setUpdatedStartSelected] = useState(false);
    const [updatedEndSelected, setUpdatedEndSelected] = useState(false);

    useEffect(() => {
        if (createdStartSelected) {
            props.setCreatedStartDate(createdStartDate);
        }
    }, [createdStartDate]);

    useEffect(() => {
        if (createdEndSelected) {
            props.setCreatedEndDate(createdEndDate);
        }
    }, [createdEndDate]);

    useEffect(() => {
        if (updatedStartSelected) {
            props.setUpdatedStartDate(updatedStartDate);
        }
    }, [updatedStartDate]);

    useEffect(() => {
        if (updatedEndSelected) {
            props.setUpdatedEndDate(updatedEndDate);
        }
    }, [updatedEndDate]);

    const handleButtonClick = () => {
        setCreatedStartDate('');
        setCreatedEndDate('');
        setUpdatedStartDate('');
        setUpdatedEndDate('');
        
        setCreatedStartSelected(false);
        setCreatedEndSelected(false);
        setUpdatedStartSelected(false);
        setUpdatedEndSelected(false);
        
        props.handleReset();
    };

    const customFilters = [
        {
            filterName: "Search Created Start Date",
            filterType: "DATE_PICKER",
            filterValue: createdStartDate,
            filterHandleChange: (newValue: any) => {
                setCreatedStartDate(newValue);
                setCreatedStartSelected(true);
            }
        },
        {
            filterName: "Search Created End Date",
            filterType: "DATE_PICKER",
            filterValue: createdEndDate,
            filterHandleChange: (newValue: any) => {
                setCreatedEndDate(newValue);
                setCreatedEndSelected(true);
            }
        },
        {
            filterName: "Search Updated Start Date",
            filterType: "DATE_PICKER",
            filterValue: updatedStartDate,
            filterHandleChange: (newValue: any) => {
                setUpdatedStartDate(newValue);
                setUpdatedStartSelected(true);
            }
        },
        {
            filterName: "Search Updated End Date",
            filterType: "DATE_PICKER",
            filterValue: updatedEndDate,
            filterHandleChange: (newValue: any) => {
                setUpdatedEndDate(newValue);
                setUpdatedEndSelected(true);
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
                <Typography level='title-sm'>Clear Date</Typography>
                <Button color="primary" onClick={handleButtonClick}>
                    Reset
                </Button>
            </Grid>
        </Grid>
    );
}

export default DateControlSearch;
