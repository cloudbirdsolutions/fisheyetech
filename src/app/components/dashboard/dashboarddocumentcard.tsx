import * as React from 'react';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardActions from '@mui/joy/CardActions';
import CircularProgress from '@mui/joy/CircularProgress';
import Typography from '@mui/joy/Typography';
import SvgIcon from '@mui/joy/SvgIcon';

export default function DashboardDocumentCard() {

const document= ["draft","Bending","Approval"]

  return (
    <Card variant="solid" color="primary" invertedColors sx={{ height: 200 }}>
      <CardContent orientation="horizontal">
        <CircularProgress size="lg" determinate value={40}>
          <SvgIcon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
              />
            </svg>
          </SvgIcon>
        </CircularProgress>
        <CardContent>

          <Typography  level="h2">Document</Typography>

        
      {document.map((status,index)=>(
        <Typography key={index} level="body-md">
          {status.charAt(0).toUpperCase()+status.slice(1)}
        </Typography>
      ))}
          
        </CardContent>
      </CardContent>
      <CardActions>
      
        <Button variant="solid" size="sm">
          See breakdown
        </Button>
      </CardActions>
    </Card>
  );
}
