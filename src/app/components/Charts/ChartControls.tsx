'use client'
import React, {useEffect} from 'react';
import Grid from "@mui/joy/Grid";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import FormControl from "@mui/joy/FormControl";
import {Select, Option} from '@mui/joy';
import moment from "moment";

interface ChartControlProps {
    setChartStartDate: Function;
    setChartEndDate: Function;
}


const ChartControls = (props:ChartControlProps) => {

    const [quickFilter, setQuickFilter] = React.useState<string>("This Week");
    const [startDate, setStartDate] = React.useState<string>(moment().startOf('week').format("YYYY-MM-DD"));
    const [endDate, setEndDate] = React.useState<string>(moment().endOf('week').format("YYYY-MM-DD"));

    useEffect(() => {
        props.setChartStartDate(startDate);

    }, [props,startDate]);

    useEffect(() => {
        props.setChartEndDate(endDate);
    }, [props,endDate]);

    const customFilters = [
        {
            filterName: "Quick Filter",
            filterType: "SELECT",
            filterOptions: ["This Week", "This Month", "Last 7 days","This Year"],
            filterValue: quickFilter,
            filterHandleChange: (
                event: React.SyntheticEvent | null,
                newValue: string | null,
            ) => {
                setQuickFilter(newValue);
            }
        },
        {
            filterName: "Start Date",
            filterType: "DATE_PICKER",
            filterValue: startDate,
            filterHandleChange: (newValue)=>{
                setStartDate(newValue)

            }
        },
        {
            filterName: "End Date",
            filterType: "DATE_PICKER",
            filterValue: endDate,
            filterHandleChange: (newValue)=>{
                setEndDate(newValue)
            }
        }
    ]

    useEffect(()=>{
        switch (quickFilter){
            case "This Week":
                setStartDate(moment().startOf('week').format("YYYY-MM-DD"));
                setEndDate(moment().endOf('week').format("YYYY-MM-DD"));
                break;
            case "This Month":
                setStartDate(moment().startOf('month').format("YYYY-MM-DD"));
                setEndDate(moment().endOf('month').format("YYYY-MM-DD"));
                break;
            case "This Year":
                setStartDate(moment().startOf('year').format("YYYY-MM-DD"));
                setEndDate(moment().endOf('year').format("YYYY-MM-DD"));
                  break;
            case "Last 7 days":
                setStartDate(moment().subtract(7,'d').format("YYYY-MM-DD"));
                setEndDate(moment().format("YYYY-MM-DD"));

        }
    },[quickFilter])

    return (
        <Grid container spacing={2} sx={{flexGrow: 1}} justifyContent={'flex-end'}>
            { customFilters.map((c, i) => (
                <Grid key={i+c.filterName}>
                    <FormControl>
                        <FormLabel>{c.filterName}</FormLabel>
                        {c.filterType==="DATE_PICKER"?
                            <Input type={"date"} size={"sm"} value={c.filterValue} onChange={(e)=>c.filterHandleChange(e.target.value)}/> :
                            <Select value={c.filterValue} onChange={c.filterHandleChange} size={'sm'}>
                                {
                                  c.filterOptions.map((option, i) => (
                                        <Option value={option} key={i+option}>{option}</Option>
                                    ))
                                }
                            </Select>
                        }
                    </FormControl>
                </Grid>
            ))}
        </Grid>
    );
};

export default ChartControls;