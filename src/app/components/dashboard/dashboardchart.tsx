import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

const months = [
  'Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'
];

// Adjusted GDP per capita data
const GermanyGDPperCapita = [0, 5, 10, 5, 20, 25, 30, 15, 40, 25, 50, 55];

const lineChartsParams = {
  series: [
    {
      label: 'Remarks',
      data: GermanyGDPperCapita,
      showMark: false,
    },
  ],
  width: 600,
  height: 400,
};

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
}).format;

export default function DashboardChart() {
  return (
    <LineChart
      {...lineChartsParams}
      xAxis={[{ data: months, scaleType: 'band' }]}
      series={lineChartsParams.series.map((series) => ({
        ...series,
        valueFormatter: (v) => (v === null ? '' : currencyFormatter(v)),
      }))}
    />
  );
}
