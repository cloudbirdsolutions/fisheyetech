'use client';
import * as React from 'react';
import { CircularProgress } from '@mui/material';
export default function LoadingSkeleton() {
 

  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
      <CircularProgress />  
    </div>
  );
}