import * as React from 'react';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardActions from '@mui/joy/CardActions';
import CircularProgress from '@mui/joy/CircularProgress';
import Typography from '@mui/joy/Typography';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/joy';


interface DashboardCardProps {
  icon : any,
  title : String,
  value : number,
  color: 'primary'|'warning'| 'danger'|'success'|'neutral',
}

export default function DashboardCard(props:DashboardCardProps) {

  const IconComponent = props.icon

  return (
    <Card variant="solid" color={props.color} invertedColors sx={{ height: 150 }}>
      <CardContent orientation="horizontal">
        <CircularProgress size="lg" determinate value={props.value}>
          <IconComponent/>
        </CircularProgress>
        <CardContent>
          <Typography level="title-lg">{props.title}</Typography>
          <Typography level="h2">{props.value}</Typography>
        </CardContent>
      </CardContent>
      <CardActions>

      </CardActions>
    </Card>
  );
}
