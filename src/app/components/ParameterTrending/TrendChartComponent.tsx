import * as React from 'react';
import {ResponsiveChartContainer} from '@mui/x-charts/ResponsiveChartContainer';
import {LinePlot, MarkPlot} from '@mui/x-charts/LineChart';
import {ChartsXAxis} from '@mui/x-charts/ChartsXAxis';
import {ChartsYAxis} from '@mui/x-charts/ChartsYAxis';
import {Box, Card, CardContent, Divider} from '@mui/joy';
import {mangoFusionPalette} from '@mui/x-charts/colorPalettes';
import {
    AllSeriesType,
    ChartsGrid,
    ChartsLegend,
    ChartsTooltip,
    ChartsXAxisProps,
    ChartsYAxisProps
} from "@mui/x-charts";
import Typography from "@mui/joy/Typography";
import ChartControls from "@/app/components/Charts/ChartControls";


// const currentMonth = new Date().getMonth() + 1;
// const currentYear = new Date().getFullYear();

interface TrendChartComponentProps {
    dataset : any[]
    series :  AllSeriesType[]
    xAxis : ChartsXAxisProps[]
    yAxis: ChartsYAxisProps[]
    setChartStartDate : Function,
    setChartEndDate : Function,
    chartTitle:string

}


export default function TrendChartComponent(props:TrendChartComponentProps) {

    return (
        <Box sx={{width: '100%'}}>
            <Card variant="soft" color="neutral">
                <Typography level={"title-lg"}>{props.chartTitle}</Typography>
                <ChartControls setChartEndDate={props.setChartEndDate} setChartStartDate={props.setChartStartDate}></ChartControls>
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