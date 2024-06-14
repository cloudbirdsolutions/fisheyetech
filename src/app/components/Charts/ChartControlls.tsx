'use client'
import React from 'react';
import Grid from "@mui/joy/Grid";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import FormControl from "@mui/joy/FormControl";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const ChartControlls = () => {

    const customFilters = [
        {
            filterName: "Quick Filter",
            filterType: "SELECT",
            filterOptions: ["This Week", "This Month", "Last 7 days"]
        },
        {
            filterName: "Start Date",
            filterType: "DATE_PICKER",
            filterValue: ""
        },
        {
            filterName: "End Date",
            filterType: "DATE_PICKER",
            filterValue: ""
        }
    ]

    return (
        <Grid container spacing={2} sx={{flexGrow: 1}} justifyContent={'flex-end'}>
            { customFilters.map((c, i) => (
                <Grid key={i+c.filterName}>
                    <FormControl>
                        <FormLabel>{c.filterName}</FormLabel>
                        {/*<DatePicker/>*/}
                    </FormControl>
                </Grid>
            ))}
        </Grid>
    );
};

export default ChartControlls;