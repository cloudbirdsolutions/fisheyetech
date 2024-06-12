import * as React from 'react';
import {LineChart} from '@mui/x-charts/LineChart';
import {useState, useEffect, useMemo} from 'react';
import {useTheme} from '@mui/joy';
import moment from 'moment';

let twix = require('twix');
import {DefaultColorPalette} from '@mui/joy/styles/types';

const currentMonth = new Date().getMonth() + 1;
const currentYear = new Date().getFullYear();

interface DataItem {

    date: string;
    value: number;
}

interface LineChartsParams {
    isLoading: boolean
}


export default function TrendChartComponent(props: LineChartsParams) {
    const theme = useTheme()
    const [chartData, setChartData] = useState<any[]>([]);
    // Get the current month and year
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();

    // Generate months in reverse order
    const months = Array.from({length: 10}, (_, index) => {
        const month = currentMonth - index;
        const year = month > 0 ? currentYear : currentYear - 1;
        const monthIndex = month > 0 ? month : 12 + month;
        return {month: monthIndex, year};
    }).reverse();

    // Format months for display
    const formattedMonths = months.map(({month, year}) => {
        const date = new Date(year, month - 1);
        const monthName = new Intl.DateTimeFormat('en-US', {month: 'long'}).format(date);
        return `${year}\n${monthName}`;
    });

    const xAxisData = useMemo(() => {
        var startDate = moment("2024-05-01",'YYYY-MM-DD');
        var endDate = moment("2024-05-10",'YYYY-MM-DD');
        var itr = (startDate as any).twix(endDate).iterate("days");
        var range = [];
        while (itr.hasNext()) {
            range.push(moment(itr.next().toDate()).format('MMM-DD'));
        }
        console.log(range);
        return range
    },[])

    const Reading_1 = [].slice(0, 10);
    const Reading_2 = [
        //   {  date: '2024-06-30', value: 59},
        // {  date: '2024-05-30', value:   65},
        //   {  date: '2024-04-30', value: 81 },
        //   {  date: '2024-03-02', value: 76 },
        //   {  date: '2024-02-03', value: 53 },
        //   {  date: '2024-01-04', value: 61 },
        //   {  date: '2023-12-30', value: 40 },
        //   {  date: '2023-11-31', value: 22 },
        //   {  date: '2023-10-31', value: 36 },
        //   {  date: '2023-09-29', value: 45 },
        //   {  date: '2023-08-31', value: 18},
        //   {  date: '2023-07-30', value: 24 },
        //   {  date: '2023-06-30', value: 34 }
    ].slice(0, 10);

    const Reading_3 = [
        // {  date: '2024-06-30', value: 77},
        // {  date: '2024-05-30', value: 55},
        // {  date: '2024-04-30', value: 52 },
        // {  date: '2024-03-02', value: 44 },
        // {  date: '2024-02-03', value: 37 },
        // {  date: '2024-01-04', value: 31 },
        // {  date: '2023-12-30', value: 26 },
        // {  date: '2023-11-31', value: 20 },
        // {  date: '2023-10-31', value: 17 },
        // {  date: '2023-09-29', value: 12 },
        // {  date: '2023-08-31', value: 16},
        // {  date: '2023-07-30', value: 8 },
        // {  date: '2023-06-30', value: 2 }
    ].slice(0, 10);
    const Reading_4 = [
        //   {  date: '2024-06-30', value: 44},
        // {  date: '2024-05-30', value: 74},
        // {  date: '2024-04-30', value: 63 },
        // {  date: '2024-03-02', value: 42 },
        // {  date: '2024-02-03', value: 91 },
        // {  date: '2024-01-04', value: 19 },
        // {  date: '2023-12-30', value: 29 },
        // {  date: '2023-11-31', value: 49 },
        // {  date: '2023-10-31', value: 14 },
        // {  date: '2023-09-29', value: 57 },
        // {  date: '2023-08-31', value: 67},
        // {  date: '2023-07-30', value: 29 },
        // {  date: '2023-06-30', value: 28 }
    ].slice(0, 10);

    useEffect(() => {
            // Fetch or process data here


            // const formattedData = Reading_1.map(item => item.value);
            const formattedData: React.SetStateAction<any[]> = [];
            setChartData(formattedData);
            // eslint-disable-next-line react-hooks/exhaustive-deps
        },
        []);

    const Reading_1Data = getChartData(Reading_1, months);
    const Reading_2Data = getChartData(Reading_2, months);
    const Reading_3Data = getChartData(Reading_3, months);
    const Reading_4Data = getChartData(Reading_4, months);

    // Line chart parameters
    const lineChartsParams = {
        series: [
            {label: 'Reading_1 ', data: Reading_1Data, showMark: false, color: theme.palette.success[500]},
            {label: 'Reading_2  ', data: Reading_2Data, showMark: false, color: theme.palette.primary[500]},
            {label: 'Reading_3 ', data: Reading_3Data, showMark: false, color: theme.palette.warning[500]},
            {label: 'Reading_4 ', data: Reading_4Data, showMark: false, color: theme.palette.danger[500]},
        ],
        width: 1000,
        height: 400,

        loading: props.isLoading
    };

    return (
        <LineChart

            {...lineChartsParams}
            xAxis={[{data: xAxisData, scaleType: 'band'}]}
            slotProps={{
                loadingOverlay: {message: 'Data should be available soon.'},
                noDataOverlay: {message: 'Select some data to display.'},
            }}

        />
    );
}

// Function to extract data points for the given months
function getChartData(data: DataItem[], months: { month: number; year: number }[]) {
    return months.map(({month, year}) => {
        const monthData = data.find(item => {
            const [itemYear, itemMonth] = item.date.split('-').map(Number);
            return itemYear === year && itemMonth === month;
        });
        return monthData ? monthData.value : 0; // Use 0 if no data point found
    });
}