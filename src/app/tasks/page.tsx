'use client';
import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import TasksTable from '../components/Tasks/TasksTable';


export default function Task() {
  return (
 <Box>
    <TasksTable/>
 </Box>
  );
}
