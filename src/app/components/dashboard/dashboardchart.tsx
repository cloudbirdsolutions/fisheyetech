import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { useState } from 'react';
import { useEffect } from 'react';


const currentMonth = new Date().getMonth() + 1;
const currentYear = new Date().getFullYear();
interface DataItem {

  date: string;
  value: number;
}

export default function DashboardChart() {

  const [chartData, setChartData] = useState<any[]>([]);
  // Get the current month and year
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  // Generate months in reverse order
  const months = Array.from({ length: 10 }, (_, index) => {
    const month = currentMonth - index;
    const year = month > 0 ? currentYear : currentYear - 1;
    const monthIndex = month > 0 ? month : 12 + month;
    return { month: monthIndex, year };
  }).reverse();

  // Format months for display
  const formattedMonths = months.map(({ month, year }) => {
    const date = new Date(year, month - 1);
    const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date);
    return `${year}\n${monthName}`;
  });


  
const Tasks = [
    {  date: '2024-05-30', value: 99},
    {  date: '2024-04-30', value: 85 },
    {  date: '2024-03-02', value: 61 },
    {  date: '2024-02-03', value: 74 },
    {  date: '2024-01-04', value: 68 },
    {  date: '2023-12-30', value: 64 },
    {  date: '2023-11-31', value: 59 },
    {  date: '2023-10-31', value: 62 },
    {  date: '2023-09-29', value: 49 },
    {  date: '2023-08-31', value:30 },
    {  date: '2023-07-30', value: 43 },
    {  date: '2023-06-30', value: 41 }
  ].slice(0, 10);
const Reviews =  [
  {  date: '2024-05-30', value:   65},
    {  date: '2024-04-30', value: 81 },
    {  date: '2024-03-02', value: 76 },
    {  date: '2024-02-03', value: 53 },
    {  date: '2024-01-04', value: 61 },
    {  date: '2023-12-30', value: 40 },
    {  date: '2023-11-31', value: 22 },
    {  date: '2023-10-31', value: 36 },
    {  date: '2023-09-29', value: 45 },
    {  date: '2023-08-31', value: 18},
    {  date: '2023-07-30', value: 24 },
    {  date: '2023-06-30', value: 34 }
  ].slice(0, 10);

const Followups =  [
    {  date: '2024-05-30', value: 55},
    {  date: '2024-04-30', value: 52 },
    {  date: '2024-03-02', value: 44 },
    {  date: '2024-02-03', value: 37 },
    {  date: '2024-01-04', value: 31 },
    {  date: '2023-12-30', value: 26 },
    {  date: '2023-11-31', value: 20 },
    {  date: '2023-10-31', value: 17 },
    {  date: '2023-09-29', value: 12 },
    {  date: '2023-08-31', value: 16},
    {  date: '2023-07-30', value: 8 },
    {  date: '2023-06-30', value: 2 }
  ].slice(0, 10);
const Bending =  [
  {  date: '2024-05-30', value: 74},
  {  date: '2024-04-30', value: 63 },
  {  date: '2024-03-02', value: 42 },
  {  date: '2024-02-03', value: 91 },
  {  date: '2024-01-04', value: 19 },
  {  date: '2023-12-30', value: 29 },
  {  date: '2023-11-31', value: 49 },
  {  date: '2023-10-31', value: 14 },
  {  date: '2023-09-29', value: 57 },
  {  date: '2023-08-31', value: 67},
  {  date: '2023-07-30', value: 29 },
  {  date: '2023-06-30', value: 28 }
].slice(0, 10);

useEffect(() => {
  // Fetch or process data here
  const formattedData = Tasks.map(item => item.value);
  setChartData(formattedData);
}, []);

const TasksData = getChartData(Tasks, months);
  const ReviewsData = getChartData(Reviews, months);
  const FollowupsData = getChartData(Followups, months);
  const BendingData = getChartData(Bending, months);

  // Line chart parameters
  const lineChartsParams = {
    series: [
      { label: 'Tasks ', data: TasksData, showMark: false },
      { label: 'Reviews  ', data: ReviewsData, showMark: false },
      { label: 'Follow Ups ', data: FollowupsData, showMark: false },
      { label: 'Bending ', data: BendingData, showMark: false },
    ],
    width: 1000,
    height: 400,
  };

  return (
    <LineChart
      {...lineChartsParams}
      xAxis={[{ data: formattedMonths, scaleType: 'band' }]}
    />
  );
}

// Function to extract data points for the given months
function getChartData(data: DataItem[], months: { month: number; year: number }[]) {
  return months.map(({ month, year }) => {
    const monthData = data.find(item => {
      const [itemYear, itemMonth] = item.date.split('-').map(Number);
      return itemYear === year && itemMonth === month;
    });
    return monthData ? monthData.value : 0; // Use 0 if no data point found
  });
}