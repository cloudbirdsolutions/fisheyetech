import * as React from 'react';
import {useEffect, useMemo} from 'react';
import {ResponsiveChartContainer} from '@mui/x-charts/ResponsiveChartContainer';
import {LinePlot, MarkPlot} from '@mui/x-charts/LineChart';
import {ChartsXAxis} from '@mui/x-charts/ChartsXAxis';
import {ChartsYAxis} from '@mui/x-charts/ChartsYAxis';
import {Box, Card, CardContent, Divider} from '@mui/joy';
import {mangoFusionPalette} from '@mui/x-charts/colorPalettes';
import moment from 'moment';
import {
    AllSeriesType,
    BarSeriesType,
    ChartsGrid,
    ChartsLegend,
    ChartsTooltip, ChartsXAxisProps, ChartsYAxisProps,
    LineSeriesType,
    PieSeriesType,
    PieValueType,
    ScatterSeriesType
} from "@mui/x-charts";
import Typography from "@mui/joy/Typography";
import ChartControlls from "@/app/components/Charts/ChartControlls";



let twix = require('twix');

// const currentMonth = new Date().getMonth() + 1;
// const currentYear = new Date().getFullYear();

interface TrendChartComponentProps {
    dataset : any[]
    series :  AllSeriesType[]
    xAxis : ChartsXAxisProps[]
    yAxis: ChartsYAxisProps[]

}


export default function TrendChartComponent(props:TrendChartComponentProps) {

    return (
        <Box sx={{width: '100%'}}>
            <Card variant="outlined" color="neutral">
                <Typography level={"title-lg"}>Turbine DCS Log Book</Typography>
                <ChartControlls></ChartControlls>
                <Divider/>
                <CardContent>
                    <ResponsiveChartContainer series={props.series}
                                              colors={mangoFusionPalette}
                                              xAxis={props.xAxis}
                                              dataset={props.dataset}
                                              height={400}
                                              yAxis={props.yAxis}
                    >
                        <ChartsLegend direction={'row'}
                                      hidden={false}
                                      position={{vertical: 'top', horizontal:'right'}} />
                        <ChartsGrid horizontal/>
                        <ChartsXAxis/>
                        <ChartsYAxis />
                        <LinePlot/>
                        <MarkPlot/>
                        <ChartsTooltip />
                    </ResponsiveChartContainer>
                </CardContent>
            </Card>
        </Box>
    );
}