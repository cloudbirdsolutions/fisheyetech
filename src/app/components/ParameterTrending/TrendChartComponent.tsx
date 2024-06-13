import * as React from 'react';
import {useEffect, useMemo} from 'react';
import {ResponsiveChartContainer} from '@mui/x-charts/ResponsiveChartContainer';
import {LinePlot, MarkPlot} from '@mui/x-charts/LineChart';
import {ChartsXAxis} from '@mui/x-charts/ChartsXAxis';
import {ChartsYAxis} from '@mui/x-charts/ChartsYAxis';
import {Box, Card, CardContent} from '@mui/joy';
import {mangoFusionPalette} from '@mui/x-charts/colorPalettes';
import moment from 'moment';
import {ChartsGrid, ChartsLegend, ChartsTooltip} from "@mui/x-charts";
import Typography from "@mui/joy/Typography";


let twix = require('twix');

// const currentMonth = new Date().getMonth() + 1;
// const currentYear = new Date().getFullYear();

export default function TrendChartComponent() {

    const xAxisData = useMemo(() => {
        const startDate = moment("2024-05-01", 'YYYY-MM-DD');
        const endDate = moment("2024-05-15", 'YYYY-MM-DD');
        const itr = (startDate as any).twix(endDate).iterate("days");
        const range = [];
        while (itr.hasNext()) {
            range.push(moment(itr.next().toDate()).format('MMM-DD'));
        }
    return range
    }, [])


    useEffect(() => {

        },
        []);


    const dataset = [
        {min: -12, max: -4, precip: 79, month: 'Jan'},
        {min: -11, max: -3, precip: 66, month: 'Feb'},
        {min: -6, max: 2, precip: 76, month: 'Mar'},
        {min: 1, max: 9, precip: 106, month: 'Apr'},
        {min: 8, max: 17, precip: 105, month: 'Mai'},
        {min: 15, max: 24, precip: 114, month: 'Jun'},
        {min: 18, max: 26, precip: 106, month: 'Jul'},
        {min: 17, max: 26, precip: 105, month: 'Aug'},
        {min: 13, max: 21, precip: 100, month: 'Sept'},
        {min: 6, max: 13, precip: 116, month: 'Oct'},
        {min: 0, max: 6, precip: 93, month: 'Nov'},
        {min: -8, max: -1, precip: 93, month: 'Dec'},

    ];

    return (
        <Box sx={{width: '100%'}}>
            <Card variant="outlined" color="neutral">
                <Typography level={"title-lg"}>Turbine DCS Log Book</Typography>
                <CardContent>
                    <ResponsiveChartContainer series={[
                        {type: 'line', dataKey: 'min', label:'min' },
                        {type: 'line', dataKey: 'max',label:'max' },
                        {type: 'line', dataKey: 'precip', label:'percip'},

                    ]} colors={mangoFusionPalette}
                                              xAxis={[
                                                  {
                                                      scaleType: 'band',
                                                      dataKey: 'month',
                                                      label: 'Month',

                                                  },
                                              ]}
                                              dataset={dataset}
                                              height={400}
                                              yAxis={[
                                                  {id: 'leftAxis',},

                                              ]}

                    >
                        <ChartsLegend direction={'row'} hidden={false} position={{vertical: 'top', horizontal:'right'}} />
                        <ChartsGrid horizontal/>
                        <ChartsXAxis/>
                        <ChartsYAxis axisId="leftAxis" label="temerature (°C)"/>
                        {/*<ChartsYAxis*/}
                        {/*    axisId="rightAxis"*/}
                        {/*    position="right"*/}
                        {/*    label="precipitation (mm)"*/}
                        {/*/>*/}
                        {/*<BarPlot/>*/}
                        <LinePlot/>
                        <MarkPlot/>

                        <ChartsTooltip />


                    </ResponsiveChartContainer>
                </CardContent>
            </Card>
        </Box>
    );
}