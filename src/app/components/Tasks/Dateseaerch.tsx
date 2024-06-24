'use client'
import React,{useEffect, useState} from 'react';
import { Grid } from '@mui/joy';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import FormControl from '@mui/joy/FormControl';
import Select from '@mui/joy';
import Option from '@mui/joy';
import moment from 'moment';

interface DateControlProps {
    setSearchEndDate:Function;
    setSearchStartDate:Function;
}

const DateControlSearch =(props: DateControlProps)=>{
    const [startDate,setStartDate]=React.useState<string>(moment().startOf('week').format("YYYY-MM-DD"));
    const[endDate,setEndDate] = React.useState<string>(moment().endOf('week').format("YYYY-MM-DD"));

    useEffect(()=>{
        // console.log(`Start date :${startDate}`);
        props.setSearchStartDate(startDate)
    },[props,startDate])

    // useEffect(() => {
    //     props.setChartEndDate(endDate);
    // }, [props,endDate]);


    useEffect(()=>{
        // console.log(`endDate :${endDate}`) 
        props.setSearchEndDate(endDate)
    },[props,endDate])

    const customFilters = [
        {
            filterName:"Search Created Date",
            filterType:"DATE_PICKER",
            filterValue:startDate,
            filterHandleChange:(newvalue: any)=>{
                setStartDate(newvalue)
            }
        },
       {
        filterName:"Search Updated Date",
        filterType:"DATE_PICKER",
        filterValue:endDate,
        filterHandleChange:(newValue:any)=>{
            setEndDate(newValue)
        }
       }
    ];

    return(
        <Grid container spacing={2} sx={{flexGrow:1}} justifyContent={'flex-end'}>
            {customFilters.map((c,idx)=>(
                <Grid key={idx + c.filterName}>
                     <FormControl>
                        <FormLabel>{c.filterName}</FormLabel>
                        <Input type={"date"} size={"sm"} value={c.filterValue} onChange={(e) => c.filterHandleChange(e.target.value)} />
                    </FormControl>
                </Grid>
            ))}

        </Grid>
    )

}
export default DateControlSearch